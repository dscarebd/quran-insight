import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Scale, Search, Trash2, Download, Loader2, ExternalLink } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Masail {
  id: string;
  title: string;
  question: string | null;
  answer: string;
  author: string | null;
  source_url: string | null;
  category: string | null;
  created_at: string;
}

const MasailManagement = () => {
  const [masailList, setMasailList] = useState<Masail[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Import state
  const [discoveredUrls, setDiscoveredUrls] = useState<string[]>([]);
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState({ imported: 0, total: 0, skipped: 0, failed: 0 });
  const [activeSource, setActiveSource] = useState<'islamqa' | 'islamijindegi'>('islamqa');

  useEffect(() => {
    fetchMasail();
  }, []);

  const fetchMasail = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('masail')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Error fetching masail:', error);
      toast.error('Failed to fetch masail');
    } else {
      setMasailList(data || []);
    }
    setLoading(false);
  };

  const discoverUrls = async () => {
    setIsDiscovering(true);
    setDiscoveredUrls([]);
    
    try {
      const action = activeSource === 'islamqa' ? 'map-islamqa' : 'map';
      
      const { data, error } = await supabase.functions.invoke('scrape-masail', {
        body: { action },
      });

      if (error) throw error;
      
      if (data.success) {
        setDiscoveredUrls(data.urls || []);
        toast.success(`Discovered ${data.total} masail URLs from ${activeSource === 'islamqa' ? 'IslamQA.info' : 'islamijindegi.com'}`);
      } else {
        toast.error(data.error || 'Failed to discover URLs');
      }
    } catch (err: any) {
      console.error('Error discovering URLs:', err);
      toast.error(err.message || 'Failed to discover URLs');
    } finally {
      setIsDiscovering(false);
    }
  };

  const startImport = async () => {
    if (discoveredUrls.length === 0) {
      toast.error('No URLs to import. Discover URLs first.');
      return;
    }

    setIsImporting(true);
    setImportProgress({ imported: 0, total: discoveredUrls.length, skipped: 0, failed: 0 });

    let remainingUrls = [...discoveredUrls];
    let totalImported = 0;
    let totalSkipped = 0;
    let totalFailed = 0;

    const action = activeSource === 'islamqa' ? 'batch-islamqa' : 'batch';
    const batchSize = activeSource === 'islamqa' ? 3 : 5;

    try {
      while (remainingUrls.length > 0) {
        const { data, error } = await supabase.functions.invoke('scrape-masail', {
          body: { action, urls: remainingUrls },
        });

        if (error) throw error;

        if (data.success) {
          totalImported += data.results.imported;
          totalSkipped += data.results.skipped;
          totalFailed += data.results.failed;
          
          setImportProgress({
            imported: totalImported,
            total: discoveredUrls.length,
            skipped: totalSkipped,
            failed: totalFailed,
          });

          remainingUrls = remainingUrls.slice(batchSize);
          
          if (remainingUrls.length > 0) {
            await new Promise(resolve => setTimeout(resolve, 1500));
          }
        } else {
          toast.error(data.error || 'Batch import failed');
          break;
        }
      }

      toast.success(`Import complete: ${totalImported} imported, ${totalSkipped} skipped, ${totalFailed} failed`);
      fetchMasail();
    } catch (err: any) {
      console.error('Error during import:', err);
      toast.error(err.message || 'Import failed');
    } finally {
      setIsImporting(false);
    }
  };

  const deleteMasail = async (id: string) => {
    const { error } = await supabase
      .from('masail')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Failed to delete masail');
    } else {
      toast.success('Masail deleted');
      setMasailList(prev => prev.filter(m => m.id !== id));
    }
  };

  const filteredMasail = masailList.filter(m =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (m.category?.toLowerCase().includes(searchQuery.toLowerCase()) || false)
  );

  const progressPercent = importProgress.total > 0 
    ? ((importProgress.imported + importProgress.skipped + importProgress.failed) / importProgress.total) * 100 
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Scale className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Masail Management</h1>
      </div>

      {/* Import Section */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Import Masail</h2>
        
        <Tabs value={activeSource} onValueChange={(v) => {
          setActiveSource(v as 'islamqa' | 'islamijindegi');
          setDiscoveredUrls([]);
        }}>
          <TabsList className="mb-4">
            <TabsTrigger value="islamqa" className="flex items-center gap-2">
              <span>🌐</span> IslamQA.info (Bengali)
            </TabsTrigger>
            <TabsTrigger value="islamijindegi" className="flex items-center gap-2">
              <span>📚</span> islamijindegi.com
            </TabsTrigger>
          </TabsList>

          <TabsContent value="islamqa" className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Import high-quality Bengali Islamic Q&A from IslamQA.info - a trusted source with well-structured fatwas.
            </p>
            <div className="flex gap-3">
              <Button 
                onClick={discoverUrls} 
                disabled={isDiscovering || isImporting}
                variant="outline"
              >
                {isDiscovering ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Discovering...</>
                ) : (
                  <><Search className="h-4 w-4 mr-2" /> Discover URLs</>
                )}
              </Button>
              
              <Button 
                onClick={startImport} 
                disabled={isImporting || discoveredUrls.length === 0}
              >
                {isImporting ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Importing...</>
                ) : (
                  <><Download className="h-4 w-4 mr-2" /> Import ({discoveredUrls.length})</>
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="islamijindegi" className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Import masail from islamijindegi.com (original source).
            </p>
            <div className="flex gap-3">
              <Button 
                onClick={discoverUrls} 
                disabled={isDiscovering || isImporting}
                variant="outline"
              >
                {isDiscovering ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Discovering...</>
                ) : (
                  <><Search className="h-4 w-4 mr-2" /> Discover URLs</>
                )}
              </Button>
              
              <Button 
                onClick={startImport} 
                disabled={isImporting || discoveredUrls.length === 0}
              >
                {isImporting ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Importing...</>
                ) : (
                  <><Download className="h-4 w-4 mr-2" /> Import ({discoveredUrls.length})</>
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {discoveredUrls.length > 0 && (
          <p className="text-sm text-muted-foreground mt-4">
            Found {discoveredUrls.length} masail URLs ready to import
          </p>
        )}

        {isImporting && (
          <div className="space-y-2 mt-4">
            <Progress value={progressPercent} className="h-2" />
            <p className="text-sm text-muted-foreground">
              Imported: {importProgress.imported} | Skipped: {importProgress.skipped} | Failed: {importProgress.failed} / {importProgress.total}
            </p>
          </div>
        )}
      </Card>

      {/* Masail List */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Imported Masail ({masailList.length})</h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search masail..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <ScrollArea className="h-[400px]">
            <div className="space-y-3">
              {filteredMasail.map((masail) => (
                <div 
                  key={masail.id} 
                  className="flex items-start justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-sm truncate font-bengali">{masail.title}</h3>
                      {masail.category && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full shrink-0">
                          {masail.category}
                        </span>
                      )}
                    </div>
                    {masail.author && (
                      <p className="text-xs text-muted-foreground mt-1 font-bengali">{masail.author}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2 font-bengali">
                      {masail.answer.substring(0, 150)}...
                    </p>
                    {masail.source_url && (
                      <a 
                        href={masail.source_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline flex items-center gap-1 mt-1"
                      >
                        <ExternalLink className="h-3 w-3" /> Source
                      </a>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 text-destructive hover:text-destructive"
                    onClick={() => deleteMasail(masail.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              {filteredMasail.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No masail found. Start by discovering and importing URLs.
                </p>
              )}
            </div>
          </ScrollArea>
        )}
      </Card>
    </div>
  );
};

export default MasailManagement;
