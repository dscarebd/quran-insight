import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Scale, Search, Trash2, Plus, Loader2, ExternalLink, X, Pencil, ChevronDown } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    question: '',
    answer: '',
    author: '',
    category: '',
  });

  useEffect(() => {
    fetchMasail();
  }, []);

  const fetchMasail = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('masail')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching masail:', error);
      toast.error('Failed to fetch masail');
    } else {
      setMasailList(data || []);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({ title: '', question: '', answer: '', author: '', category: '' });
    setEditingId(null);
    setIsFormOpen(false);
  };

  const openAddForm = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const openEditForm = (masail: Masail) => {
    setFormData({
      title: masail.title,
      question: masail.question || '',
      answer: masail.answer,
      author: masail.author || '',
      category: masail.category || '',
    });
    setEditingId(masail.id);
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('শিরোনাম আবশ্যক');
      return;
    }
    if (!formData.answer.trim()) {
      toast.error('উত্তর আবশ্যক');
      return;
    }

    setIsSaving(true);
    
    try {
      if (editingId) {
        // Update existing masail
        const { error } = await supabase
          .from('masail')
          .update({
            title: formData.title.trim(),
            question: formData.question.trim() || null,
            answer: formData.answer.trim(),
            author: formData.author.trim() || null,
            category: formData.category || null,
          })
          .eq('id', editingId);

        if (error) throw error;
        toast.success('মাসআলা সফলভাবে আপডেট হয়েছে');
      } else {
        // Insert new masail
        const { error } = await supabase
          .from('masail')
          .insert({
            title: formData.title.trim(),
            question: formData.question.trim() || null,
            answer: formData.answer.trim(),
            author: formData.author.trim() || null,
            category: formData.category || null,
            source_id: `manual-${Date.now()}`,
          });

        if (error) throw error;
        toast.success('মাসআলা সফলভাবে যোগ হয়েছে');
      }

      resetForm();
      fetchMasail();
    } catch (err: any) {
      console.error('Error saving masail:', err);
      toast.error(err.message || 'সংরক্ষণ ব্যর্থ হয়েছে');
    } finally {
      setIsSaving(false);
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

  // Get unique authors and categories from existing masail
  const uniqueAuthors = useMemo(() => {
    const authors = masailList
      .map(m => m.author)
      .filter((author): author is string => !!author && author.trim() !== '');
    return [...new Set(authors)].sort();
  }, [masailList]);

  const uniqueCategories = useMemo(() => {
    const categories = masailList
      .map(m => m.category)
      .filter((category): category is string => !!category && category.trim() !== '');
    return [...new Set(categories)].sort();
  }, [masailList]);

  const filteredMasail = masailList.filter(m =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (m.author?.toLowerCase().includes(searchQuery.toLowerCase()) || false)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Scale className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold font-bengali">মাসআলা ব্যবস্থাপনা</h1>
        </div>
        
        {!isFormOpen && (
          <Button onClick={openAddForm} className="font-bengali">
            <Plus className="h-4 w-4 mr-2" /> নতুন মাসআলা যোগ করুন
          </Button>
        )}
      </div>

      {/* Add/Edit Masail Form */}
      {isFormOpen && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold font-bengali">
              {editingId ? 'মাসআলা সম্পাদনা করুন' : 'নতুন মাসআলা যোগ করুন'}
            </h2>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={resetForm}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="font-bengali">শিরোনাম *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="মাসআলার শিরোনাম লিখুন..."
                className="font-bengali"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="question" className="font-bengali">প্রশ্ন:</Label>
              <Textarea
                id="question"
                value={formData.question}
                onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
                placeholder="প্রশ্ন লিখুন (ঐচ্ছিক)..."
                className="font-bengali min-h-[100px]"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="answer" className="font-bengali">উত্তর: *</Label>
              <Textarea
                id="answer"
                value={formData.answer}
                onChange={(e) => setFormData(prev => ({ ...prev, answer: e.target.value }))}
                placeholder="উত্তর লিখুন..."
                className="font-bengali min-h-[200px]"
                rows={8}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author" className="font-bengali">লেখক/বক্তা:</Label>
              <div className="flex gap-2">
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  placeholder="যেমন: মুফতী মনসুরুল হক সাহেব"
                  className="font-bengali flex-1"
                />
                {uniqueAuthors.length > 0 && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="shrink-0">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="max-h-60 overflow-y-auto bg-background z-50">
                      {uniqueAuthors.map((author) => (
                        <DropdownMenuItem
                          key={author}
                          onClick={() => setFormData(prev => ({ ...prev, author }))}
                          className="font-bengali cursor-pointer"
                        >
                          {author}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="font-bengali">বিভাগ:</Label>
              <div className="flex gap-2">
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="বিভাগের নাম লিখুন (যেমন: নামায, রোযা, যাকাত)"
                  className="font-bengali flex-1"
                />
                {uniqueCategories.length > 0 && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="shrink-0">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="max-h-60 overflow-y-auto bg-background z-50">
                      {uniqueCategories.map((category) => (
                        <DropdownMenuItem
                          key={category}
                          onClick={() => setFormData(prev => ({ ...prev, category }))}
                          className="font-bengali cursor-pointer"
                        >
                          {category}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> সংরক্ষণ হচ্ছে...</>
                ) : editingId ? (
                  'আপডেট করুন'
                ) : (
                  'সংরক্ষণ করুন'
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={resetForm}
              >
                বাতিল
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Masail List */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold font-bengali">মাসআলা তালিকা ({masailList.length})</h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="অনুসন্ধান করুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 font-bengali"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="space-y-3">
              {filteredMasail.map((masail) => (
                <div 
                  key={masail.id} 
                  className="flex items-start justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate font-bengali">{masail.title}</h3>
                    {masail.author && (
                      <p className="text-xs text-primary mt-1 font-bengali">লেখক/বক্তা: {masail.author}</p>
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
                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-foreground"
                      onClick={() => openEditForm(masail)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => deleteMasail(masail.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {filteredMasail.length === 0 && (
                <p className="text-center text-muted-foreground py-8 font-bengali">
                  কোনো মাসআলা পাওয়া যায়নি। উপরে "নতুন মাসআলা যোগ করুন" বাটনে ক্লিক করুন।
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
