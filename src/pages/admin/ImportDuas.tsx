import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Upload, CheckCircle, AlertCircle } from "lucide-react";
import { duaCategories } from "@/data/duas";
import { Progress } from "@/components/ui/progress";

const ImportDuas = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentCategory, setCurrentCategory] = useState("");
  const [result, setResult] = useState<{
    success: boolean;
    message?: string;
    categoriesImported?: number;
    duasImported?: number;
    errors?: string[];
  } | null>(null);
  const { toast } = useToast();

  const handleImport = async () => {
    setIsImporting(true);
    setResult(null);
    setProgress(0);

    let categoriesImported = 0;
    let duasImported = 0;
    const errors: string[] = [];
    const totalCategories = duaCategories.length;

    try {
      for (let i = 0; i < duaCategories.length; i++) {
        const category = duaCategories[i];
        setCurrentCategory(category.nameEnglish);
        setProgress(Math.round((i / totalCategories) * 100));

        // Insert or update category
        const { error: categoryError } = await supabase
          .from('dua_categories')
          .upsert({
            category_id: category.id,
            name_english: category.nameEnglish,
            name_bengali: category.nameBengali,
            name_hindi: category.nameHindi || null,
            icon: category.icon,
            display_order: i
          }, {
            onConflict: 'category_id'
          });

        if (categoryError) {
          console.error(`Error importing category ${category.id}:`, categoryError);
          errors.push(`Category ${category.id}: ${categoryError.message}`);
          continue;
        }

        categoriesImported++;

        // Import duas for this category in batches
        const batchSize = 10;
        for (let j = 0; j < category.duas.length; j += batchSize) {
          const batch = category.duas.slice(j, j + batchSize);
          
          const duasToInsert = batch.map(dua => ({
            category_id: category.id,
            dua_id: dua.id,
            title_english: dua.titleEnglish || dua.id,
            title_bengali: dua.titleBengali || '',
            title_hindi: dua.titleHindi || null,
            arabic: dua.arabic,
            transliteration: dua.transliteration || null,
            transliteration_bengali: dua.transliterationBengali || null,
            transliteration_hindi: dua.transliterationHindi || null,
            english: dua.english,
            bengali: dua.bengali,
            hindi: dua.hindi || null,
            reference: dua.reference || null
          }));

          const { error: duaError } = await supabase
            .from('duas')
            .upsert(duasToInsert, {
              onConflict: 'category_id,dua_id'
            });

          if (duaError) {
            console.error(`Error importing duas batch:`, duaError);
            errors.push(`Duas batch in ${category.id}: ${duaError.message}`);
            continue;
          }

          duasImported += batch.length;
        }
      }

      setProgress(100);
      setCurrentCategory("");

      const importResult = {
        success: errors.length === 0,
        message: `Imported ${categoriesImported} categories and ${duasImported} duas`,
        categoriesImported,
        duasImported,
        errors: errors.length > 0 ? errors : undefined
      };

      setResult(importResult);

      if (importResult.success) {
        toast({
          title: "Import Successful",
          description: importResult.message,
        });
      } else {
        toast({
          title: "Import Completed with Errors",
          description: `${importResult.message}. Check errors below.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Import error:", error);
      setResult({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error occurred",
        categoriesImported,
        duasImported,
        errors
      });
      toast({
        title: "Import Failed",
        description: "Failed to import duas. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
    }
  };

  // Count total duas
  const totalDuas = duaCategories.reduce((sum, cat) => sum + cat.duas.length, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Import Duas</h2>
        <p className="text-muted-foreground">Import duas from local data file to database</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Import from Local File</CardTitle>
          <CardDescription>
            This will import all {duaCategories.length} categories and {totalDuas} duas from the predefined data file into the database.
            Existing entries will be updated.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleImport} disabled={isImporting}>
            {isImporting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Importing...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Start Import
              </>
            )}
          </Button>

          {isImporting && (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground">
                {progress}% - Importing: {currentCategory}
              </p>
            </div>
          )}

          {result && (
            <div className={`p-4 rounded-lg ${result.success ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
              <div className="flex items-center gap-2">
                {result.success ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600" />
                )}
                <span className="font-medium">
                  {result.success ? 'Import Complete' : 'Import Completed with Issues'}
                </span>
              </div>
              {result.message && (
                <p className="mt-2 text-sm">{result.message}</p>
              )}
              {result.categoriesImported !== undefined && (
                <p className="text-sm text-muted-foreground">
                  Categories: {result.categoriesImported}, Duas: {result.duasImported}
                </p>
              )}
              {result.errors && result.errors.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-red-600">Errors:</p>
                  <ul className="text-sm text-red-600 list-disc list-inside max-h-40 overflow-y-auto">
                    {result.errors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Categories</CardTitle>
          <CardDescription>
            {duaCategories.length} categories with {totalDuas} total duas ready to import
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {duaCategories.map((category, index) => (
              <div key={category.id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{index + 1}. {category.nameEnglish}</span>
                  <span className="text-xs text-muted-foreground">{category.duas.length} duas</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{category.nameBengali}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportDuas;
