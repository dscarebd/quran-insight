import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Upload, CheckCircle2, AlertCircle, RefreshCw, Download } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const ImportVerses = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [isUpdatingArabic, setIsUpdatingArabic] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [arabicProgress, setArabicProgress] = useState(0);
  const [arabicStatus, setArabicStatus] = useState("");
  const [result, setResult] = useState<{success?: boolean; message?: string; error?: string} | null>(null);
  const [arabicResult, setArabicResult] = useState<{success?: boolean; message?: string; error?: string; totalUpdated?: number} | null>(null);
  const { toast } = useToast();

  const handleExportVerses = async () => {
    setIsExporting(true);
    setExportProgress(0);
    try {
      // Fetch surahs first
      const { data: surahs, error: surahError } = await supabase
        .from('surahs')
        .select('*')
        .order('number');

      if (surahError) throw surahError;
      setExportProgress(10);

      // Fetch all verses in batches (to handle large data)
      const allVerses: any[] = [];
      const batchSize = 1000;
      let offset = 0;
      let hasMore = true;

      while (hasMore) {
        const { data: verses, error: verseError } = await supabase
          .from('verses')
          .select('*')
          .order('surah_number, verse_number')
          .range(offset, offset + batchSize - 1);

        if (verseError) throw verseError;

        if (verses && verses.length > 0) {
          allVerses.push(...verses);
          offset += batchSize;
          setExportProgress(10 + Math.min(80, Math.round((allVerses.length / 6236) * 80)));
        } else {
          hasMore = false;
        }
      }

      setExportProgress(95);

      // Create export data
      const exportData = {
        exportedAt: new Date().toISOString(),
        surahs: surahs || [],
        verses: allVerses,
        stats: {
          totalSurahs: surahs?.length || 0,
          totalVerses: allVerses.length
        }
      };

      // Download as JSON
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `quran-verses-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setExportProgress(100);

      toast({
        title: "Export Successful",
        description: `Exported ${exportData.stats.totalSurahs} surahs and ${exportData.stats.totalVerses} verses`,
      });
    } catch (error) {
      console.error("Export error:", error);
      toast({
        title: "Export Failed",
        description: "Failed to export verses. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
      setExportProgress(0);
    }
  };

  const handleImport = async () => {
    setIsImporting(true);
    setResult(null);

    try {
      // Fetch the CSV file
      const response = await fetch('/data/verses-complete.csv');
      const csvData = await response.text();

      // Call the edge function
      const { data, error } = await supabase.functions.invoke('import-verses', {
        body: { csvData }
      });

      if (error) throw error;

      setResult(data);
      toast({
        title: "Import Complete",
        description: data.message,
      });
    } catch (error: any) {
      console.error('Import error:', error);
      setResult({ error: error.message });
      toast({
        title: "Import Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
    }
  };

  const updateArabicVerses = async () => {
    setIsUpdatingArabic(true);
    setArabicResult(null);
    setArabicProgress(0);
    
    const totalSurahs = 114;
    const batchSize = 3; // Process 3 surahs at a time to prevent timeouts
    let totalUpdated = 0;
    const errors: string[] = [];

    try {
      for (let startSurah = 1; startSurah <= totalSurahs; startSurah += batchSize) {
        const endSurah = Math.min(startSurah + batchSize - 1, totalSurahs);
        setArabicStatus(`Processing Surah ${startSurah} - ${endSurah}...`);
        
        const { data, error } = await supabase.functions.invoke('update-arabic-verses', {
          body: { startSurah, endSurah }
        });

        if (error) {
          console.error(`Error updating surahs ${startSurah}-${endSurah}:`, error);
          errors.push(`Surahs ${startSurah}-${endSurah}: ${error.message}`);
        } else if (data) {
          totalUpdated += data.totalUpdated || 0;
          if (data.errors) {
            errors.push(...data.errors);
          }
        }

        const progress = Math.round((endSurah / totalSurahs) * 100);
        setArabicProgress(progress);
      }

      setArabicStatus("Complete!");
      setArabicResult({
        success: true,
        message: `Successfully updated ${totalUpdated} verses with Arabic, translations & tafsirs`,
        totalUpdated
      });
      
      toast({
        title: "Update Complete",
        description: `Updated ${totalUpdated} verses with Arabic, translations & tafsirs from Quran.com`,
      });

    } catch (error: any) {
      console.error('Arabic update error:', error);
      setArabicResult({ error: error.message });
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUpdatingArabic(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">Import/Export Verses</h1>
          <p className="text-muted-foreground">
            Import missing verses, update from Quran.com, or export backup
          </p>
        </div>
        <Button 
          onClick={handleExportVerses} 
          disabled={isExporting || isImporting || isUpdatingArabic} 
          variant="outline"
        >
          {isExporting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Exporting... {exportProgress}%
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Export All Verses
            </>
          )}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Complete Verses Import</CardTitle>
          <CardDescription>
            This will import all missing verses from the complete Quran dataset.
            Verses that already exist in the database will be skipped.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={handleImport} 
            disabled={isImporting || isUpdatingArabic}
            className="w-full sm:w-auto"
          >
            {isImporting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Importing...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Import Missing Verses
              </>
            )}
          </Button>

          {result && (
            <div className={`p-4 rounded-lg flex items-start gap-3 ${
              result.success ? 'bg-green-500/10 text-green-600' : 'bg-destructive/10 text-destructive'
            }`}>
              {result.success ? (
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              )}
              <div>
                {result.success ? (
                  <p>{result.message}</p>
                ) : (
                  <p>Error: {result.error}</p>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5" />
            Update All Content from Quran.com
          </CardTitle>
          <CardDescription>
            Fetch complete Arabic text (Uthmani script), English & Bengali translations, and English & Bengali tafsirs
            from Quran.com API. This will update all verses with full content.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={updateArabicVerses} 
            disabled={isImporting || isUpdatingArabic}
            variant="secondary"
            className="w-full sm:w-auto"
          >
            {isUpdatingArabic ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating All Content...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Update All from Quran.com
              </>
            )}
          </Button>

          {isUpdatingArabic && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{arabicStatus}</span>
                <span>{arabicProgress}%</span>
              </div>
              <Progress value={arabicProgress} className="h-2" />
            </div>
          )}

          {arabicResult && (
            <div className={`p-4 rounded-lg flex items-start gap-3 ${
              arabicResult.success ? 'bg-green-500/10 text-green-600' : 'bg-destructive/10 text-destructive'
            }`}>
              {arabicResult.success ? (
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              )}
              <div>
                {arabicResult.success ? (
                  <p>{arabicResult.message}</p>
                ) : (
                  <p>Error: {arabicResult.error}</p>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportVerses;
