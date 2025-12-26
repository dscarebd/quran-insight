import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Upload, CheckCircle, AlertCircle, Download, FileUp, FileSpreadsheet } from "lucide-react";
import { duaCategories } from "@/data/duas";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ImportDuas = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isExportingCsv, setIsExportingCsv] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [isRestoringCsv, setIsRestoringCsv] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentCategory, setCurrentCategory] = useState("");
  const [restoreProgress, setRestoreProgress] = useState(0);
  const [result, setResult] = useState<{
    success: boolean;
    message?: string;
    categoriesImported?: number;
    duasImported?: number;
    errors?: string[];
  } | null>(null);
  const [restoreResult, setRestoreResult] = useState<{
    success: boolean;
    message?: string;
    categoriesRestored?: number;
    duasRestored?: number;
    errors?: string[];
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const csvFileInputRef = useRef<HTMLInputElement>(null);
  const csvCategoryInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // CSV Export for Categories
  const handleExportCategoriesCsv = async () => {
    setIsExportingCsv(true);
    try {
      const { data: categories, error } = await supabase
        .from('dua_categories')
        .select('*')
        .order('display_order');

      if (error) throw error;

      const headers = ['category_id', 'name_english', 'name_bengali', 'name_hindi', 'icon', 'display_order'];
      const csvContent = [
        headers.join(','),
        ...(categories || []).map(cat => 
          headers.map(h => `"${String(cat[h as keyof typeof cat] || '').replace(/"/g, '""')}"`).join(',')
        )
      ].join('\n');

      downloadFile(csvContent, `dua-categories-${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');

      toast({ title: "Export Successful", description: `Exported ${categories?.length || 0} categories to CSV` });
    } catch (error) {
      console.error("CSV export error:", error);
      toast({ title: "Export Failed", description: "Failed to export categories.", variant: "destructive" });
    } finally {
      setIsExportingCsv(false);
    }
  };

  // CSV Export for Duas
  const handleExportDuasCsv = async () => {
    setIsExportingCsv(true);
    try {
      const { data: duas, error } = await supabase
        .from('duas')
        .select('*')
        .order('category_id, dua_id');

      if (error) throw error;

      const headers = ['category_id', 'dua_id', 'title_english', 'title_bengali', 'title_hindi', 'arabic', 'transliteration', 'transliteration_bengali', 'transliteration_hindi', 'english', 'bengali', 'hindi', 'reference'];
      const csvContent = [
        headers.join(','),
        ...(duas || []).map(dua => 
          headers.map(h => `"${String(dua[h as keyof typeof dua] || '').replace(/"/g, '""')}"`).join(',')
        )
      ].join('\n');

      downloadFile(csvContent, `duas-${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');

      toast({ title: "Export Successful", description: `Exported ${duas?.length || 0} duas to CSV` });
    } catch (error) {
      console.error("CSV export error:", error);
      toast({ title: "Export Failed", description: "Failed to export duas.", variant: "destructive" });
    } finally {
      setIsExportingCsv(false);
    }
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const parseCsv = (csvText: string): Record<string, string>[] => {
    const lines = csvText.split('\n').filter(line => line.trim());
    if (lines.length < 2) return [];
    
    const headers = parseCsvLine(lines[0]);
    return lines.slice(1).map(line => {
      const values = parseCsvLine(line);
      const obj: Record<string, string> = {};
      headers.forEach((header, i) => {
        obj[header] = values[i] || '';
      });
      return obj;
    });
  };

  const parseCsvLine = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current);
    return result;
  };

  // CSV Import for Categories
  const handleImportCategoriesCsv = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsRestoringCsv(true);
    setRestoreProgress(0);
    try {
      const text = await file.text();
      const rows = parseCsv(text);
      
      let restored = 0;
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const { error } = await supabase.from('dua_categories').upsert({
          category_id: row.category_id,
          name_english: row.name_english,
          name_bengali: row.name_bengali,
          name_hindi: row.name_hindi || null,
          icon: row.icon || 'BookOpen',
          display_order: parseInt(row.display_order) || i,
        }, { onConflict: 'category_id' });
        
        if (!error) restored++;
        setRestoreProgress(Math.round(((i + 1) / rows.length) * 100));
      }

      toast({ title: "Import Successful", description: `Imported ${restored} categories from CSV` });
    } catch (error) {
      console.error("CSV import error:", error);
      toast({ title: "Import Failed", description: "Failed to import categories.", variant: "destructive" });
    } finally {
      setIsRestoringCsv(false);
      if (csvCategoryInputRef.current) csvCategoryInputRef.current.value = '';
    }
  };

  // CSV Import for Duas
  const handleImportDuasCsv = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsRestoringCsv(true);
    setRestoreProgress(0);
    try {
      const text = await file.text();
      const rows = parseCsv(text);
      
      let restored = 0;
      const batchSize = 20;
      for (let i = 0; i < rows.length; i += batchSize) {
        const batch = rows.slice(i, i + batchSize);
        const duasToInsert = batch.map(row => ({
          category_id: row.category_id,
          dua_id: row.dua_id,
          title_english: row.title_english,
          title_bengali: row.title_bengali,
          title_hindi: row.title_hindi || null,
          arabic: row.arabic,
          transliteration: row.transliteration || null,
          transliteration_bengali: row.transliteration_bengali || null,
          transliteration_hindi: row.transliteration_hindi || null,
          english: row.english,
          bengali: row.bengali,
          hindi: row.hindi || null,
          reference: row.reference || null,
        }));

        const { error } = await supabase.from('duas').upsert(duasToInsert, { onConflict: 'category_id,dua_id' });
        if (!error) restored += batch.length;
        setRestoreProgress(Math.round(((i + batch.length) / rows.length) * 100));
      }

      toast({ title: "Import Successful", description: `Imported ${restored} duas from CSV` });
    } catch (error) {
      console.error("CSV import error:", error);
      toast({ title: "Import Failed", description: "Failed to import duas.", variant: "destructive" });
    } finally {
      setIsRestoringCsv(false);
      if (csvFileInputRef.current) csvFileInputRef.current.value = '';
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const { data: categories, error: catError } = await supabase
        .from('dua_categories')
        .select('*')
        .order('display_order');

      if (catError) throw catError;

      const { data: duas, error: duaError } = await supabase
        .from('duas')
        .select('*')
        .order('category_id, dua_id');

      if (duaError) throw duaError;

      const exportData = {
        exportedAt: new Date().toISOString(),
        categories: categories || [],
        duas: duas || [],
        stats: { totalCategories: categories?.length || 0, totalDuas: duas?.length || 0 }
      };

      downloadFile(JSON.stringify(exportData, null, 2), `duas-backup-${new Date().toISOString().split('T')[0]}.json`, 'application/json');

      toast({ title: "Export Successful", description: `Exported ${exportData.stats.totalCategories} categories and ${exportData.stats.totalDuas} duas` });
    } catch (error) {
      console.error("Export error:", error);
      toast({ title: "Export Failed", description: "Failed to export duas.", variant: "destructive" });
    } finally {
      setIsExporting(false);
    }
  };

  const handleRestoreFromBackup = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsRestoring(true);
    setRestoreResult(null);
    setRestoreProgress(0);

    try {
      const text = await file.text();
      const backupData = JSON.parse(text);

      if (!backupData.categories || !backupData.duas) {
        throw new Error("Invalid backup file format. Missing categories or duas.");
      }

      let categoriesRestored = 0;
      let duasRestored = 0;
      const errors: string[] = [];
      const totalItems = backupData.categories.length + backupData.duas.length;
      let processedItems = 0;

      // Restore categories
      for (const category of backupData.categories) {
        const { error } = await supabase
          .from('dua_categories')
          .upsert({
            id: category.id,
            category_id: category.category_id,
            name_english: category.name_english,
            name_bengali: category.name_bengali,
            name_hindi: category.name_hindi,
            icon: category.icon,
            display_order: category.display_order,
          }, {
            onConflict: 'category_id'
          });

        if (error) {
          errors.push(`Category ${category.category_id}: ${error.message}`);
        } else {
          categoriesRestored++;
        }
        processedItems++;
        setRestoreProgress(Math.round((processedItems / totalItems) * 100));
      }

      // Restore duas in batches
      const batchSize = 20;
      for (let i = 0; i < backupData.duas.length; i += batchSize) {
        const batch = backupData.duas.slice(i, i + batchSize);
        
        const duasToInsert = batch.map((dua: any) => ({
          category_id: dua.category_id,
          dua_id: dua.dua_id,
          title_english: dua.title_english,
          title_bengali: dua.title_bengali,
          title_hindi: dua.title_hindi,
          arabic: dua.arabic,
          transliteration: dua.transliteration,
          transliteration_bengali: dua.transliteration_bengali,
          transliteration_hindi: dua.transliteration_hindi,
          english: dua.english,
          bengali: dua.bengali,
          hindi: dua.hindi,
          reference: dua.reference,
        }));

        const { error } = await supabase
          .from('duas')
          .upsert(duasToInsert, {
            onConflict: 'category_id,dua_id'
          });

        if (error) {
          errors.push(`Duas batch: ${error.message}`);
        } else {
          duasRestored += batch.length;
        }
        processedItems += batch.length;
        setRestoreProgress(Math.round((processedItems / totalItems) * 100));
      }

      setRestoreProgress(100);
      setRestoreResult({
        success: errors.length === 0,
        message: `Restored ${categoriesRestored} categories and ${duasRestored} duas`,
        categoriesRestored,
        duasRestored,
        errors: errors.length > 0 ? errors : undefined
      });

      toast({
        title: errors.length === 0 ? "Restore Successful" : "Restore Completed with Errors",
        description: `Restored ${categoriesRestored} categories and ${duasRestored} duas`,
        variant: errors.length > 0 ? "destructive" : "default",
      });

    } catch (error) {
      console.error("Restore error:", error);
      setRestoreResult({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error occurred",
      });
      toast({
        title: "Restore Failed",
        description: error instanceof Error ? error.message : "Failed to restore from backup.",
        variant: "destructive",
      });
    } finally {
      setIsRestoring(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

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
  const isDisabled = isImporting || isExporting || isRestoring || isExportingCsv || isRestoringCsv;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold">Import/Export Duas</h2>
          <p className="text-muted-foreground">Import duas from local file, export, or restore from backup</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button onClick={handleExport} disabled={isDisabled} variant="outline">
            {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
            Export JSON
          </Button>
        </div>
      </div>

      {/* CSV Export/Import Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            CSV Export & Import
          </CardTitle>
          <CardDescription>
            Export or import categories and duas as CSV files for easy editing in spreadsheet applications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Categories</h4>
              <div className="flex gap-2">
                <Button onClick={handleExportCategoriesCsv} disabled={isDisabled} variant="outline" size="sm">
                  {isExportingCsv ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                  Export CSV
                </Button>
                <div>
                  <Input
                    ref={csvCategoryInputRef}
                    type="file"
                    accept=".csv"
                    onChange={handleImportCategoriesCsv}
                    disabled={isDisabled}
                    className="cursor-pointer w-auto"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Duas</h4>
              <div className="flex gap-2">
                <Button onClick={handleExportDuasCsv} disabled={isDisabled} variant="outline" size="sm">
                  {isExportingCsv ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                  Export CSV
                </Button>
                <div>
                  <Input
                    ref={csvFileInputRef}
                    type="file"
                    accept=".csv"
                    onChange={handleImportDuasCsv}
                    disabled={isDisabled}
                    className="cursor-pointer w-auto"
                  />
                </div>
              </div>
            </div>
          </div>
          {isRestoringCsv && (
            <div className="space-y-2">
              <Progress value={restoreProgress} className="w-full" />
              <p className="text-sm text-muted-foreground">Importing... {restoreProgress}%</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Restore from Backup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileUp className="h-5 w-5" />
            Restore from Backup
          </CardTitle>
          <CardDescription>
            Upload a previously exported JSON backup file to restore duas and categories.
            Existing entries will be updated with backup data.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label htmlFor="backup-file" className="sr-only">Backup File</Label>
              <Input
                id="backup-file"
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleRestoreFromBackup}
                disabled={isDisabled}
                className="cursor-pointer"
              />
            </div>
          </div>

          {isRestoring && (
            <div className="space-y-2">
              <Progress value={restoreProgress} className="w-full" />
              <p className="text-sm text-muted-foreground">
                Restoring... {restoreProgress}%
              </p>
            </div>
          )}

          {restoreResult && (
            <div className={`p-4 rounded-lg ${restoreResult.success ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
              <div className="flex items-center gap-2">
                {restoreResult.success ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600" />
                )}
                <span className="font-medium">
                  {restoreResult.success ? 'Restore Complete' : 'Restore Failed'}
                </span>
              </div>
              {restoreResult.message && (
                <p className="mt-2 text-sm">{restoreResult.message}</p>
              )}
              {restoreResult.errors && restoreResult.errors.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-red-600">Errors:</p>
                  <ul className="text-sm text-red-600 list-disc list-inside max-h-40 overflow-y-auto">
                    {restoreResult.errors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Import from Local File */}
      <Card>
        <CardHeader>
          <CardTitle>Import from Local File</CardTitle>
          <CardDescription>
            This will import all {duaCategories.length} categories and {totalDuas} duas from the predefined data file into the database.
            Existing entries will be updated.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleImport} disabled={isDisabled}>
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

      {/* Available Categories */}
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
