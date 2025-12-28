import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark, BookOpen, Trash2, Loader2, Copy, Share2, Facebook, MessageCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatNumber } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useLocalBookmarks } from "@/hooks/useLocalBookmarks";
import { useToast } from "@/hooks/use-toast";
import { surahs } from "@/data/surahs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Language } from "@/types/language";
import { useAuth } from "@/hooks/useAuth";

interface BookmarksProps {
  language: Language;
  readingMode?: "normal" | "sepia";
  arabicFont?: "amiri" | "uthmani";
}

interface BookmarkedVerse {
  id: string;
  surah_number: number;
  verse_number: number;
  created_at: string;
  arabic?: string;
  bengali?: string;
  english?: string;
  tafsir_bengali?: string;
  tafsir_english?: string;
}

interface BookmarkedHadith {
  id: string;
  book_slug: string;
  hadith_number: number;
  created_at: string;
  arabic?: string;
  english?: string;
  bengali?: string;
  narrator_english?: string;
  narrator_bengali?: string;
  grade?: string;
  book_name_english?: string;
  book_name_bengali?: string;
}

const Bookmarks = ({ language, readingMode = "normal", arabicFont = "amiri" }: BookmarksProps) => {
  const navigate = useNavigate();
  const { bookmarks: localBookmarks, removeBookmark } = useLocalBookmarks();
  const { toast } = useToast();
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<BookmarkedVerse[]>([]);
  const [hadithBookmarks, setHadithBookmarks] = useState<BookmarkedHadith[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHadithLoading, setIsHadithLoading] = useState(true);
  const [expandedTafsir, setExpandedTafsir] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState("quran");

  const toggleTafsir = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedTafsir(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleCardClick = (bookmark: BookmarkedVerse) => {
    navigate(`/surah/${bookmark.surah_number}#verse-${bookmark.verse_number}`);
  };

  const handleHadithCardClick = (bookmark: BookmarkedHadith) => {
    navigate(`/hadith/${bookmark.book_slug}?hadith=${bookmark.hadith_number}`);
  };

  // Fetch Quran bookmarks
  useEffect(() => {
    const fetchBookmarks = async () => {
      if (localBookmarks.length === 0) {
        setBookmarks([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      const versesPromises = localBookmarks.map(async (bookmark) => {
        const { data: verseData } = await supabase
          .from('verses')
          .select('arabic, bengali, english, tafsir_bengali, tafsir_english')
          .eq('surah_number', bookmark.surah_number)
          .eq('verse_number', bookmark.verse_number)
          .maybeSingle();

        return {
          id: bookmark.id,
          surah_number: bookmark.surah_number,
          verse_number: bookmark.verse_number,
          created_at: bookmark.created_at,
          arabic: verseData?.arabic,
          bengali: verseData?.bengali,
          english: verseData?.english,
          tafsir_bengali: verseData?.tafsir_bengali,
          tafsir_english: verseData?.tafsir_english,
        };
      });

      const versesWithDetails = await Promise.all(versesPromises);
      setBookmarks(versesWithDetails);
      setIsLoading(false);
    };

    fetchBookmarks();
  }, [localBookmarks]);

  // Fetch Hadith bookmarks
  useEffect(() => {
    const fetchHadithBookmarks = async () => {
      if (!user) {
        setHadithBookmarks([]);
        setIsHadithLoading(false);
        return;
      }

      setIsHadithLoading(true);

      try {
        // Fetch hadith bookmarks for the user
        const { data: bookmarkData, error: bookmarkError } = await supabase
          .from('hadith_bookmarks')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (bookmarkError) throw bookmarkError;

        if (!bookmarkData || bookmarkData.length === 0) {
          setHadithBookmarks([]);
          setIsHadithLoading(false);
          return;
        }

        // Fetch hadith details for each bookmark
        const hadithPromises = bookmarkData.map(async (bookmark) => {
          const { data: hadithData } = await supabase
            .from('hadiths')
            .select('arabic, english, bengali, narrator_english, narrator_bengali, grade')
            .eq('book_slug', bookmark.book_slug)
            .eq('hadith_number', bookmark.hadith_number)
            .maybeSingle();

          const { data: bookData } = await supabase
            .from('hadith_books')
            .select('name_english, name_bengali')
            .eq('slug', bookmark.book_slug)
            .maybeSingle();

          return {
            id: bookmark.id,
            book_slug: bookmark.book_slug,
            hadith_number: bookmark.hadith_number,
            created_at: bookmark.created_at,
            arabic: hadithData?.arabic,
            english: hadithData?.english,
            bengali: hadithData?.bengali,
            narrator_english: hadithData?.narrator_english,
            narrator_bengali: hadithData?.narrator_bengali,
            grade: hadithData?.grade,
            book_name_english: bookData?.name_english,
            book_name_bengali: bookData?.name_bengali,
          };
        });

        const hadithsWithDetails = await Promise.all(hadithPromises);
        setHadithBookmarks(hadithsWithDetails);
      } catch (error) {
        console.error('Error fetching hadith bookmarks:', error);
      } finally {
        setIsHadithLoading(false);
      }
    };

    fetchHadithBookmarks();
  }, [user]);

  const handleRemoveBookmark = (id: string) => {
    removeBookmark(id, language);
    setBookmarks(prev => prev.filter(b => b.id !== id));
  };

  const handleRemoveHadithBookmark = async (id: string) => {
    try {
      const { error } = await supabase
        .from('hadith_bookmarks')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setHadithBookmarks(prev => prev.filter(b => b.id !== id));
      toast({
        title: language === "bn" ? "মুছে ফেলা হয়েছে" : "Removed",
        description: language === "bn" ? "হাদিস বুকমার্ক মুছে ফেলা হয়েছে" : "Hadith bookmark removed",
      });
    } catch (error) {
      console.error('Error removing hadith bookmark:', error);
      toast({
        title: language === "bn" ? "ত্রুটি" : "Error",
        description: language === "bn" ? "বুকমার্ক মুছতে সমস্যা হয়েছে" : "Failed to remove bookmark",
        variant: "destructive",
      });
    }
  };

  const getSurahName = (surahNumber: number) => {
    const surah = surahs.find(s => s.number === surahNumber);
    if (!surah) return `Surah ${surahNumber}`;
    return language === "bn" ? surah.nameBengali : surah.nameEnglish;
  };

  const getVerseText = (bookmark: BookmarkedVerse) => {
    const surahName = getSurahName(bookmark.surah_number);
    const verseRef = language === "bn" 
      ? `${surahName}, আয়াত ${bookmark.verse_number}`
      : `${surahName}, Verse ${bookmark.verse_number}`;
    const translation = language === "bn" ? bookmark.bengali : bookmark.english;
    
    return `${bookmark.arabic || ""}\n\n${translation || ""}\n\n— ${verseRef}`;
  };

  const getHadithText = (bookmark: BookmarkedHadith) => {
    const bookName = language === "bn" ? bookmark.book_name_bengali : bookmark.book_name_english;
    const hadithRef = language === "bn" 
      ? `${bookName}, হাদিস ${bookmark.hadith_number}`
      : `${bookName}, Hadith ${bookmark.hadith_number}`;
    const translation = language === "bn" ? bookmark.bengali : bookmark.english;
    
    return `${bookmark.arabic || ""}\n\n${translation || ""}\n\n— ${hadithRef}`;
  };

  const handleCopyToClipboard = async (bookmark: BookmarkedVerse) => {
    const text = getVerseText(bookmark);
    
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: language === "bn" ? "কপি হয়েছে" : "Copied!",
        description: language === "bn" ? "আয়াত ক্লিপবোর্ডে কপি হয়েছে" : "Verse copied to clipboard",
      });
    } catch (err) {
      toast({
        title: language === "bn" ? "ত্রুটি" : "Error",
        description: language === "bn" ? "কপি করতে সমস্যা হয়েছে" : "Failed to copy",
        variant: "destructive",
      });
    }
  };

  const handleCopyHadithToClipboard = async (bookmark: BookmarkedHadith) => {
    const text = getHadithText(bookmark);
    
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: language === "bn" ? "কপি হয়েছে" : "Copied!",
        description: language === "bn" ? "হাদিস ক্লিপবোর্ডে কপি হয়েছে" : "Hadith copied to clipboard",
      });
    } catch (err) {
      toast({
        title: language === "bn" ? "ত্রুটি" : "Error",
        description: language === "bn" ? "কপি করতে সমস্যা হয়েছে" : "Failed to copy",
        variant: "destructive",
      });
    }
  };

  const handleShareFacebook = (bookmark: BookmarkedVerse) => {
    const text = encodeURIComponent(getVerseText(bookmark));
    const url = `https://www.facebook.com/sharer/sharer.php?quote=${text}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleShareTwitter = (bookmark: BookmarkedVerse) => {
    const text = encodeURIComponent(getVerseText(bookmark));
    const url = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleShareWhatsApp = (bookmark: BookmarkedVerse) => {
    const text = encodeURIComponent(getVerseText(bookmark));
    const url = `https://wa.me/?text=${text}`;
    window.open(url, '_blank');
  };

  const handleShareMessenger = (bookmark: BookmarkedVerse) => {
    const text = encodeURIComponent(getVerseText(bookmark));
    const url = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(window.location.href)}&quote=${text}&app_id=140586622674265&redirect_uri=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleShareIMO = (bookmark: BookmarkedVerse) => {
    const text = getVerseText(bookmark);
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: language === "bn" ? "কপি হয়েছে" : "Copied!",
        description: language === "bn" ? "IMO তে পেস্ট করুন" : "Paste in IMO to share",
      });
    });
  };

  const handleShareHadithFacebook = (bookmark: BookmarkedHadith) => {
    const text = encodeURIComponent(getHadithText(bookmark));
    const url = `https://www.facebook.com/sharer/sharer.php?quote=${text}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleShareHadithWhatsApp = (bookmark: BookmarkedHadith) => {
    const text = encodeURIComponent(getHadithText(bookmark));
    const url = `https://wa.me/?text=${text}`;
    window.open(url, '_blank');
  };

  return (
    <div className={cn(
      "min-h-screen islamic-pattern",
      readingMode === "sepia" ? "sepia" : "bg-background"
    )}>
      {/* Page Title */}
      <div className="border-b border-border bg-gradient-to-br from-primary/5 to-accent/30 py-8">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Bookmark className="h-8 w-8 text-primary" />
          </div>
          <h1 className={cn("text-2xl font-bold text-foreground sm:text-3xl", language === "bn" && "font-bengali")}>
            {language === "bn" ? "সংরক্ষিত" : "Bookmarks"}
          </h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="mx-auto max-w-4xl px-3 py-6 sm:px-4 md:px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="quran" className={cn("gap-2", language === "bn" && "font-bengali")}>
              <BookOpen className="h-4 w-4" />
              {language === "bn" ? `কুরআন (${formatNumber(bookmarks.length, language)})` : `Quran (${bookmarks.length})`}
            </TabsTrigger>
            <TabsTrigger value="hadith" className={cn("gap-2", language === "bn" && "font-bengali")}>
              <BookOpen className="h-4 w-4" />
              {language === "bn" ? `হাদিস (${formatNumber(hadithBookmarks.length, language)})` : `Hadith (${hadithBookmarks.length})`}
            </TabsTrigger>
          </TabsList>

          {/* Quran Bookmarks Tab */}
          <TabsContent value="quran">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : bookmarks.length > 0 ? (
              <div className="space-y-4">
                {bookmarks.map((bookmark, index) => (
                  <div 
                    key={bookmark.id}
                    className="verse-card animate-fade-in cursor-pointer hover:border-primary/40 transition-colors"
                    style={{ animationDelay: `${index * 0.05}s` }}
                    onClick={() => handleCardClick(bookmark)}
                  >
                    {/* Header */}
                    <div className="mb-4 flex items-center justify-between">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/surah/${bookmark.surah_number}#verse-${bookmark.verse_number}`);
                        }}
                        className={cn(
                          "flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary hover:bg-primary/20 transition-colors",
                          language === "bn" && "font-bengali"
                        )}
                      >
                        <span>{getSurahName(bookmark.surah_number)}</span>
                        <span>•</span>
                        <span>{language === "bn" ? `আয়াত ${formatNumber(bookmark.verse_number, language)}` : `Verse ${bookmark.verse_number}`}</span>
                      </button>
                      
                      {/* Action buttons */}
                      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-9 w-9 text-muted-foreground hover:text-primary"
                          onClick={() => handleCopyToClipboard(bookmark)}
                          title={language === "bn" ? "কপি করুন" : "Copy to clipboard"}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-9 w-9 text-muted-foreground hover:text-primary"
                              title={language === "bn" ? "শেয়ার করুন" : "Share"}
                            >
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleShareFacebook(bookmark)}>
                              <Facebook className="mr-2 h-4 w-4 text-[#1877F2]" />
                              Facebook
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShareTwitter(bookmark)}>
                              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                              </svg>
                              X
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShareWhatsApp(bookmark)}>
                              <MessageCircle className="mr-2 h-4 w-4 text-[#25D366]" />
                              WhatsApp
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShareMessenger(bookmark)}>
                              <svg className="mr-2 h-4 w-4 text-[#0099FF]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17.16.13.26.35.27.57l.05 1.78c.04.57.61.94 1.13.71l1.98-.87c.17-.08.36-.1.53-.06.91.25 1.87.38 2.9.38 5.64 0 10-4.13 10-9.7C22 6.13 17.64 2 12 2zm5.89 7.58l-2.88 4.57c-.46.73-1.41.92-2.09.42l-2.29-1.72a.56.56 0 00-.68 0l-3.09 2.34c-.41.31-.95-.18-.68-.62l2.88-4.57c.46-.73 1.41-.92 2.09-.42l2.29 1.72c.21.15.49.15.68 0l3.09-2.34c.41-.31.95.18.68.62z"/>
                              </svg>
                              Messenger
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShareIMO(bookmark)}>
                              <svg className="mr-2 h-4 w-4 text-[#005EFF]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                              </svg>
                              IMO
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-9 w-9 text-muted-foreground hover:text-destructive"
                          onClick={() => handleRemoveBookmark(bookmark.id)}
                          title={language === "bn" ? "মুছুন" : "Remove"}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Arabic Text */}
                    {bookmark.arabic && (
                      <p className={cn("mb-4 text-right text-2xl leading-loose text-foreground", arabicFont === "uthmani" ? "font-uthmani" : "font-arabic")}>
                        {bookmark.arabic}
                      </p>
                    )}

                    {/* Translation */}
                    {(bookmark.bengali || bookmark.english) && (
                      <p className={cn("text-base leading-relaxed text-foreground", language === "bn" && "font-bengali")}>
                        {language === "bn" ? bookmark.bengali : bookmark.english}
                      </p>
                    )}

                    {/* Tafsir Toggle */}
                    {(bookmark.tafsir_bengali || bookmark.tafsir_english) && (
                      <div className="mt-4 border-t border-border pt-4" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={(e) => toggleTafsir(bookmark.id, e)}
                          className="flex w-full items-center justify-between text-sm font-medium text-primary hover:text-primary/80"
                        >
                          <span className={cn("flex items-center gap-2", language === "bn" && "font-bengali")}>
                            <BookOpen className="h-4 w-4" />
                            {language === "bn" ? "তাফসীর দেখুন" : "View Tafsir"}
                          </span>
                          {expandedTafsir.has(bookmark.id) ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </button>
                        
                        {expandedTafsir.has(bookmark.id) && (
                          <div className={cn("mt-3 rounded-lg bg-accent/50 p-4 text-sm leading-relaxed text-muted-foreground", language === "bn" && "font-bengali")}>
                            {language === "bn" ? bookmark.tafsir_bengali : bookmark.tafsir_english}
                          </div>
                        )}
                      </div>
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
                <Button onClick={() => navigate("/")} className={language === "bn" ? "font-bengali" : ""}>
                  {language === "bn" ? "সূরা দেখুন" : "Browse Surahs"}
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Hadith Bookmarks Tab */}
          <TabsContent value="hadith">
            {!user ? (
              <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
                <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
                <h3 className={cn("mb-2 text-lg font-semibold text-foreground", language === "bn" && "font-bengali")}>
                  {language === "bn" ? "লগইন করুন" : "Login Required"}
                </h3>
                <p className={cn("mb-4 text-sm text-muted-foreground", language === "bn" && "font-bengali")}>
                  {language === "bn" 
                    ? "হাদিস বুকমার্ক দেখতে লগইন করুন" 
                    : "Login to view your saved hadiths"}
                </p>
                <Button onClick={() => navigate("/auth")} className={language === "bn" ? "font-bengali" : ""}>
                  {language === "bn" ? "লগইন" : "Login"}
                </Button>
              </div>
            ) : isHadithLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : hadithBookmarks.length > 0 ? (
              <div className="space-y-4">
                {hadithBookmarks.map((bookmark, index) => (
                  <div 
                    key={bookmark.id}
                    className="verse-card animate-fade-in cursor-pointer hover:border-primary/40 transition-colors"
                    style={{ animationDelay: `${index * 0.05}s` }}
                    onClick={() => handleHadithCardClick(bookmark)}
                  >
                    {/* Header */}
                    <div className="mb-4 flex items-center justify-between">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleHadithCardClick(bookmark);
                        }}
                        className={cn(
                          "flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary hover:bg-primary/20 transition-colors",
                          language === "bn" && "font-bengali"
                        )}
                      >
                        <span>{language === "bn" ? bookmark.book_name_bengali : bookmark.book_name_english}</span>
                        <span>•</span>
                        <span>{language === "bn" ? `হাদিস ${formatNumber(bookmark.hadith_number, language)}` : `Hadith ${bookmark.hadith_number}`}</span>
                      </button>
                      
                      {/* Action buttons */}
                      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-9 w-9 text-muted-foreground hover:text-primary"
                          onClick={() => handleCopyHadithToClipboard(bookmark)}
                          title={language === "bn" ? "কপি করুন" : "Copy to clipboard"}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-9 w-9 text-muted-foreground hover:text-primary"
                              title={language === "bn" ? "শেয়ার করুন" : "Share"}
                            >
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleShareHadithFacebook(bookmark)}>
                              <Facebook className="mr-2 h-4 w-4 text-[#1877F2]" />
                              Facebook
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShareHadithWhatsApp(bookmark)}>
                              <MessageCircle className="mr-2 h-4 w-4 text-[#25D366]" />
                              WhatsApp
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-9 w-9 text-muted-foreground hover:text-destructive"
                          onClick={() => handleRemoveHadithBookmark(bookmark.id)}
                          title={language === "bn" ? "মুছুন" : "Remove"}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Grade badge */}
                    {bookmark.grade && (
                      <div className="mb-3">
                        <span className="inline-block rounded-full bg-accent/50 px-2 py-0.5 text-xs text-muted-foreground">
                          {bookmark.grade}
                        </span>
                      </div>
                    )}

                    {/* Narrator */}
                    {(bookmark.narrator_english || bookmark.narrator_bengali) && (
                      <p className={cn("mb-3 text-sm italic text-muted-foreground", language === "bn" && "font-bengali")}>
                        {language === "bn" ? bookmark.narrator_bengali : bookmark.narrator_english}
                      </p>
                    )}

                    {/* Arabic Text */}
                    {bookmark.arabic && (
                      <p className={cn("mb-4 text-right text-2xl leading-loose text-foreground", arabicFont === "uthmani" ? "font-uthmani" : "font-arabic")}>
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
                  {language === "bn" ? "কোনো হাদিস বুকমার্ক নেই" : "No Hadith Bookmarks Yet"}
                </h3>
                <p className={cn("mb-4 text-sm text-muted-foreground", language === "bn" && "font-bengali")}>
                  {language === "bn" 
                    ? "হাদিস পড়ার সময় সংরক্ষণ করুন" 
                    : "Save hadiths while reading to see them here"}
                </p>
                <Button onClick={() => navigate("/hadith")} className={language === "bn" ? "font-bengali" : ""}>
                  {language === "bn" ? "হাদিস দেখুন" : "Browse Hadiths"}
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Bookmarks;
