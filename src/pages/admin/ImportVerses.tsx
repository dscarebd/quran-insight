import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Upload, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const ImportVerses = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [isUpdatingArabic, setIsUpdatingArabic] = useState(false);
  const [arabicProgress, setArabicProgress] = useState(0);
  const [arabicStatus, setArabicStatus] = useState("");
  const [result, setResult] = useState<{success?: boolean; message?: string; error?: string} | null>(null);
  const [arabicResult, setArabicResult] = useState<{success?: boolean; message?: string; error?: string; totalUpdated?: number} | null>(null);
  const { toast } = useToast();

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
    const batchSize = 10; // Process 10 surahs at a time
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
        message: `Successfully updated ${totalUpdated} verses with complete Arabic text`,
        totalUpdated
      });
      
      toast({
        title: "Arabic Update Complete",
        description: `Updated ${totalUpdated} verses with complete Arabic text from Quran.com`,
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
      <div>
        <h1 className="text-2xl font-bold">Import Verses</h1>
        <p className="text-muted-foreground">
          Import missing verses and update Arabic text from Quran.com
        </p>
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
            Update Arabic Text from Quran.com
          </CardTitle>
          <CardDescription>
            Fetch complete Arabic text (Uthmani script) from Quran.com API and update all verses.
            This will replace truncated Arabic text with the full verses.
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
                Updating Arabic Text...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Update Arabic from Quran.com
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
