import { useState, useRef } from "react";
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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Loader2, BookOpen, Upload, Link, FileText, ImageIcon, Info } from "lucide-react";
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
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState("");
  const [uploadMode, setUploadMode] = useState<"file" | "url">("file");
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<BookFormData>({
    title_english: "",
    title_bengali: "",
    author_english: "",
    author_bengali: "",
    description_english: "",
    description_bengali: "",
    category: "quran",
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
    mutationFn: async (data: { book: Partial<PDFBook>; pdfFile?: File; coverFile?: File; pdfUrl?: string }) => {
      setIsUploading(true);
      setUploadProgress(5);

      let finalPdfUrl = data.pdfUrl || "";

      if (data.pdfFile) {
        const pdfPath = `books/${Date.now()}-${data.pdfFile.name.replace(/\s+/g, "-")}`;
        setUploadStatus(`Uploading PDF (${(data.pdfFile.size / 1024 / 1024).toFixed(0)}MB)...`);

        // Simulate progress while uploading
        let fakeProgress = 10;
        const progressInterval = setInterval(() => {
          fakeProgress = Math.min(fakeProgress + 1, 75);
          setUploadProgress(fakeProgress);
          setUploadStatus(`Uploading PDF... ${fakeProgress}%`);
        }, 1000);

        try {
          const { error } = await supabase.storage.from("pdf-books").upload(pdfPath, data.pdfFile, {
            upsert: false,
            contentType: "application/pdf",
          });
          clearInterval(progressInterval);
          if (error) throw error;
        } catch (err) {
          clearInterval(progressInterval);
          throw err;
        }

        const { data: urlData } = supabase.storage.from("pdf-books").getPublicUrl(pdfPath);
        finalPdfUrl = urlData.publicUrl;
        setUploadProgress(80);
      }

      let coverUrl = null;
      if (data.coverFile) {
        setUploadStatus("Uploading cover image...");
        const coverPath = `covers/${Date.now()}-${data.coverFile.name.replace(/\s+/g, "-")}`;
        const { error: coverError } = await supabase.storage
          .from("pdf-books")
          .upload(coverPath, data.coverFile, { contentType: data.coverFile.type });
        if (coverError) throw coverError;
        const { data: coverUrlData } = supabase.storage.from("pdf-books").getPublicUrl(coverPath);
        coverUrl = coverUrlData.publicUrl;
        setUploadProgress(90);
      }

      setUploadStatus("Saving book info...");
      const { error: insertError } = await supabase.from("pdf_books").insert([{
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
        pdf_url: finalPdfUrl,
        cover_image_url: coverUrl,
        file_size_mb: data.pdfFile ? Math.round(data.pdfFile.size / 1024 / 1024 * 100) / 100 : null
      }]);

      if (insertError) throw insertError;
      setUploadProgress(100);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-pdf-books"] });
      toast.success("Book added! It will appear in the Read page books section.");
      resetForm();
    },
    onError: (error) => {
      toast.error(`Failed to add book: ${error.message}`);
    },
    onSettled: () => {
      setIsUploading(false);
      setUploadProgress(0);
      setUploadStatus("");
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...data }: Partial<PDFBook> & { id: string }) => {
      const { error } = await supabase.from("pdf_books").update(data).eq("id", id);
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
      const { error } = await supabase.from("pdf_books").delete().eq("id", id);
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
      category: "quran",
      display_order: 0,
      is_featured: false,
      total_pages: null
    });
    setPdfFile(null);
    setCoverFile(null);
    setPdfUrl("");
    setUploadMode("file");
    setEditingBook(null);
    setIsDialogOpen(false);
    if (pdfInputRef.current) pdfInputRef.current.value = "";
    if (coverInputRef.current) coverInputRef.current.value = "";
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
      category: book.category || "quran",
      display_order: book.display_order,
      is_featured: book.is_featured,
      total_pages: book.total_pages
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.title_english || !formData.title_bengali) {
      toast.error("Please enter both English and Bengali titles");
      return;
    }
    if (editingBook) {
      updateMutation.mutate({ id: editingBook.id, ...formData });
    } else {
      if (uploadMode === "url") {
        if (!pdfUrl.trim()) { toast.error("Please enter a PDF URL"); return; }
        createMutation.mutate({ book: formData, coverFile: coverFile || undefined, pdfUrl: pdfUrl.trim() });
      } else {
        if (!pdfFile) { toast.error("Please select a PDF file"); return; }
        createMutation.mutate({ book: formData, pdfFile, coverFile: coverFile || undefined });
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Books Management</h1>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { if (!open && !isUploading) resetForm(); setIsDialogOpen(open); }}>
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

            <div className="space-y-4 py-2">
              {/* Titles */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title (English) *</Label>
                  <Input
                    value={formData.title_english}
                    onChange={(e) => setFormData({ ...formData, title_english: e.target.value })}
                    placeholder="e.g. The Holy Quran"
                  />
                </div>
                <div className="space-y-2">
                  <Label>বাংলা শিরোনাম *</Label>
                  <Input
                    value={formData.title_bengali}
                    onChange={(e) => setFormData({ ...formData, title_bengali: e.target.value })}
                    placeholder="যেমন: আল কুরআনুল কারিম"
                    className="font-bengali"
                  />
                </div>
              </div>

              {/* Authors */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Author (English)</Label>
                  <Input
                    value={formData.author_english}
                    onChange={(e) => setFormData({ ...formData, author_english: e.target.value })}
                    placeholder="Author / Publisher name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>লেখক (বাংলা)</Label>
                  <Input
                    value={formData.author_bengali}
                    onChange={(e) => setFormData({ ...formData, author_bengali: e.target.value })}
                    placeholder="লেখক / প্রকাশকের নাম"
                    className="font-bengali"
                  />
                </div>
              </div>

              {/* Descriptions */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Description (English)</Label>
                  <Textarea
                    value={formData.description_english}
                    onChange={(e) => setFormData({ ...formData, description_english: e.target.value })}
                    placeholder="Brief description..."
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label>বিবরণ (বাংলা)</Label>
                  <Textarea
                    value={formData.description_bengali}
                    onChange={(e) => setFormData({ ...formData, description_bengali: e.target.value })}
                    placeholder="সংক্ষিপ্ত বিবরণ..."
                    className="font-bengali"
                    rows={2}
                  />
                </div>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="quran / general"
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

              {/* File Upload Section — only for new books */}
              {!editingBook && (
                <div className="space-y-4 border border-border rounded-xl p-4 bg-muted/30">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Upload className="h-4 w-4" />
                    <span>PDF File *</span>
                  </div>

                  <Tabs value={uploadMode} onValueChange={(v) => setUploadMode(v as "file" | "url")}>
                    <TabsList className="w-full">
                      <TabsTrigger value="file" className="flex-1 gap-2">
                        <FileText className="h-3.5 w-3.5" />
                        Upload File
                      </TabsTrigger>
                      <TabsTrigger value="url" className="flex-1 gap-2">
                        <Link className="h-3.5 w-3.5" />
                        Use External URL
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="file" className="space-y-3 mt-3">
                      <div
                        className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                        onClick={() => pdfInputRef.current?.click()}
                      >
                        {pdfFile ? (
                          <div className="space-y-1">
                            <FileText className="h-8 w-8 mx-auto text-primary" />
                            <p className="text-sm font-medium">{pdfFile.name}</p>
                            <p className="text-xs text-muted-foreground">{(pdfFile.size / 1024 / 1024).toFixed(1)} MB</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Upload className="h-8 w-8 mx-auto text-muted-foreground/40" />
                            <p className="text-sm text-muted-foreground">Click to select PDF file</p>
                            <p className="text-xs text-muted-foreground/60">Supports up to 500 MB</p>
                          </div>
                        )}
                      </div>
                      <input
                        ref={pdfInputRef}
                        type="file"
                        accept=".pdf,application/pdf"
                        className="hidden"
                        onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                      />
                      <div className="flex items-start gap-2 text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-2.5">
                        <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                        <span>For large files (100MB+), upload may take several minutes. Do not close this window during upload.</span>
                      </div>
                    </TabsContent>

                    <TabsContent value="url" className="space-y-3 mt-3">
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">External PDF URL</Label>
                        <Input
                          value={pdfUrl}
                          onChange={(e) => setPdfUrl(e.target.value)}
                          placeholder="https://example.com/quran.pdf"
                          type="url"
                        />
                        <p className="text-xs text-muted-foreground">
                          Use this for very large files. Paste a direct public link to the PDF. Works with Google Drive (direct download links), Dropbox, etc.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>

                  {/* Cover Image */}
                  <div className="pt-3 border-t border-border space-y-3">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <ImageIcon className="h-4 w-4" />
                      <span>Cover Image (Optional)</span>
                    </div>
                    <div
                      className="border-2 border-dashed border-border rounded-xl p-4 text-center cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => coverInputRef.current?.click()}
                    >
                      {coverFile ? (
                        <div className="space-y-1">
                          <img
                            src={URL.createObjectURL(coverFile)}
                            alt="Cover preview"
                            className="h-24 mx-auto object-cover rounded shadow"
                          />
                          <p className="text-xs text-muted-foreground mt-1">{coverFile.name}</p>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <ImageIcon className="h-6 w-6 mx-auto text-muted-foreground/40" />
                          <p className="text-xs text-muted-foreground">Click to select cover image</p>
                          <p className="text-xs text-muted-foreground/60">JPG, PNG, WebP</p>
                        </div>
                      )}
                    </div>
                    <input
                      ref={coverInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                    />
                  </div>
                </div>
              )}

              {/* Upload progress */}
              {isUploading && (
                <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{uploadStatus}</span>
                    <span className="font-medium">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={resetForm} disabled={isUploading}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isUploading || createMutation.isPending || updateMutation.isPending}
                >
                  {(isUploading || createMutation.isPending || updateMutation.isPending) ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {isUploading ? "Uploading..." : "Saving..."}
                    </>
                  ) : (
                    editingBook ? "Update Book" : "Add Book"
                  )}
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
                      <div className="flex items-center gap-2">
                        {book.cover_image_url ? (
                          <img src={book.cover_image_url} alt="" className="h-9 w-6 object-cover rounded shrink-0" />
                        ) : (
                          <div className="h-9 w-6 bg-muted rounded shrink-0 flex items-center justify-center">
                            <FileText className="h-3 w-3 text-muted-foreground" />
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-sm">{book.title_english}</div>
                          <div className="text-xs text-muted-foreground font-bengali">{book.title_bengali}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{book.author_english || "-"}</TableCell>
                    <TableCell>
                      <span className="capitalize text-xs bg-muted px-2 py-0.5 rounded">{book.category}</span>
                    </TableCell>
                    <TableCell className="text-sm">{book.file_size_mb ? `${book.file_size_mb} MB` : "-"}</TableCell>
                    <TableCell className="text-sm">{book.total_pages || "-"}</TableCell>
                    <TableCell className="text-sm">{book.is_featured ? "⭐" : "-"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(book)}>
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
                {books?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No books yet. Click "Add Book" to upload your first Quran or Islamic book.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BooksManagement;
