import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Plus, Edit, Trash2, Loader2 } from "lucide-react";

interface DuaCategory {
  id: string;
  category_id: string;
  name_english: string;
  name_bengali: string;
  name_hindi: string | null;
  icon: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

const DuaCategoriesManagement = () => {
  const [categories, setCategories] = useState<DuaCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<DuaCategory | null>(null);
  const [formData, setFormData] = useState({
    category_id: "",
    name_english: "",
    name_bengali: "",
    name_hindi: "",
    icon: "BookOpen",
    display_order: "0",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("dua_categories")
        .select("*")
        .order("display_order");

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast({
        title: "Error",
        description: "Failed to fetch dua categories",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDialog = (category?: DuaCategory) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        category_id: category.category_id,
        name_english: category.name_english,
        name_bengali: category.name_bengali,
        name_hindi: category.name_hindi || "",
        icon: category.icon,
        display_order: category.display_order.toString(),
      });
    } else {
      setEditingCategory(null);
      setFormData({
        category_id: "",
        name_english: "",
        name_bengali: "",
        name_hindi: "",
        icon: "BookOpen",
        display_order: "0",
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.category_id || !formData.name_english || !formData.name_bengali) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const categoryData = {
        category_id: formData.category_id,
        name_english: formData.name_english,
        name_bengali: formData.name_bengali,
        name_hindi: formData.name_hindi || null,
        icon: formData.icon,
        display_order: parseInt(formData.display_order) || 0,
      };

      if (editingCategory) {
        const { error } = await supabase
          .from("dua_categories")
          .update(categoryData)
          .eq("id", editingCategory.id);

        if (error) throw error;
        toast({ title: "Success", description: "Category updated successfully" });
      } else {
        const { error } = await supabase
          .from("dua_categories")
          .insert(categoryData);

        if (error) throw error;
        toast({ title: "Success", description: "Category created successfully" });
      }

      setIsDialogOpen(false);
      fetchCategories();
    } catch (error) {
      console.error("Error saving category:", error);
      toast({
        title: "Error",
        description: "Failed to save category",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (category: DuaCategory) => {
    if (!confirm(`Are you sure you want to delete "${category.name_english}"? This will also delete all duas in this category.`)) {
      return;
    }

    try {
      // First delete all duas in this category
      await supabase
        .from("duas")
        .delete()
        .eq("category_id", category.category_id);

      // Then delete the category
      const { error } = await supabase
        .from("dua_categories")
        .delete()
        .eq("id", category.id);

      if (error) throw error;
      
      toast({ title: "Success", description: "Category deleted successfully" });
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Dua Categories</h2>
          <p className="text-muted-foreground">Add, edit, or remove dua categories</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? "Edit Category" : "Add New Category"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="category_id">Category ID *</Label>
                <Input
                  id="category_id"
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  placeholder="e.g., daily-life"
                  disabled={!!editingCategory}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name_english">English Name *</Label>
                <Input
                  id="name_english"
                  value={formData.name_english}
                  onChange={(e) => setFormData({ ...formData, name_english: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name_bengali">Bengali Name *</Label>
                <Input
                  id="name_bengali"
                  value={formData.name_bengali}
                  onChange={(e) => setFormData({ ...formData, name_bengali: e.target.value })}
                  className="font-bengali"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name_hindi">Hindi Name</Label>
                <Input
                  id="name_hindi"
                  value={formData.name_hindi}
                  onChange={(e) => setFormData({ ...formData, name_hindi: e.target.value })}
                  className="font-hindi"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="icon">Icon Name</Label>
                  <Input
                    id="icon"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="BookOpen"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={handleSubmit} disabled={isSubmitting} className="mt-4">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  editingCategory ? "Update Category" : "Create Category"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Order</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>English</TableHead>
                <TableHead>Bengali</TableHead>
                <TableHead>Hindi</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.display_order}</TableCell>
                  <TableCell className="font-mono text-sm">{category.category_id}</TableCell>
                  <TableCell>{category.name_english}</TableCell>
                  <TableCell className="font-bengali">{category.name_bengali}</TableCell>
                  <TableCell className="font-hindi">{category.name_hindi || "-"}</TableCell>
                  <TableCell className="text-sm">{category.icon}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenDialog(category)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(category)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {categories.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No categories found. Add your first category to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DuaCategoriesManagement;
