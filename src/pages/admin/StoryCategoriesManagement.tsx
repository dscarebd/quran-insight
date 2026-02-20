import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { FolderOpen, Plus, Trash2, Pencil, X, Loader2, GripVertical } from "lucide-react";

interface StoryCategory {
  id: string;
  slug: string;
  name_english: string;
  name_bengali: string;
  display_order: number;
}

const StoryCategoriesManagement = () => {
  const [categories, setCategories] = useState<StoryCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    slug: "",
    name_english: "",
    name_bengali: "",
    display_order: 0,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("story_categories")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) {
      toast.error("Failed to load categories");
    } else {
      setCategories(data || []);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({ slug: "", name_english: "", name_bengali: "", display_order: 0 });
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleEdit = (cat: StoryCategory) => {
    setFormData({
      slug: cat.slug,
      name_english: cat.name_english,
      name_bengali: cat.name_bengali,
      display_order: cat.display_order,
    });
    setEditingId(cat.id);
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.slug || !formData.name_english || !formData.name_bengali) {
      toast.error("সকল প্রয়োজনীয় তথ্য পূরণ করুন");
      return;
    }

    setIsSaving(true);
    if (editingId) {
      const { error } = await supabase
        .from("story_categories")
        .update({
          slug: formData.slug,
          name_english: formData.name_english,
          name_bengali: formData.name_bengali,
          display_order: formData.display_order,
        })
        .eq("id", editingId);
      if (error) toast.error("আপডেট করতে ব্যর্থ হয়েছে");
      else { toast.success("বিভাগ আপডেট হয়েছে"); resetForm(); fetchCategories(); }
    } else {
      const { error } = await supabase
        .from("story_categories")
        .insert({
          slug: formData.slug,
          name_english: formData.name_english,
          name_bengali: formData.name_bengali,
          display_order: formData.display_order,
        });
      if (error) toast.error("যোগ করতে ব্যর্থ হয়েছে: " + error.message);
      else { toast.success("বিভাগ যোগ করা হয়েছে"); resetForm(); fetchCategories(); }
    }
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("এই বিভাগটি মুছতে চান?")) return;
    const { error } = await supabase.from("story_categories").delete().eq("id", id);
    if (error) toast.error("মুছতে ব্যর্থ হয়েছে");
    else { toast.success("বিভাগ মুছে ফেলা হয়েছে"); fetchCategories(); }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FolderOpen className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold font-bengali">গল্পের বিভাগ</h1>
        </div>
        {!isFormOpen && (
          <Button onClick={() => { resetForm(); setIsFormOpen(true); }} className="font-bengali">
            <Plus className="h-4 w-4 mr-2" /> নতুন বিভাগ
          </Button>
        )}
      </div>

      {isFormOpen && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold font-bengali">
              {editingId ? "বিভাগ সম্পাদনা" : "নতুন বিভাগ যোগ করুন"}
            </h2>
            <Button variant="ghost" size="icon" onClick={resetForm}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Slug *</Label>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData((p) => ({ ...p, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") }))}
                  placeholder="e.g. prophets"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>English Name *</Label>
                <Input
                  value={formData.name_english}
                  onChange={(e) => setFormData((p) => ({ ...p, name_english: e.target.value }))}
                  placeholder="Prophets"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="font-bengali">বাংলা নাম *</Label>
                <Input
                  value={formData.name_bengali}
                  onChange={(e) => setFormData((p) => ({ ...p, name_bengali: e.target.value }))}
                  placeholder="নবীদের কাহিনী"
                  className="font-bengali"
                  required
                />
              </div>
            </div>
            <div className="w-32 space-y-2">
              <Label className="font-bengali">ক্রম</Label>
              <Input
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData((p) => ({ ...p, display_order: parseInt(e.target.value) || 0 }))}
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={isSaving} className="font-bengali">
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                {editingId ? "আপডেট করুন" : "যোগ করুন"}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm} className="font-bengali">
                বাতিল
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Categories List */}
      <div className="space-y-2">
        {categories.map((cat) => (
          <Card key={cat.id} className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GripVertical className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium font-bengali">{cat.name_bengali}</p>
                <p className="text-sm text-muted-foreground">{cat.name_english} · <code className="text-xs">{cat.slug}</code></p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground mr-2">#{cat.display_order}</span>
              <Button variant="ghost" size="icon" onClick={() => handleEdit(cat)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(cat.id)} className="text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
        {categories.length === 0 && (
          <p className="text-center text-muted-foreground py-8 font-bengali">কোনো বিভাগ নেই</p>
        )}
      </div>
    </div>
  );
};

export default StoryCategoriesManagement;
