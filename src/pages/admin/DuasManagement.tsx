import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit, Trash2, Loader2 } from "lucide-react";

interface DuaCategory {
  id: string;
  category_id: string;
  name_english: string;
  name_bengali: string;
}

interface Dua {
  id: string;
  category_id: string;
  dua_id: string;
  title_english: string;
  title_bengali: string;
  title_hindi: string | null;
  arabic: string;
  transliteration: string | null;
  transliteration_bengali: string | null;
  transliteration_hindi: string | null;
  english: string;
  bengali: string;
  hindi: string | null;
  reference: string | null;
  created_at: string;
  updated_at: string;
}

const DuasManagement = () => {
  const [duas, setDuas] = useState<Dua[]>([]);
  const [categories, setCategories] = useState<DuaCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDua, setEditingDua] = useState<Dua | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [formData, setFormData] = useState({
    category_id: "",
    dua_id: "",
    title_english: "",
    title_bengali: "",
    title_hindi: "",
    arabic: "",
    transliteration: "",
    transliteration_bengali: "",
    transliteration_hindi: "",
    english: "",
    bengali: "",
    hindi: "",
    reference: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
    fetchDuas();
  }, []);

  useEffect(() => {
    fetchDuas();
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("dua_categories")
        .select("id, category_id, name_english, name_bengali")
        .order("display_order");

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchDuas = async () => {
    try {
      setIsLoading(true);
      let query = supabase
        .from("duas")
        .select("*")
        .order("category_id")
        .order("dua_id");

      if (selectedCategory !== "all") {
        query = query.eq("category_id", selectedCategory);
      }

      query = query.limit(100);

      const { data, error } = await query;

      if (error) throw error;
      setDuas(data || []);
    } catch (error) {
      console.error("Error fetching duas:", error);
      toast({
        title: "Error",
        description: "Failed to fetch duas",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDialog = (dua?: Dua) => {
    if (dua) {
      setEditingDua(dua);
      setFormData({
        category_id: dua.category_id,
        dua_id: dua.dua_id,
        title_english: dua.title_english,
        title_bengali: dua.title_bengali,
        title_hindi: dua.title_hindi || "",
        arabic: dua.arabic,
        transliteration: dua.transliteration || "",
        transliteration_bengali: dua.transliteration_bengali || "",
        transliteration_hindi: dua.transliteration_hindi || "",
        english: dua.english,
        bengali: dua.bengali,
        hindi: dua.hindi || "",
        reference: dua.reference || "",
      });
    } else {
      setEditingDua(null);
      setFormData({
        category_id: selectedCategory !== "all" ? selectedCategory : "",
        dua_id: "",
        title_english: "",
        title_bengali: "",
        title_hindi: "",
        arabic: "",
        transliteration: "",
        transliteration_bengali: "",
        transliteration_hindi: "",
        english: "",
        bengali: "",
        hindi: "",
        reference: "",
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.category_id || !formData.dua_id || !formData.arabic || !formData.title_english) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const duaData = {
        category_id: formData.category_id,
        dua_id: formData.dua_id,
        title_english: formData.title_english,
        title_bengali: formData.title_bengali,
        title_hindi: formData.title_hindi || null,
        arabic: formData.arabic,
        transliteration: formData.transliteration || null,
        transliteration_bengali: formData.transliteration_bengali || null,
        transliteration_hindi: formData.transliteration_hindi || null,
        english: formData.english,
        bengali: formData.bengali,
        hindi: formData.hindi || null,
        reference: formData.reference || null,
      };

      if (editingDua) {
        const { error } = await supabase
          .from("duas")
          .update(duaData)
          .eq("id", editingDua.id);

        if (error) throw error;
        toast({ title: "Success", description: "Dua updated successfully" });
      } else {
        const { error } = await supabase
          .from("duas")
          .insert(duaData);

        if (error) throw error;
        toast({ title: "Success", description: "Dua created successfully" });
      }

      setIsDialogOpen(false);
      fetchDuas();
    } catch (error) {
      console.error("Error saving dua:", error);
      toast({
        title: "Error",
        description: "Failed to save dua",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (dua: Dua) => {
    if (!confirm(`Are you sure you want to delete "${dua.title_english}"?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from("duas")
        .delete()
        .eq("id", dua.id);

      if (error) throw error;
      
      toast({ title: "Success", description: "Dua deleted successfully" });
      fetchDuas();
    } catch (error) {
      console.error("Error deleting dua:", error);
      toast({
        title: "Error",
        description: "Failed to delete dua",
        variant: "destructive",
      });
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.category_id === categoryId);
    return category?.name_english || categoryId;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold">Duas Management</h2>
          <p className="text-muted-foreground">Add, edit, or remove duas</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.category_id}>
                  {category.name_english}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Add Dua
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingDua ? "Edit Dua" : "Add New Dua"}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category_id">Category *</Label>
                    <Select
                      value={formData.category_id}
                      onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.category_id}>
                            {category.name_english}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dua_id">Dua ID *</Label>
                    <Input
                      id="dua_id"
                      value={formData.dua_id}
                      onChange={(e) => setFormData({ ...formData, dua_id: e.target.value })}
                      placeholder="e.g., dua-1"
                      disabled={!!editingDua}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title_english">Title (English) *</Label>
                    <Input
                      id="title_english"
                      value={formData.title_english}
                      onChange={(e) => setFormData({ ...formData, title_english: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title_bengali">Title (Bengali)</Label>
                    <Input
                      id="title_bengali"
                      value={formData.title_bengali}
                      onChange={(e) => setFormData({ ...formData, title_bengali: e.target.value })}
                      className="font-bengali"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title_hindi">Title (Hindi)</Label>
                    <Input
                      id="title_hindi"
                      value={formData.title_hindi}
                      onChange={(e) => setFormData({ ...formData, title_hindi: e.target.value })}
                      className="font-hindi"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="arabic">Arabic Text *</Label>
                  <Textarea
                    id="arabic"
                    value={formData.arabic}
                    onChange={(e) => setFormData({ ...formData, arabic: e.target.value })}
                    className="font-arabic text-right text-xl min-h-[100px]"
                    dir="rtl"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="transliteration">Transliteration</Label>
                    <Textarea
                      id="transliteration"
                      value={formData.transliteration}
                      onChange={(e) => setFormData({ ...formData, transliteration: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transliteration_bengali">Transliteration (Bengali)</Label>
                    <Textarea
                      id="transliteration_bengali"
                      value={formData.transliteration_bengali}
                      onChange={(e) => setFormData({ ...formData, transliteration_bengali: e.target.value })}
                      className="font-bengali"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transliteration_hindi">Transliteration (Hindi)</Label>
                    <Textarea
                      id="transliteration_hindi"
                      value={formData.transliteration_hindi}
                      onChange={(e) => setFormData({ ...formData, transliteration_hindi: e.target.value })}
                      className="font-hindi"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="english">English Translation</Label>
                  <Textarea
                    id="english"
                    value={formData.english}
                    onChange={(e) => setFormData({ ...formData, english: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bengali">Bengali Translation</Label>
                  <Textarea
                    id="bengali"
                    value={formData.bengali}
                    onChange={(e) => setFormData({ ...formData, bengali: e.target.value })}
                    className="font-bengali"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hindi">Hindi Translation</Label>
                  <Textarea
                    id="hindi"
                    value={formData.hindi}
                    onChange={(e) => setFormData({ ...formData, hindi: e.target.value })}
                    className="font-hindi"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reference">Reference</Label>
                  <Input
                    id="reference"
                    value={formData.reference}
                    onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                    placeholder="e.g., Sahih Bukhari 1234"
                  />
                </div>

                <Button onClick={handleSubmit} disabled={isSubmitting} className="mt-4">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    editingDua ? "Update Dua" : "Create Dua"
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Arabic</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {duas.map((dua) => (
                  <TableRow key={dua.id}>
                    <TableCell className="text-sm">{getCategoryName(dua.category_id)}</TableCell>
                    <TableCell className="font-mono text-sm">{dua.dua_id}</TableCell>
                    <TableCell>{dua.title_english}</TableCell>
                    <TableCell className="font-arabic text-lg max-w-xs truncate" dir="rtl">
                      {dua.arabic.substring(0, 40)}...
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {dua.reference || "-"}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(dua)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(dua)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {duas.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No duas found. {selectedCategory !== "all" && "Try selecting a different category or "}Add your first dua to get started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      
      {duas.length > 0 && (
        <p className="text-sm text-muted-foreground">
          Showing first 100 duas. Use the category filter to narrow down results.
        </p>
      )}
    </div>
  );
};

export default DuasManagement;
