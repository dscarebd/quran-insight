import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { Download, FileJson, Loader2, CheckCircle, AlertCircle, Upload } from "lucide-react";
import { toast } from "sonner";

interface ExportStatus {
  isExporting: boolean;
  progress: number;
  currentItem: string;
  totalItems: number;
}

const ExportData = () => {
  const [hadithStatus, setHadithStatus] = useState<ExportStatus>({
    isExporting: false,
    progress: 0,
    currentItem: '',
    totalItems: 0
  });
  
  const [bundledStatus, setBundledStatus] = useState({
    versesExist: false,
    hadithsExist: false,
    versesCount: 0,
    hadithsCount: 0,
    checking: true
  });

  useEffect(() => {
    checkBundledFiles();
  }, []);

  const checkBundledFiles = async () => {
    try {
      // Check verses CSV
      const versesResponse = await fetch('/data/verses-complete.csv');
      const versesExist = versesResponse.ok;
      let versesCount = 0;
      if (versesExist) {
        const versesText = await versesResponse.text();
        versesCount = versesText.split('\n').filter(line => line.trim()).length - 1; // -1 for header
      }

      // Check hadiths JSON
      const hadithsResponse = await fetch('/data/hadiths-complete.json');
      const hadithsExist = hadithsResponse.ok;
      let hadithsCount = 0;
      if (hadithsExist) {
        const hadithsData = await hadithsResponse.json();
        hadithsCount = Array.isArray(hadithsData) ? hadithsData.length : 0;
      }

      setBundledStatus({
        versesExist,
        hadithsExist,
        versesCount,
        hadithsCount,
        checking: false
      });
    } catch (error) {
      console.error('Error checking bundled files:', error);
      setBundledStatus(prev => ({ ...prev, checking: false }));
    }
  };

  const exportHadithsToJson = async () => {
    setHadithStatus({
      isExporting: true,
      progress: 0,
      currentItem: 'Starting export...',
      totalItems: 36435
    });

    try {
      const allHadiths: any[] = [];
      const batchSize = 1000;
      let offset = 0;

      while (true) {
        const { data, error } = await supabase
          .from("hadiths")
          .select("book_slug, hadith_number, chapter_number, chapter_name_english, chapter_name_bengali, arabic, english, bengali, narrator_english, narrator_bengali, grade, grade_bengali")
          .order("book_slug", { ascending: true })
          .order("hadith_number", { ascending: true })
          .range(offset, offset + batchSize - 1);

        if (error) throw error;
        if (!data || data.length === 0) break;

        allHadiths.push(...data);
        offset += data.length;

        const progress = Math.min((offset / 36435) * 100, 100);
        setHadithStatus({
          isExporting: true,
          progress,
          currentItem: `Fetched ${offset.toLocaleString()} hadiths...`,
          totalItems: 36435
        });

        if (data.length < batchSize) break;
      }

      // Create and download JSON file
      const jsonContent = JSON.stringify(allHadiths, null, 0);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'hadiths-complete.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success(`Exported ${allHadiths.length.toLocaleString()} hadiths to JSON`);
      setHadithStatus({
        isExporting: false,
        progress: 100,
        currentItem: `Completed! Exported ${allHadiths.length.toLocaleString()} hadiths`,
        totalItems: allHadiths.length
      });
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export hadiths');
      setHadithStatus({
        isExporting: false,
        progress: 0,
        currentItem: 'Export failed',
        totalItems: 0
      });
    }
  };

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

        <Card className={bundledStatus.hadithsExist ? "border-green-500/50 bg-green-500/5" : "border-red-500/50 bg-red-500/5"}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              {bundledStatus.checking ? (
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              ) : bundledStatus.hadithsExist ? (
                <CheckCircle className="h-8 w-8 text-green-500" />
              ) : (
                <AlertCircle className="h-8 w-8 text-red-500" />
              )}
              <div>
                <h3 className="font-semibold">Hadiths Collection</h3>
                {bundledStatus.hadithsExist ? (
                  <p className="text-sm text-green-600">{bundledStatus.hadithsCount.toLocaleString()} hadiths bundled ✓</p>
                ) : (
                  <p className="text-sm text-red-600">Not bundled - Export required!</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileJson className="h-5 w-5" />
              Export Hadiths
            </CardTitle>
            <CardDescription>
              Export all 36,435 hadiths to JSON file (~10MB)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {hadithStatus.isExporting && (
              <div className="space-y-2">
                <Progress value={hadithStatus.progress} />
                <p className="text-sm text-muted-foreground">{hadithStatus.currentItem}</p>
              </div>
            )}
            
            <Button 
              onClick={exportHadithsToJson} 
              disabled={hadithStatus.isExporting}
              className="w-full"
              size="lg"
            >
              {hadithStatus.isExporting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Export Hadiths JSON
                </>
              )}
            </Button>

            {hadithStatus.progress === 100 && !hadithStatus.isExporting && (
              <p className="text-sm text-green-600 font-medium">
                ✓ {hadithStatus.currentItem}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload to Project
            </CardTitle>
            <CardDescription>
              After downloading, upload the JSON file to the project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-2">
              <p className="font-medium">Steps to complete:</p>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                <li>Click "Export Hadiths JSON" to download</li>
                <li>Upload to: <code className="bg-background px-1 rounded">public/data/hadiths-complete.json</code></li>
                <li>Rebuild the app</li>
                <li>App will work 100% offline!</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>

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
                <tr className="border-b">
                  <td className="py-2 px-3">Hadiths</td>
                  <td className="py-2 px-3">36,435</td>
                  <td className="py-2 px-3"><code>hadiths-complete.json</code></td>
                  <td className="py-2 px-3">
                    {bundledStatus.hadithsExist ? (
                      <span className="text-green-600 flex items-center gap-1"><CheckCircle className="h-4 w-4" /> Bundled</span>
                    ) : (
                      <span className="text-red-600 flex items-center gap-1"><AlertCircle className="h-4 w-4" /> Export Required</span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExportData;
