import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { Download, FileJson, Loader2 } from "lucide-react";
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
          currentItem: `Fetched ${offset} hadiths...`,
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

      toast.success(`Exported ${allHadiths.length} hadiths to JSON`);
      setHadithStatus({
        isExporting: false,
        progress: 100,
        currentItem: `Completed! Exported ${allHadiths.length} hadiths`,
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
        <h1 className="text-2xl font-bold">Export Data</h1>
        <p className="text-muted-foreground">Export database content to JSON files for offline bundling</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileJson className="h-5 w-5" />
              Export Hadiths
            </CardTitle>
            <CardDescription>
              Export all 36,435 hadiths to a JSON file for APK bundling
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
              <p className="text-sm text-green-600">
                ✓ {hadithStatus.currentItem}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileJson className="h-5 w-5" />
              Verses CSV
            </CardTitle>
            <CardDescription>
              Verses are already exported to public/data/verses-complete.csv (6,236 verses)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-600">
              ✓ Already bundled in the app
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Instructions</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert">
          <ol className="list-decimal list-inside space-y-2">
            <li>Click "Export Hadiths JSON" to download the complete hadiths file</li>
            <li>Place the downloaded <code>hadiths-complete.json</code> in <code>public/data/</code></li>
            <li>Rebuild the app - all data will now be bundled with the APK</li>
            <li>The app will work 100% offline from first launch</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExportData;
