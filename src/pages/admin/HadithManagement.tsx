import { useState, useEffect } from "react";
import { Book, Download, Loader2, RefreshCw, CheckCircle, XCircle, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface HadithBook {
  id: string;
  slug: string;
  name_arabic: string;
  name_english: string;
  name_bengali: string;
  total_hadiths: number;
  display_order: number;
}

interface ImportProgress {
  bookSlug: string;
  currentId: number;
  totalExpected: number;
  imported: number;
  status: "idle" | "importing" | "paused" | "success" | "error";
  error?: string;
}

const expectedCounts: Record<string, number> = {
  bukhari: 7563,
  muslim: 3032,
  abudawud: 3998,
  tirmidhi: 3956,
  nasai: 5662,
  ibnmajah: 4342,
};

const HadithManagement = () => {
  const { toast } = useToast();
  const [books, setBooks] = useState<HadithBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [importProgress, setImportProgress] = useState<Record<string, ImportProgress>>({});
  const [pauseFlags, setPauseFlags] = useState<Record<string, boolean>>({});

  const fetchBooks = async () => {
    const { data, error } = await supabase
      .from("hadith_books")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Error fetching books:", error);
    } else {
      setBooks(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const importBook = async (bookSlug: string, startFrom: number = 1) => {
    const batchSize = 50; // Smaller batches for reliability
    let currentStartId = startFrom;
    let hasMore = true;
    let totalImported = 0;
    const expected = expectedCounts[bookSlug] || 0;

    // Reset pause flag
    setPauseFlags(prev => ({ ...prev, [bookSlug]: false }));

    setImportProgress(prev => ({
      ...prev,
      [bookSlug]: {
        bookSlug,
        currentId: currentStartId,
        totalExpected: expected,
        imported: 0,
        status: "importing",
      },
    }));

    try {
      while (hasMore && !pauseFlags[bookSlug]) {
        const response = await supabase.functions.invoke("import-hadiths", {
          body: { bookSlug, startId: currentStartId, batchSize },
        });

        if (response.error) {
          throw new Error(response.error.message);
        }

        const { imported, nextStartId, hasMore: more, totalInBook } = response.data;
        totalImported = totalInBook || (totalImported + imported);
        hasMore = more;
        currentStartId = nextStartId;

        setImportProgress(prev => ({
          ...prev,
          [bookSlug]: {
            bookSlug,
            currentId: currentStartId,
            totalExpected: expected,
            imported: totalImported,
            status: pauseFlags[bookSlug] ? "paused" : "importing",
          },
        }));

        // Small delay between batches
        if (hasMore) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }

      if (pauseFlags[bookSlug]) {
        setImportProgress(prev => ({
          ...prev,
          [bookSlug]: {
            ...prev[bookSlug],
            status: "paused",
          },
        }));
        toast({
          title: "Import Paused",
          description: `Paused at hadith ${currentStartId}. Click Resume to continue.`,
        });
      } else {
        setImportProgress(prev => ({
          ...prev,
          [bookSlug]: {
            ...prev[bookSlug],
            status: "success",
          },
        }));

        toast({
          title: "Import Complete",
          description: `Successfully imported hadiths from ${bookSlug}`,
        });
      }

      // Refresh books to update counts
      fetchBooks();
    } catch (error) {
      console.error("Import error:", error);
      setImportProgress(prev => ({
        ...prev,
        [bookSlug]: {
          ...prev[bookSlug],
          status: "error",
          error: error instanceof Error ? error.message : "Unknown error",
        },
      }));

      toast({
        title: "Import Failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  };

  const pauseImport = (bookSlug: string) => {
    setPauseFlags(prev => ({ ...prev, [bookSlug]: true }));
  };

  const resumeImport = (bookSlug: string) => {
    const progress = importProgress[bookSlug];
    if (progress && progress.status === "paused") {
      importBook(bookSlug, progress.currentId);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Hadith Management</h2>
          <p className="text-muted-foreground">Import and manage hadith collections from hadithapi.pages.dev</p>
        </div>
        <Button variant="outline" onClick={fetchBooks}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => {
          const progress = importProgress[book.slug];
          const expected = expectedCounts[book.slug] || 0;
          const currentCount = progress?.imported || book.total_hadiths;
          const percentage = expected > 0 ? Math.round((currentCount / expected) * 100) : 0;

          return (
            <Card key={book.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Book className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{book.name_english}</CardTitle>
                      <CardDescription className="font-arabic">{book.name_arabic}</CardDescription>
                    </div>
                  </div>
                  {progress?.status === "importing" && (
                    <Badge variant="secondary" className="animate-pulse">
                      Importing...
                    </Badge>
                  )}
                  {progress?.status === "paused" && (
                    <Badge variant="outline" className="text-amber-600">
                      Paused
                    </Badge>
                  )}
                  {progress?.status === "success" && (
                    <Badge variant="default" className="bg-emerald-500">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Done
                    </Badge>
                  )}
                  {progress?.status === "error" && (
                    <Badge variant="destructive">
                      <XCircle className="h-3 w-3 mr-1" />
                      Error
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">
                      {currentCount.toLocaleString()} / {expected.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                  <p className="text-xs text-muted-foreground text-right">{percentage}% complete</p>
                </div>

                {progress?.status === "importing" && (
                  <div className="text-sm text-muted-foreground">
                    Importing hadith #{progress.currentId}...
                  </div>
                )}

                {progress?.status === "paused" && (
                  <div className="text-sm text-amber-600">
                    Paused at hadith #{progress.currentId}
                  </div>
                )}

                {progress?.error && (
                  <p className="text-sm text-destructive">{progress.error}</p>
                )}

                <div className="flex gap-2">
                  {progress?.status === "importing" ? (
                    <Button
                      className="flex-1"
                      variant="outline"
                      onClick={() => pauseImport(book.slug)}
                    >
                      <Pause className="h-4 w-4 mr-2" />
                      Pause
                    </Button>
                  ) : progress?.status === "paused" ? (
                    <Button
                      className="flex-1"
                      onClick={() => resumeImport(book.slug)}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Resume
                    </Button>
                  ) : (
                    <Button
                      className="flex-1"
                      variant={currentCount >= expected ? "outline" : "default"}
                      onClick={() => importBook(book.slug, currentCount > 0 ? currentCount + 1 : 1)}
                    >
                      {currentCount >= expected ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Re-import
                        </>
                      ) : currentCount > 0 ? (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Continue
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4 mr-2" />
                          Import
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default HadithManagement;
