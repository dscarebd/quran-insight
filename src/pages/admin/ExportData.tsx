import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Download, Loader2, CheckCircle, AlertCircle, Upload, BookOpen, FileText, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { hadithBooks } from "@/data/hadithBooks";

interface BookExportStatus {
  [key: string]: {
    isExporting: boolean;
    exported: boolean;
    count: number;
  };
}

interface BundledBookStatus {
  [key: string]: {
    exists: boolean;
    count: number;
  };
}

// Define which books need to be split into parts
const splitBooks: Record<string, { chapterSplits: number[] }> = {
  bukhari: { chapterSplits: [48] }, // Part 1: 1-48, Part 2: 49+
  muslim: { chapterSplits: [28] },  // Part 1: 1-28, Part 2: 29+
};

const ExportData = () => {
  const [bookExportStatus, setBookExportStatus] = useState<BookExportStatus>({});
  const [isExportingVerses, setIsExportingVerses] = useState(false);
  
  const [bundledStatus, setBundledStatus] = useState({
    versesExist: false,
    versesCount: 0,
    checking: true
  });

  const [bundledBooks, setBundledBooks] = useState<BundledBookStatus>({});

  useEffect(() => {
    checkBundledFiles();
  }, []);

  // Export verses using the edge function
  const exportVersesCsv = async () => {
    setIsExportingVerses(true);
    
    try {
      toast.info("Exporting verses from database...", { duration: 3000 });
      
      const { data, error } = await supabase.functions.invoke('export-verses-csv');
      
      if (error) {
        throw error;
      }
      
      // The response is CSV text
      const csvContent = data;
      
      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'verses-complete.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      // Count verses in downloaded file
      const lines = csvContent.split('\n').filter((line: string) => line.trim()).length - 1;
      toast.success(`Exported ${lines.toLocaleString()} verses successfully!`);
      
      // Refresh bundled status
      checkBundledFiles();
      
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export verses. Check console for details.');
    } finally {
      setIsExportingVerses(false);
    }
  };

  const checkBundledFiles = async () => {
    let versesExist = false;
    let versesCount = 0;

    // Check verses CSV
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

    // Check each hadith book file (including parts for split books)
    const bookStatuses: BundledBookStatus = {};
    
    await Promise.all(
      hadithBooks.map(async (book) => {
        const isSplitBook = splitBooks[book.slug];
        
        if (isSplitBook) {
          // Check for part files
          let totalCount = 0;
          let allPartsExist = true;
          const numParts = isSplitBook.chapterSplits.length + 1;
          
          for (let part = 1; part <= numParts; part++) {
            try {
              const response = await fetch(`/data/hadiths-${book.slug}-${part}.json`);
              if (response.ok) {
                const data = await response.json();
                totalCount += Array.isArray(data) ? data.length : 0;
              } else {
                allPartsExist = false;
              }
            } catch {
              allPartsExist = false;
            }
          }
          
          bookStatuses[book.slug] = {
            exists: allPartsExist,
            count: totalCount
          };
          
          // Also track individual parts
          for (let part = 1; part <= numParts; part++) {
            try {
              const response = await fetch(`/data/hadiths-${book.slug}-${part}.json`);
              if (response.ok) {
                const data = await response.json();
                bookStatuses[`${book.slug}-${part}`] = {
                  exists: true,
                  count: Array.isArray(data) ? data.length : 0
                };
              } else {
                bookStatuses[`${book.slug}-${part}`] = { exists: false, count: 0 };
              }
            } catch {
              bookStatuses[`${book.slug}-${part}`] = { exists: false, count: 0 };
            }
          }
        } else {
          // Regular single-file book
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
        }
      })
    );

    setBundledBooks(bookStatuses);
  };

  const exportBookToJson = async (
    bookSlug: string, 
    bookName: string, 
    part?: number, 
    chapterRange?: { min: number; max: number | null }
  ) => {
    const exportKey = part ? `${bookSlug}-${part}` : bookSlug;
    
    setBookExportStatus(prev => ({
      ...prev,
      [exportKey]: { isExporting: true, exported: false, count: 0 }
    }));

    try {
      const allHadiths: any[] = [];
      const batchSize = 1000;
      let offset = 0;

      while (true) {
        let query = supabase
          .from("hadiths")
          .select("book_slug, hadith_number, chapter_number, chapter_name_english, chapter_name_bengali, arabic, english, bengali, narrator_english, narrator_bengali, grade, grade_bengali")
          .eq("book_slug", bookSlug)
          .order("hadith_number", { ascending: true });
        
        // Apply chapter filter if exporting a part
        if (chapterRange) {
          query = query.gte("chapter_number", chapterRange.min);
          if (chapterRange.max !== null) {
            query = query.lte("chapter_number", chapterRange.max);
          }
        }
        
        const { data, error } = await query.range(offset, offset + batchSize - 1);

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
      a.download = part ? `hadiths-${bookSlug}-${part}.json` : `hadiths-${bookSlug}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      const fileSizeMB = (blob.size / (1024 * 1024)).toFixed(2);
      const partLabel = part ? ` Part ${part}` : '';
      toast.success(`Exported ${allHadiths.length.toLocaleString()} hadiths from ${bookName}${partLabel} (${fileSizeMB} MB)`);
      
      setBookExportStatus(prev => ({
        ...prev,
        [exportKey]: { isExporting: false, exported: true, count: allHadiths.length }
      }));
    } catch (error) {
      console.error('Export error:', error);
      toast.error(`Failed to export ${bookName}`);
      setBookExportStatus(prev => ({
        ...prev,
        [exportKey]: { isExporting: false, exported: false, count: 0 }
      }));
    }
  };

  const totalBundledHadiths = Object.entries(bundledBooks)
    .filter(([key]) => !key.includes('-')) // Only count main book keys, not parts
    .reduce((sum, [, b]) => sum + b.count, 0);
  const bundledBooksCount = Object.entries(bundledBooks)
    .filter(([key]) => !key.includes('-'))
    .filter(([, b]) => b.exists).length;

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

      {/* Export Verses Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Export Quran Verses
          </CardTitle>
          <CardDescription>
            Export all 6,236 Quran verses from the database as a complete CSV file, sorted by surah and verse number.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
            <div>
              <p className="font-medium">Complete Verses CSV</p>
              <p className="text-sm text-muted-foreground">
                {bundledStatus.versesExist 
                  ? `Currently bundled: ${bundledStatus.versesCount.toLocaleString()} verses`
                  : "Not bundled yet"
                }
                {bundledStatus.versesCount !== 6236 && bundledStatus.versesExist && (
                  <span className="text-amber-600 ml-2">(Expected: 6,236)</span>
                )}
              </p>
            </div>
            <Button 
              onClick={exportVersesCsv}
              disabled={isExportingVerses}
              variant={bundledStatus.versesCount === 6236 ? "outline" : "default"}
            >
              {isExportingVerses ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Export Verses CSV
                </>
              )}
            </Button>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-sm">
            <p className="font-medium text-blue-800 dark:text-blue-200 mb-2">After downloading:</p>
            <ol className="list-decimal list-inside text-blue-700 dark:text-blue-300 space-y-1">
              <li>Replace <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">public/data/verses-complete.csv</code> with the downloaded file</li>
              <li>Rebuild the app for changes to take effect</li>
              <li>All 604 Quran pages will display complete verses</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* Export by Book */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Export Hadiths by Book
          </CardTitle>
          <CardDescription>
            Export each hadith book separately. Large books (Bukhari, Muslim) are split into parts to stay under 20MB.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {hadithBooks.map((book) => {
              const isSplitBook = splitBooks[book.slug];
              const bundled = bundledBooks[book.slug];
              const isBundled = bundled?.exists;
              
              if (isSplitBook) {
                // Render split book with multiple download buttons
                const numParts = isSplitBook.chapterSplits.length + 1;
                
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
                    
                    <p className="text-xs text-muted-foreground mb-2">
                      {isBundled ? `${bundled.count.toLocaleString()} bundled` : `Split into ${numParts} parts`}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {Array.from({ length: numParts }, (_, i) => i + 1).map((part) => {
                        const partKey = `${book.slug}-${part}`;
                        const status = bookExportStatus[partKey];
                        const partBundled = bundledBooks[partKey];
                        
                        // Calculate chapter range for this part
                        const splits = isSplitBook.chapterSplits;
                        const minChapter = part === 1 ? 1 : splits[part - 2] + 1;
                        const maxChapter = part <= splits.length ? splits[part - 1] : null;
                        const chapterLabel = maxChapter 
                          ? `Ch ${minChapter}-${maxChapter}`
                          : `Ch ${minChapter}+`;
                        
                        return (
                          <Button
                            key={part}
                            size="sm"
                            variant={partBundled?.exists ? "outline" : "default"}
                            onClick={() => exportBookToJson(
                              book.slug, 
                              book.name_english, 
                              part,
                              { min: minChapter, max: maxChapter }
                            )}
                            disabled={status?.isExporting}
                            className="text-xs"
                          >
                            {status?.isExporting ? (
                              <Loader2 className="h-3 w-3 animate-spin mr-1" />
                            ) : partBundled?.exists ? (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            ) : (
                              <Download className="h-3 w-3 mr-1" />
                            )}
                            Part {part} ({chapterLabel})
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                );
              }
              
              // Regular single-file book
              const status = bookExportStatus[book.slug];
              
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
              <li>For Bukhari/Muslim: Download both parts</li>
              <li>Upload files to: <code className="bg-background px-1 rounded">public/data/</code></li>
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
                  <th className="text-left py-2 px-3">File(s)</th>
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
                  const isSplitBook = splitBooks[book.slug];
                  const bundled = bundledBooks[book.slug];
                  
                  if (isSplitBook) {
                    const numParts = isSplitBook.chapterSplits.length + 1;
                    const partFiles = Array.from({ length: numParts }, (_, i) => 
                      `hadiths-${book.slug}-${i + 1}.json`
                    ).join(', ');
                    
                    return (
                      <tr key={book.slug} className="border-b">
                        <td className="py-2 px-3">{book.name_english}</td>
                        <td className="py-2 px-3">{bundled?.count || book.total_hadiths}</td>
                        <td className="py-2 px-3"><code className="text-xs">{partFiles}</code></td>
                        <td className="py-2 px-3">
                          {bundled?.exists ? (
                            <span className="text-green-600 flex items-center gap-1"><CheckCircle className="h-4 w-4" /> Bundled</span>
                          ) : (
                            <span className="text-red-600 flex items-center gap-1"><AlertCircle className="h-4 w-4" /> Export Required</span>
                          )}
                        </td>
                      </tr>
                    );
                  }
                  
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
