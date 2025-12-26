import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Upload, CheckCircle2, AlertCircle, RefreshCw, Download, FileUp, FileSpreadsheet, Trash2, BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ImportVerses = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [isUpdatingArabic, setIsUpdatingArabic] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isExportingCsv, setIsExportingCsv] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [isRestoringCsv, setIsRestoringCsv] = useState(false);
  const [isClearingTafsir, setIsClearingTafsir] = useState(false);
  const [isFixingTafsir, setIsFixingTafsir] = useState(false);
  const [isFetchingTafheem, setIsFetchingTafheem] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [restoreProgress, setRestoreProgress] = useState(0);
  const [arabicProgress, setArabicProgress] = useState(0);
  const [tafsirProgress, setTafsirProgress] = useState(0);
  const [arabicStatus, setArabicStatus] = useState("");
  const [tafsirStatus, setTafsirStatus] = useState("");
  const [result, setResult] = useState<{success?: boolean; message?: string; error?: string} | null>(null);
  const [arabicResult, setArabicResult] = useState<{success?: boolean; message?: string; error?: string; totalUpdated?: number} | null>(null);
  const [tafsirResult, setTafsirResult] = useState<{success?: boolean; message?: string; error?: string; clearedCount?: number; totalUpdated?: number} | null>(null);
  const [restoreResult, setRestoreResult] = useState<{success?: boolean; message?: string; surahsRestored?: number; versesRestored?: number; errors?: string[]} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const csvSurahInputRef = useRef<HTMLInputElement>(null);
  const csvVerseInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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
      headers.forEach((header, i) => { obj[header] = values[i] || ''; });
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
        if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
        else { inQuotes = !inQuotes; }
      } else if (char === ',' && !inQuotes) { result.push(current); current = ''; }
      else { current += char; }
    }
    result.push(current);
    return result;
  };

  // CSV Export for Surahs
  const handleExportSurahsCsv = async () => {
    setIsExportingCsv(true);
    try {
      const { data: surahs, error } = await supabase.from('surahs').select('*').order('number');
      if (error) throw error;

      const headers = ['number', 'name_arabic', 'name_english', 'name_bengali', 'meaning_english', 'meaning_bengali', 'revelation_type', 'total_verses'];
      const csvContent = [
        headers.join(','),
        ...(surahs || []).map(s => headers.map(h => `"${String(s[h as keyof typeof s] || '').replace(/"/g, '""')}"`).join(','))
      ].join('\n');

      downloadFile(csvContent, `surahs-${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');
      toast({ title: "Export Successful", description: `Exported ${surahs?.length || 0} surahs to CSV` });
    } catch (error) {
      console.error("CSV export error:", error);
      toast({ title: "Export Failed", description: "Failed to export surahs.", variant: "destructive" });
    } finally {
      setIsExportingCsv(false);
    }
  };

  // CSV Export for Verses
  const handleExportVersesCsv = async () => {
    setIsExportingCsv(true);
    setExportProgress(0);
    try {
      const allVerses: any[] = [];
      const batchSize = 1000;
      let offset = 0;
      let hasMore = true;

      while (hasMore) {
        const { data: verses, error } = await supabase.from('verses').select('*').order('surah_number, verse_number').range(offset, offset + batchSize - 1);
        if (error) throw error;
        if (verses && verses.length > 0) { allVerses.push(...verses); offset += batchSize; setExportProgress(Math.min(90, Math.round((allVerses.length / 6236) * 90))); }
        else { hasMore = false; }
      }

      const headers = ['surah_number', 'verse_number', 'arabic', 'english', 'bengali', 'tafsir_english', 'tafsir_bengali'];
      const csvContent = [
        headers.join(','),
        ...allVerses.map(v => headers.map(h => `"${String(v[h as keyof typeof v] || '').replace(/"/g, '""')}"`).join(','))
      ].join('\n');

      downloadFile(csvContent, `verses-${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');
      setExportProgress(100);
      toast({ title: "Export Successful", description: `Exported ${allVerses.length} verses to CSV` });
    } catch (error) {
      console.error("CSV export error:", error);
      toast({ title: "Export Failed", description: "Failed to export verses.", variant: "destructive" });
    } finally {
      setIsExportingCsv(false);
      setExportProgress(0);
    }
  };

  // CSV Import for Surahs
  const handleImportSurahsCsv = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
        const { error } = await supabase.from('surahs').upsert({
          number: parseInt(row.number),
          name_arabic: row.name_arabic,
          name_english: row.name_english,
          name_bengali: row.name_bengali,
          meaning_english: row.meaning_english,
          meaning_bengali: row.meaning_bengali,
          revelation_type: row.revelation_type,
          total_verses: parseInt(row.total_verses),
        }, { onConflict: 'number' });
        if (!error) restored++;
        setRestoreProgress(Math.round(((i + 1) / rows.length) * 100));
      }

      toast({ title: "Import Successful", description: `Imported ${restored} surahs from CSV` });
    } catch (error) {
      console.error("CSV import error:", error);
      toast({ title: "Import Failed", description: "Failed to import surahs.", variant: "destructive" });
    } finally {
      setIsRestoringCsv(false);
      if (csvSurahInputRef.current) csvSurahInputRef.current.value = '';
    }
  };

  // CSV Import for Verses
  const handleImportVersesCsv = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsRestoringCsv(true);
    setRestoreProgress(0);
    try {
      const text = await file.text();
      const rows = parseCsv(text);
      let restored = 0;
      const batchSize = 100;

      for (let i = 0; i < rows.length; i += batchSize) {
        const batch = rows.slice(i, i + batchSize);
        const versesToInsert = batch.map(row => ({
          surah_number: parseInt(row.surah_number),
          verse_number: parseInt(row.verse_number),
          arabic: row.arabic,
          english: row.english,
          bengali: row.bengali,
          tafsir_english: row.tafsir_english || null,
          tafsir_bengali: row.tafsir_bengali || null,
        }));

        const { error } = await supabase.from('verses').upsert(versesToInsert, { onConflict: 'surah_number,verse_number' });
        if (!error) restored += batch.length;
        setRestoreProgress(Math.round(((i + batch.length) / rows.length) * 100));
      }

      toast({ title: "Import Successful", description: `Imported ${restored} verses from CSV` });
    } catch (error) {
      console.error("CSV import error:", error);
      toast({ title: "Import Failed", description: "Failed to import verses.", variant: "destructive" });
    } finally {
      setIsRestoringCsv(false);
      if (csvVerseInputRef.current) csvVerseInputRef.current.value = '';
    }
  };

  const handleExportVerses = async () => {
    setIsExporting(true);
    setExportProgress(0);
    try {
      const { data: surahs, error: surahError } = await supabase.from('surahs').select('*').order('number');
      if (surahError) throw surahError;
      setExportProgress(10);

      const allVerses: any[] = [];
      const batchSize = 1000;
      let offset = 0;
      let hasMore = true;

      while (hasMore) {
        const { data: verses, error: verseError } = await supabase.from('verses').select('*').order('surah_number, verse_number').range(offset, offset + batchSize - 1);
        if (verseError) throw verseError;
        if (verses && verses.length > 0) { allVerses.push(...verses); offset += batchSize; setExportProgress(10 + Math.min(80, Math.round((allVerses.length / 6236) * 80))); }
        else { hasMore = false; }
      }

      setExportProgress(95);

      const exportData = {
        exportedAt: new Date().toISOString(),
        surahs: surahs || [],
        verses: allVerses,
        stats: { totalSurahs: surahs?.length || 0, totalVerses: allVerses.length }
      };

      downloadFile(JSON.stringify(exportData, null, 2), `quran-verses-backup-${new Date().toISOString().split('T')[0]}.json`, 'application/json');
      setExportProgress(100);

      toast({ title: "Export Successful", description: `Exported ${exportData.stats.totalSurahs} surahs and ${exportData.stats.totalVerses} verses` });
    } catch (error) {
      console.error("Export error:", error);
      toast({ title: "Export Failed", description: "Failed to export verses.", variant: "destructive" });
    } finally {
      setIsExporting(false);
      setExportProgress(0);
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

      if (!backupData.surahs || !backupData.verses) {
        throw new Error("Invalid backup file format. Missing surahs or verses.");
      }

      let surahsRestored = 0;
      let versesRestored = 0;
      const errors: string[] = [];

      // Restore surahs first
      setRestoreProgress(5);
      for (const surah of backupData.surahs) {
        const { error } = await supabase
          .from('surahs')
          .upsert({
            id: surah.id,
            number: surah.number,
            name_arabic: surah.name_arabic,
            name_english: surah.name_english,
            name_bengali: surah.name_bengali,
            meaning_english: surah.meaning_english,
            meaning_bengali: surah.meaning_bengali,
            revelation_type: surah.revelation_type,
            total_verses: surah.total_verses,
          }, {
            onConflict: 'number'
          });

        if (error) {
          errors.push(`Surah ${surah.number}: ${error.message}`);
        } else {
          surahsRestored++;
        }
      }

      setRestoreProgress(15);

      // Restore verses in batches
      const batchSize = 100;
      const totalVerses = backupData.verses.length;

      for (let i = 0; i < totalVerses; i += batchSize) {
        const batch = backupData.verses.slice(i, i + batchSize);
        
        const versesToInsert = batch.map((verse: any) => ({
          surah_number: verse.surah_number,
          verse_number: verse.verse_number,
          arabic: verse.arabic,
          bengali: verse.bengali,
          english: verse.english,
          tafsir_bengali: verse.tafsir_bengali,
          tafsir_english: verse.tafsir_english,
        }));

        const { error } = await supabase
          .from('verses')
          .upsert(versesToInsert, {
            onConflict: 'surah_number,verse_number'
          });

        if (error) {
          errors.push(`Verses batch ${i}-${i + batch.length}: ${error.message}`);
        } else {
          versesRestored += batch.length;
        }

        setRestoreProgress(15 + Math.round((i / totalVerses) * 85));
      }

      setRestoreProgress(100);
      setRestoreResult({
        success: errors.length === 0,
        message: `Restored ${surahsRestored} surahs and ${versesRestored} verses`,
        surahsRestored,
        versesRestored,
        errors: errors.length > 0 ? errors : undefined
      });

      toast({
        title: errors.length === 0 ? "Restore Successful" : "Restore Completed with Errors",
        description: `Restored ${surahsRestored} surahs and ${versesRestored} verses`,
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

  // Clear wrong language tafsir
  const clearWrongTafsir = async () => {
    setIsClearingTafsir(true);
    setTafsirResult(null);
    
    try {
      setTafsirStatus("Clearing non-Bengali tafsir data...");
      
      const { data, error } = await supabase.functions.invoke('update-arabic-verses', {
        body: { clearWrongTafsir: true }
      });

      if (error) throw error;

      setTafsirResult({
        success: true,
        message: data.message,
        clearedCount: data.clearedCount
      });
      
      toast({
        title: "Clear Complete",
        description: data.message,
      });

    } catch (error: any) {
      console.error('Clear tafsir error:', error);
      setTafsirResult({ error: error.message });
      toast({
        title: "Clear Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsClearingTafsir(false);
      setTafsirStatus("");
    }
  };

  // Fix Bengali tafsir - re-fetch only tafsir (one surah at a time to avoid timeouts)
  const fixBengaliTafsir = async () => {
    setIsFixingTafsir(true);
    setTafsirResult(null);
    setTafsirProgress(0);
    
    const totalSurahs = 114;
    let totalUpdated = 0;
    const errors: string[] = [];

    try {
      // Process ONE surah at a time to avoid edge function timeouts
      for (let surah = 1; surah <= totalSurahs; surah++) {
        setTafsirStatus(`Fetching Bengali tafsir for Surah ${surah}/114...`);
        
        const { data, error } = await supabase.functions.invoke('update-arabic-verses', {
          body: { surahNumber: surah, tafsirOnly: true }
        });

        if (error) {
          console.error(`Error updating tafsir Surah ${surah}:`, error);
          errors.push(`Surah ${surah}: ${error.message}`);
          // Continue with next surah even on error
        } else if (data) {
          totalUpdated += data.totalUpdated || 0;
          if (data.errors) {
            errors.push(...data.errors);
          }
        }

        const progress = Math.round((surah / totalSurahs) * 100);
        setTafsirProgress(progress);
        
        // Small delay between API calls to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      setTafsirStatus("Complete!");
      setTafsirResult({
        success: true,
        message: `Successfully updated ${totalUpdated} verses with Bengali tafsir from 4 sources`,
        totalUpdated
      });
      
      toast({
        title: "Tafsir Update Complete",
        description: `Updated ${totalUpdated} verses with Bengali tafsir from all 4 Quran.com sources`,
      });

    } catch (error: any) {
      console.error('Tafsir update error:', error);
      setTafsirResult({ error: error.message });
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsFixingTafsir(false);
    }
  };

  // Fetch Bengali tafsir from alQuranBD (Tafhimul Quran)
  const fetchTafheemTafsir = async () => {
    setIsFetchingTafheem(true);
    setTafsirResult(null);
    setTafsirProgress(0);
    
    const totalSurahs = 114;
    const batchSize = 5;
    let totalUpdated = 0;
    const errors: string[] = [];

    try {
      for (let startSurah = 1; startSurah <= totalSurahs; startSurah += batchSize) {
        const endSurah = Math.min(startSurah + batchSize - 1, totalSurahs);
        setTafsirStatus(`Fetching Tafhimul Quran for Surah ${startSurah} - ${endSurah}...`);
        
        const { data, error } = await supabase.functions.invoke('fetch-bengali-tafsir', {
          body: { startSurah, endSurah }
        });

        if (error) {
          console.error(`Error fetching tafsir ${startSurah}-${endSurah}:`, error);
          errors.push(`Surahs ${startSurah}-${endSurah}: ${error.message}`);
        } else if (data) {
          totalUpdated += data.totalUpdated || 0;
          if (data.errors) {
            errors.push(...data.errors);
          }
        }

        const progress = Math.round((endSurah / totalSurahs) * 100);
        setTafsirProgress(progress);
      }

      setTafsirStatus("Complete!");
      setTafsirResult({
        success: true,
        message: `Successfully fetched ${totalUpdated} verses with Tafhimul Quran tafsir`,
        totalUpdated
      });
      
      toast({
        title: "Tafhimul Quran Import Complete",
        description: `Updated ${totalUpdated} verses with Bengali tafsir from alQuranBD`,
      });

    } catch (error: any) {
      console.error('Tafheem fetch error:', error);
      setTafsirResult({ error: error.message });
      toast({
        title: "Fetch Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsFetchingTafheem(false);
    }
  };

  const isDisabled = isImporting || isUpdatingArabic || isExporting || isRestoring || isExportingCsv || isRestoringCsv || isClearingTafsir || isFixingTafsir || isFetchingTafheem;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">Import/Export Verses</h1>
          <p className="text-muted-foreground">Import verses, update from Quran.com, export backup, or restore</p>
        </div>
        <Button onClick={handleExportVerses} disabled={isDisabled} variant="outline">
          {isExporting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Exporting... {exportProgress}%</> : <><Download className="mr-2 h-4 w-4" />Export JSON</>}
        </Button>
      </div>

      {/* CSV Export/Import Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            CSV Export & Import
          </CardTitle>
          <CardDescription>Export or import surahs and verses as CSV files for easy editing in spreadsheet applications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Surahs</h4>
              <div className="flex gap-2">
                <Button onClick={handleExportSurahsCsv} disabled={isDisabled} variant="outline" size="sm">
                  {isExportingCsv ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                  Export CSV
                </Button>
                <Input ref={csvSurahInputRef} type="file" accept=".csv" onChange={handleImportSurahsCsv} disabled={isDisabled} className="cursor-pointer w-auto" />
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Verses</h4>
              <div className="flex gap-2">
                <Button onClick={handleExportVersesCsv} disabled={isDisabled} variant="outline" size="sm">
                  {isExportingCsv ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                  Export CSV
                </Button>
                <Input ref={csvVerseInputRef} type="file" accept=".csv" onChange={handleImportVersesCsv} disabled={isDisabled} className="cursor-pointer w-auto" />
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
            Upload a previously exported JSON backup file to restore surahs and verses.
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
            <div className={`p-4 rounded-lg flex items-start gap-3 ${
              restoreResult.success ? 'bg-green-500/10 text-green-600' : 'bg-destructive/10 text-destructive'
            }`}>
              {restoreResult.success ? (
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <p>{restoreResult.message}</p>
                {restoreResult.errors && restoreResult.errors.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium">Errors:</p>
                    <ul className="text-sm list-disc list-inside max-h-40 overflow-y-auto">
                      {restoreResult.errors.slice(0, 10).map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                      {restoreResult.errors.length > 10 && (
                        <li>... and {restoreResult.errors.length - 10} more errors</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

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
            disabled={isDisabled}
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
            disabled={isDisabled}
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

      {/* Fix Tafsir Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Fix Bengali Tafsir
          </CardTitle>
          <CardDescription>
            Clear wrong language data and import complete Bengali tafsir. 
            <strong> Option B (Tafhimul Quran)</strong> is recommended for complete coverage.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={clearWrongTafsir} 
              disabled={isDisabled}
              variant="destructive"
              className="w-full sm:w-auto"
            >
              {isClearingTafsir ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Clearing...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Step 1: Clear Wrong Tafsir
                </>
              )}
            </Button>

            <Button 
              onClick={fixBengaliTafsir} 
              disabled={isDisabled}
              variant="secondary"
              className="w-full sm:w-auto"
            >
              {isFixingTafsir ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Re-fetching from Quran.com...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Option A: Quran.com Tafsir
                </>
              )}
            </Button>

            <Button 
              onClick={fetchTafheemTafsir} 
              disabled={isDisabled}
              variant="default"
              className="w-full sm:w-auto"
            >
              {isFetchingTafheem ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Fetching Tafhimul Quran...
                </>
              ) : (
                <>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Option B: Tafhimul Quran (Complete)
                </>
              )}
            </Button>
          </div>

          {(isClearingTafsir || isFixingTafsir || isFetchingTafheem) && tafsirStatus && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{tafsirStatus}</span>
                {(isFixingTafsir || isFetchingTafheem) && <span>{tafsirProgress}%</span>}
              </div>
              {(isFixingTafsir || isFetchingTafheem) && <Progress value={tafsirProgress} className="h-2" />}
            </div>
          )}

          {tafsirResult && (
            <div className={`p-4 rounded-lg flex items-start gap-3 ${
              tafsirResult.success ? 'bg-green-500/10 text-green-600' : 'bg-destructive/10 text-destructive'
            }`}>
              {tafsirResult.success ? (
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              )}
              <div>
                {tafsirResult.success ? (
                  <p>{tafsirResult.message}</p>
                ) : (
                  <p>Error: {tafsirResult.error}</p>
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
