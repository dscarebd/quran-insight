import { useState, useEffect } from "react";
import { Book, Download, Loader2, RefreshCw, CheckCircle, XCircle, Pause, Play, Zap, Languages, AlertCircle } from "lucide-react";
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
  status: "idle" | "importing" | "paused" | "success" | "error" | "background";
  error?: string;
}

// Book configurations for the new API (fawazahmed0/hadith-api)
const BOOK_CONFIG: Record<string, { expectedCount: number; hasBengali: boolean }> = {
  bukhari: { expectedCount: 7563, hasBengali: true },
  muslim: { expectedCount: 3032, hasBengali: true },
  abudawud: { expectedCount: 5274, hasBengali: true },
  tirmidhi: { expectedCount: 3956, hasBengali: true },
  nasai: { expectedCount: 5758, hasBengali: true },
  ibnmajah: { expectedCount: 4342, hasBengali: true },
  malik: { expectedCount: 1832, hasBengali: true },
  nawawi: { expectedCount: 42, hasBengali: true },
  qudsi: { expectedCount: 40, hasBengali: false },
  dehlawi: { expectedCount: 40, hasBengali: false },
};

const HadithManagement = () => {
  const { toast } = useToast();
  const [books, setBooks] = useState<HadithBook[]>([]);
  const [actualCounts, setActualCounts] = useState<Record<string, number>>({});
  const [bengaliCounts, setBengaliCounts] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [importProgress, setImportProgress] = useState<Record<string, ImportProgress>>({});
  const [backgroundImports, setBackgroundImports] = useState<Record<string, boolean>>({});

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

  // Fetch actual hadith counts from the hadiths table
  const fetchActualCounts = async () => {
    const counts: Record<string, number> = {};
    const bnCounts: Record<string, number> = {};
    
    for (const slug of Object.keys(BOOK_CONFIG)) {
      const { count } = await supabase
        .from("hadiths")
        .select("id", { count: "exact", head: true })
        .eq("book_slug", slug);
      counts[slug] = count || 0;

      // Count hadiths with Bengali translations
      const { count: bnCount } = await supabase
        .from("hadiths")
        .select("id", { count: "exact", head: true })
        .eq("book_slug", slug)
        .not("bengali", "is", null);
      bnCounts[slug] = bnCount || 0;
    }
    setActualCounts(counts);
    setBengaliCounts(bnCounts);
  };

  useEffect(() => {
    fetchBooks();
    fetchActualCounts();
  }, []);

  const importBook = async (bookSlug: string) => {
    const config = BOOK_CONFIG[bookSlug];
    if (!config) return;

    setBackgroundImports(prev => ({ ...prev, [bookSlug]: true }));
    setImportProgress(prev => ({
      ...prev,
      [bookSlug]: {
        bookSlug,
        currentId: 0,
        totalExpected: config.expectedCount,
        imported: 0,
        status: "background",
      },
    }));

    try {
      const response = await supabase.functions.invoke("import-hadiths-v2", {
        body: { bookSlug, fullImport: true },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      toast({
        title: "Import Started",
        description: `${bookSlug} is importing in the background with Arabic, English${config.hasBengali ? ", and Bengali" : ""}. Click Refresh to see progress.`,
      });
    } catch (error) {
      console.error("Import error:", error);
      setBackgroundImports(prev => ({ ...prev, [bookSlug]: false }));
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
    for (const slug of Object.keys(BOOK_CONFIG)) {
      const actualCount = actualCounts[slug] || 0;
      const expected = BOOK_CONFIG[slug].expectedCount;
      if (actualCount < expected * 0.9) { // Import if less than 90% complete
        await importBook(slug);
        await new Promise(r => setTimeout(r, 1000)); // 1 second delay between starting imports
      }
    }
  };

  const refreshCounts = async () => {
    setIsLoading(true);
    await fetchBooks();
    await fetchActualCounts();
    setBackgroundImports({});
    setIsLoading(false);
    toast({ title: "Refreshed", description: "Counts updated" });
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
          <p className="text-muted-foreground">Import and manage hadith collections (10 books with Arabic, English & Bengali)</p>
        </div>
        <Button variant="outline" onClick={refreshCounts}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={importAllBooks}>
          <Zap className="h-4 w-4 mr-2" />
          Import All Books
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => {
          const config = BOOK_CONFIG[book.slug];
          if (!config) return null; // Skip books not in our config
          
          const progress = importProgress[book.slug];
          const expected = config.expectedCount;
          const actualCount = actualCounts[book.slug] || 0;
          const bnCount = bengaliCounts[book.slug] || 0;
          const percentage = expected > 0 ? Math.round((actualCount / expected) * 100) : 0;
          const bnPercentage = actualCount > 0 ? Math.round((bnCount / actualCount) * 100) : 0;
          const isDone = actualCount >= expected * 0.9; // 90% threshold for "done"
          const isImporting = backgroundImports[book.slug] || progress?.status === "background";

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
                  <div className="flex flex-col gap-1 items-end">
                    {isImporting && (
                      <Badge variant="secondary" className="animate-pulse bg-blue-500 text-white">
                        <Zap className="h-3 w-3 mr-1" />
                        Importing
                      </Badge>
                    )}
                    {!isImporting && isDone && (
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
                    {config.hasBengali ? (
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                        <Languages className="h-3 w-3 mr-1" />
                        Bengali
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        No Bengali
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Hadiths</span>
                    <span className="font-medium">
                      {actualCount.toLocaleString()} / {expected.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                  <p className="text-xs text-muted-foreground text-right">{percentage}% complete</p>
                </div>

                {actualCount > 0 && config.hasBengali && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Languages className="h-3 w-3" /> Bengali
                      </span>
                      <span className="font-medium">
                        {bnCount.toLocaleString()} / {actualCount.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={bnPercentage} className="h-2 bg-muted" />
                    <p className="text-xs text-muted-foreground text-right">{bnPercentage}% translated</p>
                  </div>
                )}

                {isImporting && (
                  <div className="text-sm text-blue-600">
                    Importing in background... Click Refresh to see progress.
                  </div>
                )}

                {progress?.error && (
                  <p className="text-sm text-destructive">{progress.error}</p>
                )}

                <div className="flex gap-2">
                  {isImporting ? (
                    <Button className="flex-1" variant="outline" onClick={refreshCounts}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Check Progress
                    </Button>
                  ) : (
                    <Button
                      className="flex-1"
                      variant={isDone ? "outline" : "default"}
                      onClick={() => importBook(book.slug)}
                    >
                      {isDone ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Re-import
                        </>
                      ) : actualCount > 0 ? (
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
