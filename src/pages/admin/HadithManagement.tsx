import { useState, useEffect } from "react";
import { Book, Download, Loader2, RefreshCw, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

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
  currentPage: number;
  totalPages: number;
  imported: number;
  status: "idle" | "importing" | "success" | "error";
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

  const importBook = async (bookSlug: string) => {
    const perPage = 100;
    let page = 1;
    let hasMore = true;
    let totalImported = 0;

    setImportProgress(prev => ({
      ...prev,
      [bookSlug]: {
        bookSlug,
        currentPage: 1,
        totalPages: 1,
        imported: 0,
        status: "importing",
      },
    }));

    try {
      while (hasMore) {
        const response = await supabase.functions.invoke("import-hadiths", {
          body: { bookSlug, page, perPage },
        });

        if (response.error) {
          throw new Error(response.error.message);
        }

        const { imported, pagination, totalInBook } = response.data;
        totalImported += imported;

        setImportProgress(prev => ({
          ...prev,
          [bookSlug]: {
            bookSlug,
            currentPage: pagination?.current_page || page,
            totalPages: pagination?.last_page || 1,
            imported: totalInBook || totalImported,
            status: "importing",
          },
        }));

        hasMore = pagination?.current_page < pagination?.last_page;
        page++;

        // Small delay to avoid rate limiting
        if (hasMore) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }

      setImportProgress(prev => ({
        ...prev,
        [bookSlug]: {
          ...prev[bookSlug],
          status: "success",
        },
      }));

      toast({
        title: "Import Complete",
        description: `Successfully imported ${totalImported} hadiths from ${bookSlug}`,
      });

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

  const importAllBooks = async () => {
    for (const book of books) {
      await importBook(book.slug);
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
          <p className="text-muted-foreground">Import and manage hadith collections</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchBooks}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={importAllBooks}>
            <Download className="h-4 w-4 mr-2" />
            Import All
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => {
          const progress = importProgress[book.slug];
          const expected = expectedCounts[book.slug] || 0;
          const percentage = expected > 0 ? Math.round((book.total_hadiths / expected) * 100) : 0;

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
                      {book.total_hadiths.toLocaleString()} / {expected.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                  <p className="text-xs text-muted-foreground text-right">{percentage}% complete</p>
                </div>

                {progress?.status === "importing" && (
                  <div className="text-sm text-muted-foreground">
                    Page {progress.currentPage} of {progress.totalPages}
                  </div>
                )}

                {progress?.error && (
                  <p className="text-sm text-destructive">{progress.error}</p>
                )}

                <Button
                  className="w-full"
                  variant={book.total_hadiths >= expected ? "outline" : "default"}
                  disabled={progress?.status === "importing"}
                  onClick={() => importBook(book.slug)}
                >
                  {progress?.status === "importing" ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Importing...
                    </>
                  ) : book.total_hadiths >= expected ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Re-import
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Import Hadiths
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default HadithManagement;
