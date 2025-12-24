import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Upload, CheckCircle2, AlertCircle } from "lucide-react";

const ImportVerses = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [result, setResult] = useState<{success?: boolean; message?: string; error?: string} | null>(null);
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Import Verses</h1>
        <p className="text-muted-foreground">
          Import missing verses from the complete Quran CSV file
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
            disabled={isImporting}
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
    </div>
  );
};

export default ImportVerses;
