import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bookmark, BookOpen, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { surahs } from "@/data/surahs";

interface BookmarksProps {
  language: "bn" | "en";
  onLanguageChange: (lang: "bn" | "en") => void;
}

interface BookmarkedVerse {
  id: string;
  surah_number: number;
  verse_number: number;
  created_at: string;
  arabic?: string;
  bengali?: string;
  english?: string;
}

const Bookmarks = ({ language, onLanguageChange }: BookmarksProps) => {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [bookmarks, setBookmarks] = useState<BookmarkedVerse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!user) {
        setBookmarks([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      // Fetch bookmarks
      const { data: bookmarkData, error: bookmarkError } = await supabase
        .from('bookmarks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (bookmarkError) {
        console.error('Error fetching bookmarks:', bookmarkError);
        setIsLoading(false);
        return;
      }

      if (!bookmarkData || bookmarkData.length === 0) {
        setBookmarks([]);
        setIsLoading(false);
        return;
      }

      // Fetch verse details for each bookmark
      const versesPromises = bookmarkData.map(async (bookmark) => {
        const { data: verseData } = await supabase
          .from('verses')
          .select('arabic, bengali, english')
          .eq('surah_number', bookmark.surah_number)
          .eq('verse_number', bookmark.verse_number)
          .maybeSingle();

        return {
          ...bookmark,
          arabic: verseData?.arabic,
          bengali: verseData?.bengali,
          english: verseData?.english,
        };
      });

      const versesWithDetails = await Promise.all(versesPromises);
      setBookmarks(versesWithDetails);
      setIsLoading(false);
    };

    fetchBookmarks();
  }, [user]);

  const handleRemoveBookmark = async (id: string) => {
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: language === "bn" ? "ত্রুটি" : "Error",
        description: language === "bn" ? "বুকমার্ক মুছতে সমস্যা হয়েছে" : "Failed to remove bookmark",
        variant: "destructive",
      });
    } else {
      setBookmarks(prev => prev.filter(b => b.id !== id));
      toast({
        title: language === "bn" ? "বুকমার্ক মুছে ফেলা হয়েছে" : "Bookmark Removed",
      });
    }
  };

  const getSurahName = (surahNumber: number) => {
    const surah = surahs.find(s => s.number === surahNumber);
    if (!surah) return `Surah ${surahNumber}`;
    return language === "bn" ? surah.nameBengali : surah.nameEnglish;
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background islamic-pattern">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className={language === "bn" ? "font-bengali" : ""}>
              {language === "bn" ? "ফিরে যান" : "Back"}
            </span>
          </Button>

          {/* Language Toggle */}
          <div className="flex rounded-full bg-secondary p-1">
            <button
              onClick={() => onLanguageChange("bn")}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium transition-all",
                language === "bn"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="font-bengali">বাংলা</span>
            </button>
            <button
              onClick={() => onLanguageChange("en")}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium transition-all",
                language === "en"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              English
            </button>
          </div>
        </div>
      </header>

      {/* Page Title */}
      <div className="border-b border-border bg-gradient-to-br from-primary/5 to-accent/30 py-8">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Bookmark className="h-8 w-8 text-primary" />
          </div>
          <h1 className={cn("text-2xl font-bold text-foreground sm:text-3xl", language === "bn" && "font-bengali")}>
            {language === "bn" ? "সংরক্ষিত আয়াত" : "Saved Verses"}
          </h1>
          <p className={cn("mt-2 text-muted-foreground", language === "bn" && "font-bengali")}>
            {language === "bn" 
              ? `${bookmarks.length}টি আয়াত সংরক্ষিত` 
              : `${bookmarks.length} verse${bookmarks.length !== 1 ? 's' : ''} saved`}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-3 py-6 sm:px-4 md:px-6">
        {!user ? (
          <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
            <Bookmark className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
            <h3 className={cn("mb-2 text-lg font-semibold text-foreground", language === "bn" && "font-bengali")}>
              {language === "bn" ? "লগইন করুন" : "Login Required"}
            </h3>
            <p className={cn("mb-4 text-sm text-muted-foreground", language === "bn" && "font-bengali")}>
              {language === "bn" 
                ? "আয়াত সংরক্ষণ করতে লগইন করুন" 
                : "Please login to save and view your bookmarks"}
            </p>
            <Button onClick={() => navigate("/auth")}>
              {language === "bn" ? "লগইন" : "Login"}
            </Button>
          </div>
        ) : isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : bookmarks.length > 0 ? (
          <div className="space-y-4">
            {bookmarks.map((bookmark, index) => (
              <div 
                key={bookmark.id}
                className="verse-card animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Header */}
                <div className="mb-4 flex items-center justify-between">
                  <button
                    onClick={() => navigate(`/surah/${bookmark.surah_number}`)}
                    className={cn(
                      "flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary hover:bg-primary/20 transition-colors",
                      language === "bn" && "font-bengali"
                    )}
                  >
                    <span>{getSurahName(bookmark.surah_number)}</span>
                    <span>•</span>
                    <span>{language === "bn" ? `আয়াত ${bookmark.verse_number}` : `Verse ${bookmark.verse_number}`}</span>
                  </button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-9 w-9 text-muted-foreground hover:text-destructive"
                    onClick={() => handleRemoveBookmark(bookmark.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Arabic Text */}
                {bookmark.arabic && (
                  <p className="mb-4 text-right font-arabic text-2xl leading-loose text-foreground">
                    {bookmark.arabic}
                  </p>
                )}

                {/* Translation */}
                {(bookmark.bengali || bookmark.english) && (
                  <p className={cn("text-base leading-relaxed text-foreground", language === "bn" && "font-bengali")}>
                    {language === "bn" ? bookmark.bengali : bookmark.english}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
            <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
            <h3 className={cn("mb-2 text-lg font-semibold text-foreground", language === "bn" && "font-bengali")}>
              {language === "bn" ? "কোনো বুকমার্ক নেই" : "No Bookmarks Yet"}
            </h3>
            <p className={cn("mb-4 text-sm text-muted-foreground", language === "bn" && "font-bengali")}>
              {language === "bn" 
                ? "সূরা পড়ার সময় আয়াত সংরক্ষণ করুন" 
                : "Save verses while reading surahs to see them here"}
            </p>
            <Button onClick={() => navigate("/")}>
              {language === "bn" ? "সূরা দেখুন" : "Browse Surahs"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
