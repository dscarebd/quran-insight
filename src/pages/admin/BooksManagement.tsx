import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Upload, Loader2, BookOpen } from "lucide-react";
import { PDFBook } from "@/hooks/useBookLibrary";

interface BookFormData {
  title_english: string;
  title_bengali: string;
  author_english: string;
  author_bengali: string;
  description_english: string;
  description_bengali: string;
  category: string;
  display_order: number;
  is_featured: boolean;
  total_pages: number | null;
}

const BooksManagement = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<PDFBook | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ pdf: number; cover: number }>({ pdf: 0, cover: 0 });
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<BookFormData>({
    title_english: "",
    title_bengali: "",
    author_english: "",
    author_bengali: "",
    description_english: "",
    description_bengali: "",
    category: "general",
    display_order: 0,
    is_featured: false,
    total_pages: null
  });

  const { data: books, isLoading } = useQuery({
    queryKey: ["admin-pdf-books"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pdf_books")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as PDFBook[];
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: { book: Partial<PDFBook>; pdfFile: File; coverFile?: File }) => {
      setIsUploading(true);
      
      // Upload PDF
      const pdfPath = `books/${Date.now()}-${data.pdfFile.name}`;
      const { error: pdfError } = await supabase.storage
        .from("pdf-books")
        .upload(pdfPath, data.pdfFile);
      
      if (pdfError) throw pdfError;
      
      const { data: pdfUrlData } = supabase.storage
        .from("pdf-books")
        .getPublicUrl(pdfPath);
      
      let coverUrl = null;
      
      // Upload cover if provided
      if (data.coverFile) {
        const coverPath = `covers/${Date.now()}-${data.coverFile.name}`;
        const { error: coverError } = await supabase.storage
          .from("pdf-books")
          .upload(coverPath, data.coverFile);
        
        if (coverError) throw coverError;
        
        const { data: coverUrlData } = supabase.storage
          .from("pdf-books")
          .getPublicUrl(coverPath);
        
        coverUrl = coverUrlData.publicUrl;
      }
      
      // Create book record
      const { error: insertError } = await supabase
        .from("pdf_books")
        .insert([{
          title_english: data.book.title_english || "",
          title_bengali: data.book.title_bengali || "",
          author_english: data.book.author_english,
          author_bengali: data.book.author_bengali,
          description_english: data.book.description_english,
          description_bengali: data.book.description_bengali,
          category: data.book.category,
          display_order: data.book.display_order || 0,
          is_featured: data.book.is_featured || false,
          total_pages: data.book.total_pages,
          pdf_url: pdfUrlData.publicUrl,
          cover_image_url: coverUrl,
          file_size_mb: Math.round(data.pdfFile.size / 1024 / 1024 * 100) / 100
        }]);
      
      if (insertError) throw insertError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-pdf-books"] });
      toast.success("Book created successfully");
      resetForm();
    },
    onError: (error) => {
      toast.error(`Failed to create book: ${error.message}`);
    },
    onSettled: () => {
      setIsUploading(false);
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...data }: Partial<PDFBook> & { id: string }) => {
      const { error } = await supabase
        .from("pdf_books")
        .update(data)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-pdf-books"] });
      toast.success("Book updated successfully");
      resetForm();
    },
    onError: (error) => {
      toast.error(`Failed to update book: ${error.message}`);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("pdf_books")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-pdf-books"] });
      toast.success("Book deleted successfully");
    },
    onError: (error) => {
      toast.error(`Failed to delete book: ${error.message}`);
    }
  });

  const resetForm = () => {
    setFormData({
      title_english: "",
      title_bengali: "",
      author_english: "",
      author_bengali: "",
      description_english: "",
      description_bengali: "",
      category: "general",
      display_order: 0,
      is_featured: false,
      total_pages: null
    });
    setPdfFile(null);
    setCoverFile(null);
    setEditingBook(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (book: PDFBook) => {
    setEditingBook(book);
    setFormData({
      title_english: book.title_english,
      title_bengali: book.title_bengali,
      author_english: book.author_english || "",
      author_bengali: book.author_bengali || "",
      description_english: book.description_english || "",
      description_bengali: book.description_bengali || "",
      category: book.category || "general",
      display_order: book.display_order,
      is_featured: book.is_featured,
      total_pages: book.total_pages
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (editingBook) {
      updateMutation.mutate({
        id: editingBook.id,
        ...formData
      });
    } else {
      if (!pdfFile) {
        toast.error("Please select a PDF file");
        return;
      }
      createMutation.mutate({
        book: formData,
        pdfFile,
        coverFile: coverFile || undefined
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Books Management</h1>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingBook(null); resetForm(); setIsDialogOpen(true); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Book
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingBook ? "Edit Book" : "Add New Book"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title (English)</Label>
                  <Input
                    value={formData.title_english}
                    onChange={(e) => setFormData({ ...formData, title_english: e.target.value })}
                    placeholder="Enter English title"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Title (Bengali)</Label>
                  <Input
                    value={formData.title_bengali}
                    onChange={(e) => setFormData({ ...formData, title_bengali: e.target.value })}
                    placeholder="বাংলা শিরোনাম লিখুন"
                    className="font-bengali"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Author (English)</Label>
                  <Input
                    value={formData.author_english}
                    onChange={(e) => setFormData({ ...formData, author_english: e.target.value })}
                    placeholder="Author name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Author (Bengali)</Label>
                  <Input
                    value={formData.author_bengali}
                    onChange={(e) => setFormData({ ...formData, author_bengali: e.target.value })}
                    placeholder="লেখকের নাম"
                    className="font-bengali"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Description (English)</Label>
                  <Textarea
                    value={formData.description_english}
                    onChange={(e) => setFormData({ ...formData, description_english: e.target.value })}
                    placeholder="Book description"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description (Bengali)</Label>
                  <Textarea
                    value={formData.description_bengali}
                    onChange={(e) => setFormData({ ...formData, description_bengali: e.target.value })}
                    placeholder="বইয়ের বিবরণ"
                    className="font-bengali"
                    rows={3}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="general"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Display Order</Label>
                  <Input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Total Pages</Label>
                  <Input
                    type="number"
                    value={formData.total_pages || ""}
                    onChange={(e) => setFormData({ ...formData, total_pages: e.target.value ? parseInt(e.target.value) : null })}
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                />
                <Label>Featured Book</Label>
              </div>

              {!editingBook && (
                <>
                  <div className="space-y-2">
                    <Label>PDF File *</Label>
                    <Input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Cover Image (Optional)</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                    />
                  </div>
                </>
              )}

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  disabled={isUploading || createMutation.isPending || updateMutation.isPending}
                >
                  {(isUploading || createMutation.isPending || updateMutation.isPending) && (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  )}
                  {editingBook ? "Update" : "Create"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Books ({books?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Pages</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {books?.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell>{book.display_order}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{book.title_english}</div>
                        <div className="text-sm text-muted-foreground font-bengali">{book.title_bengali}</div>
                      </div>
                    </TableCell>
                    <TableCell>{book.author_english || "-"}</TableCell>
                    <TableCell>{book.category}</TableCell>
                    <TableCell>{book.file_size_mb ? `${book.file_size_mb} MB` : "-"}</TableCell>
                    <TableCell>{book.total_pages || "-"}</TableCell>
                    <TableCell>{book.is_featured ? "Yes" : "No"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(book)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Book?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete "{book.title_english}". This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteMutation.mutate(book.id)}
                                className="bg-destructive text-destructive-foreground"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BooksManagement;
