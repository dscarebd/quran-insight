import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { Download, FileJson, Loader2, CheckCircle, AlertCircle, Upload, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { hadithBooks } from "@/data/hadithBooks";

interface ExportStatus {
  isExporting: boolean;
  progress: number;
  currentItem: string;
  totalItems: number;
}

interface BookExportStatus {
  [bookSlug: string]: {
    isExporting: boolean;
    exported: boolean;
    count: number;
  };
}

interface BundledBookStatus {
  [bookSlug: string]: {
    exists: boolean;
    count: number;
  };
}

const ExportData = () => {
  const [bookExportStatus, setBookExportStatus] = useState<BookExportStatus>({});
  
  const [bundledStatus, setBundledStatus] = useState({
    versesExist: false,
    versesCount: 0,
    checking: true
  });

  const [bundledBooks, setBundledBooks] = useState<BundledBookStatus>({});

  useEffect(() => {
    checkBundledFiles();
  }, []);

  const checkBundledFiles = async () => {
    let versesExist = false;
    let versesCount = 0;

    // Check verses CSV (independent try-catch)
    try {
      const versesResponse = await fetch('/data/verses-complete.csv');
      versesExist = versesResponse.ok;
      if (versesExist) {
        const versesText = await versesResponse.text();
        versesCount = versesText.split('\n').filter(line => line.trim()).length - 1;
      }
    } catch (error) {
      console.error('Error checking verses:', error);
    }

    setBundledStatus({
      versesExist,
      versesCount,
      checking: false
    });

    // Check each hadith book file independently
    const bookStatuses: BundledBookStatus = {};
    
    await Promise.all(
      hadithBooks.map(async (book) => {
        try {
          const response = await fetch(`/data/hadiths-${book.slug}.json`);
          if (response.ok) {
            const data = await response.json();
            bookStatuses[book.slug] = {
              exists: true,
              count: Array.isArray(data) ? data.length : 0
            };
          } else {
            bookStatuses[book.slug] = { exists: false, count: 0 };
          }
        } catch {
          bookStatuses[book.slug] = { exists: false, count: 0 };
        }
      })
    );

    setBundledBooks(bookStatuses);
  };

  const exportBookToJson = async (bookSlug: string, bookName: string) => {
    setBookExportStatus(prev => ({
      ...prev,
      [bookSlug]: { isExporting: true, exported: false, count: 0 }
    }));

    try {
      const allHadiths: any[] = [];
      const batchSize = 1000;
      let offset = 0;

      while (true) {
        const { data, error } = await supabase
          .from("hadiths")
          .select("book_slug, hadith_number, chapter_number, chapter_name_english, chapter_name_bengali, arabic, english, bengali, narrator_english, narrator_bengali, grade, grade_bengali")
          .eq("book_slug", bookSlug)
          .order("hadith_number", { ascending: true })
          .range(offset, offset + batchSize - 1);

        if (error) throw error;
        if (!data || data.length === 0) break;

        allHadiths.push(...data);
        offset += data.length;

        if (data.length < batchSize) break;
      }

      // Create and download JSON file
      const jsonContent = JSON.stringify(allHadiths, null, 0);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `hadiths-${bookSlug}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      const fileSizeMB = (blob.size / (1024 * 1024)).toFixed(2);
      toast.success(`Exported ${allHadiths.length.toLocaleString()} hadiths from ${bookName} (${fileSizeMB} MB)`);
      
      setBookExportStatus(prev => ({
        ...prev,
        [bookSlug]: { isExporting: false, exported: true, count: allHadiths.length }
      }));
    } catch (error) {
      console.error('Export error:', error);
      toast.error(`Failed to export ${bookName}`);
      setBookExportStatus(prev => ({
        ...prev,
        [bookSlug]: { isExporting: false, exported: false, count: 0 }
      }));
    }
  };

  const totalBundledHadiths = Object.values(bundledBooks).reduce((sum, b) => sum + b.count, 0);
  const bundledBooksCount = Object.values(bundledBooks).filter(b => b.exists).length;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Export Data for APK Bundle</h1>
        <p className="text-muted-foreground">Export database content to JSON files for 100% offline functionality</p>
      </div>

      {/* Status Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className={bundledStatus.versesExist ? "border-green-500/50 bg-green-500/5" : "border-yellow-500/50 bg-yellow-500/5"}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              {bundledStatus.checking ? (
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              ) : bundledStatus.versesExist ? (
                <CheckCircle className="h-8 w-8 text-green-500" />
              ) : (
                <AlertCircle className="h-8 w-8 text-yellow-500" />
              )}
              <div>
                <h3 className="font-semibold">Quran Verses</h3>
                {bundledStatus.versesExist ? (
                  <p className="text-sm text-green-600">{bundledStatus.versesCount.toLocaleString()} verses bundled ✓</p>
                ) : (
                  <p className="text-sm text-yellow-600">Not bundled</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={bundledBooksCount === hadithBooks.length ? "border-green-500/50 bg-green-500/5" : "border-red-500/50 bg-red-500/5"}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              {bundledStatus.checking ? (
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              ) : bundledBooksCount === hadithBooks.length ? (
                <CheckCircle className="h-8 w-8 text-green-500" />
              ) : (
                <AlertCircle className="h-8 w-8 text-red-500" />
              )}
              <div>
                <h3 className="font-semibold">Hadiths Collection</h3>
                {bundledBooksCount === hadithBooks.length ? (
                  <p className="text-sm text-green-600">{totalBundledHadiths.toLocaleString()} hadiths bundled ✓</p>
                ) : (
                  <p className="text-sm text-red-600">
                    {bundledBooksCount}/{hadithBooks.length} books bundled ({totalBundledHadiths.toLocaleString()} hadiths)
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export by Book */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Export Hadiths by Book
          </CardTitle>
          <CardDescription>
            Export each hadith book separately (smaller files for easier upload)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {hadithBooks.map((book) => {
              const status = bookExportStatus[book.slug];
              const bundled = bundledBooks[book.slug];
              const isBundled = bundled?.exists;
              
              return (
                <div 
                  key={book.slug}
                  className={`p-3 rounded-lg border ${isBundled ? 'border-green-500/30 bg-green-500/5' : 'border-border'}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-sm">{book.name_english}</p>
                      <p className="text-xs text-muted-foreground">{book.name_bengali}</p>
                    </div>
                    {isBundled && (
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {isBundled ? `${bundled.count.toLocaleString()} bundled` : `~${book.total_hadiths.toLocaleString()} hadiths`}
                    </span>
                    <Button
                      size="sm"
                      variant={isBundled ? "outline" : "default"}
                      onClick={() => exportBookToJson(book.slug, book.name_english)}
                      disabled={status?.isExporting}
                    >
                      {status?.isExporting ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Download className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload to Project
          </CardTitle>
          <CardDescription>
            After downloading, upload each JSON file to the project
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-2">
            <p className="font-medium">Steps to complete:</p>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              <li>Click each book's download button above</li>
              <li>Upload files to: <code className="bg-background px-1 rounded">public/data/hadiths-[book-slug].json</code></li>
              <li>Rebuild the app</li>
              <li>App will work 100% offline!</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Offline Data Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3">Content</th>
                  <th className="text-left py-2 px-3">Count</th>
                  <th className="text-left py-2 px-3">File</th>
                  <th className="text-left py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-3">Quran Verses</td>
                  <td className="py-2 px-3">6,236</td>
                  <td className="py-2 px-3"><code>verses-complete.csv</code></td>
                  <td className="py-2 px-3">
                    {bundledStatus.versesExist ? (
                      <span className="text-green-600 flex items-center gap-1"><CheckCircle className="h-4 w-4" /> Bundled</span>
                    ) : (
                      <span className="text-yellow-600">Missing</span>
                    )}
                  </td>
                </tr>
                {hadithBooks.map((book) => {
                  const bundled = bundledBooks[book.slug];
                  return (
                    <tr key={book.slug} className="border-b">
                      <td className="py-2 px-3">{book.name_english}</td>
                      <td className="py-2 px-3">{bundled?.count || book.total_hadiths}</td>
                      <td className="py-2 px-3"><code>hadiths-{book.slug}.json</code></td>
                      <td className="py-2 px-3">
                        {bundled?.exists ? (
                          <span className="text-green-600 flex items-center gap-1"><CheckCircle className="h-4 w-4" /> Bundled</span>
                        ) : (
                          <span className="text-red-600 flex items-center gap-1"><AlertCircle className="h-4 w-4" /> Export Required</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExportData;
