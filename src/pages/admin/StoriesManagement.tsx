import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ScrollText, Search, Trash2, Plus, Loader2, X, Pencil, ChevronDown, Upload, ImageIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Story {
  id: string;
  title_english: string;
  title_bengali: string;
  content_english: string;
  content_bengali: string;
  category: string;
  cover_image_url: string | null;
  author: string | null;
  is_published: boolean;
  display_order: number;
  created_at: string;
}

const CATEGORIES = [
  { value: "prophets", label: "নবীদের কাহিনী (Prophets)" },
  { value: "tafsir", label: "তাফসীর (Tafsir)" },
  { value: "history", label: "ইতিহাস (History)" },
  { value: "moral", label: "শিক্ষামূলক (Moral)" },
  { value: "general", label: "সাধারণ (General)" },
];

const StoriesManagement = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    title_english: "",
    title_bengali: "",
    content_english: "",
    content_bengali: "",
    category: "general",
    cover_image_url: "",
    author: "",
    is_published: true,
    display_order: 0,
  });

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("stories")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching stories:", error);
      toast.error("Failed to fetch stories");
    } else {
      setStories(data || []);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      title_english: "",
      title_bengali: "",
      content_english: "",
      content_bengali: "",
      category: "general",
      cover_image_url: "",
      author: "",
      is_published: true,
      display_order: 0,
    });
    setEditingId(null);
    setIsFormOpen(false);
  };

  const openEditForm = (story: Story) => {
    setFormData({
      title_english: story.title_english,
      title_bengali: story.title_bengali,
      content_english: story.content_english,
      content_bengali: story.content_bengali,
      category: story.category,
      cover_image_url: story.cover_image_url || "",
      author: story.author || "",
      is_published: story.is_published,
      display_order: story.display_order,
    });
    setEditingId(story.id);
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title_bengali.trim()) {
      toast.error("বাংলা শিরোনাম আবশ্যক");
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        title_english: formData.title_english.trim(),
        title_bengali: formData.title_bengali.trim(),
        content_english: formData.content_english.trim(),
        content_bengali: formData.content_bengali.trim(),
        category: formData.category,
        cover_image_url: formData.cover_image_url.trim() || null,
        author: formData.author.trim() || null,
        is_published: formData.is_published,
        display_order: formData.display_order,
      };

      if (editingId) {
        const { error } = await supabase.from("stories").update(payload).eq("id", editingId);
        if (error) throw error;
        toast.success("গল্প আপডেট হয়েছে");
      } else {
        const { error } = await supabase.from("stories").insert(payload);
        if (error) throw error;
        toast.success("গল্প যোগ হয়েছে");
      }

      resetForm();
      fetchStories();
    } catch (err: any) {
      console.error("Error saving story:", err);
      toast.error(err.message || "সংরক্ষণ ব্যর্থ হয়েছে");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteStory = async (id: string) => {
    const { error } = await supabase.from("stories").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete story");
    } else {
      toast.success("Story deleted");
      setStories((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const uniqueAuthors = useMemo(() => {
    const authors = stories
      .map((s) => s.author)
      .filter((a): a is string => !!a && a.trim() !== "");
    return [...new Set(authors)].sort();
  }, [stories]);

  const filtered = stories.filter(
    (s) =>
      s.title_bengali.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.title_english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.author?.toLowerCase().includes(searchQuery.toLowerCase()) || false)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ScrollText className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold font-bengali">গল্প ব্যবস্থাপনা</h1>
        </div>
        {!isFormOpen && (
          <Button onClick={() => { resetForm(); setIsFormOpen(true); }} className="font-bengali">
            <Plus className="h-4 w-4 mr-2" /> নতুন গল্প যোগ করুন
          </Button>
        )}
      </div>

      {/* Form */}
      {isFormOpen && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold font-bengali">
              {editingId ? "গল্প সম্পাদনা করুন" : "নতুন গল্প যোগ করুন"}
            </h2>
            <Button variant="ghost" size="icon" onClick={resetForm}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-bengali">বাংলা শিরোনাম *</Label>
                <Input
                  value={formData.title_bengali}
                  onChange={(e) => setFormData((p) => ({ ...p, title_bengali: e.target.value }))}
                  placeholder="গল্পের বাংলা শিরোনাম..."
                  className="font-bengali"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>English Title</Label>
                <Input
                  value={formData.title_english}
                  onChange={(e) => setFormData((p) => ({ ...p, title_english: e.target.value }))}
                  placeholder="Story English title..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-bengali">বাংলা বিষয়বস্তু *</Label>
              <Textarea
                value={formData.content_bengali}
                onChange={(e) => setFormData((p) => ({ ...p, content_bengali: e.target.value }))}
                placeholder="গল্পের বাংলা বিষয়বস্তু লিখুন..."
                className="font-bengali min-h-[200px]"
                rows={10}
              />
            </div>

            <div className="space-y-2">
              <Label>English Content</Label>
              <Textarea
                value={formData.content_english}
                onChange={(e) => setFormData((p) => ({ ...p, content_english: e.target.value }))}
                placeholder="Story English content..."
                className="min-h-[200px]"
                rows={10}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-bengali">বিভাগ</Label>
                <Select
                  value={formData.category}
                  onValueChange={(v) => setFormData((p) => ({ ...p, category: v }))}
                >
                  <SelectTrigger className="font-bengali">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c.value} value={c.value} className="font-bengali">
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="font-bengali">লেখক</Label>
                <div className="flex gap-2">
                  <Input
                    value={formData.author}
                    onChange={(e) => setFormData((p) => ({ ...p, author: e.target.value }))}
                    placeholder="লেখকের নাম..."
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
                        {uniqueAuthors.map((a) => (
                          <DropdownMenuItem key={a} onClick={() => setFormData((p) => ({ ...p, author: a }))} className="font-bengali cursor-pointer">
                            {a}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Cover Image</Label>
              {formData.cover_image_url && (
                <div className="relative w-full max-w-xs">
                  <img
                    src={formData.cover_image_url}
                    alt="Cover preview"
                    className="w-full h-32 object-cover rounded-lg border border-border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6"
                    onClick={() => setFormData((p) => ({ ...p, cover_image_url: "" }))}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
              <div className="flex gap-2">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setIsUploading(true);
                      try {
                        const ext = file.name.split(".").pop();
                        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
                        const { error: uploadError } = await supabase.storage
                          .from("story-covers")
                          .upload(fileName, file, { contentType: file.type });
                        if (uploadError) throw uploadError;
                        const { data: urlData } = supabase.storage
                          .from("story-covers")
                          .getPublicUrl(fileName);
                        setFormData((p) => ({ ...p, cover_image_url: urlData.publicUrl }));
                        toast.success("Image uploaded");
                      } catch (err: any) {
                        console.error("Upload error:", err);
                        toast.error(err.message || "Upload failed");
                      } finally {
                        setIsUploading(false);
                        e.target.value = "";
                      }
                    }}
                  />
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-md border border-input bg-background text-sm font-medium hover:bg-accent transition-colors ${isUploading ? "opacity-50 pointer-events-none" : ""}`}>
                    {isUploading ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> Uploading...</>
                    ) : (
                      <><Upload className="h-4 w-4" /> Upload Image</>
                    )}
                  </div>
                </label>
                <span className="text-muted-foreground text-sm self-center">or</span>
                <Input
                  value={formData.cover_image_url}
                  onChange={(e) => setFormData((p) => ({ ...p, cover_image_url: e.target.value }))}
                  placeholder="Paste image URL..."
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Display Order</Label>
              <Input
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData((p) => ({ ...p, display_order: parseInt(e.target.value) || 0 }))}
              />
            </div>

            <div className="flex items-center gap-3">
              <Switch
                checked={formData.is_published}
                onCheckedChange={(v) => setFormData((p) => ({ ...p, is_published: v }))}
              />
              <Label className="font-bengali">প্রকাশিত</Label>
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> সংরক্ষণ হচ্ছে...</>
                ) : editingId ? "আপডেট করুন" : "সংরক্ষণ করুন"}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                বাতিল
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* List */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold font-bengali">গল্প তালিকা ({stories.length})</h2>
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
              {filtered.map((story) => (
                <div
                  key={story.id}
                  className="flex items-start justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-sm truncate font-bengali">{story.title_bengali}</h3>
                      {!story.is_published && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">Draft</span>
                      )}
                    </div>
                    {story.title_english && (
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">{story.title_english}</p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bengali">
                        {CATEGORIES.find((c) => c.value === story.category)?.label || story.category}
                      </span>
                      {story.author && (
                        <span className="text-xs text-muted-foreground font-bengali">{story.author}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={() => openEditForm(story)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => deleteStory(story.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <p className="text-center text-muted-foreground py-8 font-bengali">
                  কোনো গল্প পাওয়া যায়নি। উপরে "নতুন গল্প যোগ করুন" বাটনে ক্লিক করুন।
                </p>
              )}
            </div>
          </ScrollArea>
        )}
      </Card>
    </div>
  );
};

export default StoriesManagement;
