import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Eye, Loader2, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface CourseForm {
  title_english: string;
  title_bengali: string;
  description_english: string;
  description_bengali: string;
  thumbnail_url: string;
  is_published: boolean;
  display_order: number;
}

const emptyForm: CourseForm = {
  title_english: "",
  title_bengali: "",
  description_english: "",
  description_bengali: "",
  thumbnail_url: "",
  is_published: false,
  display_order: 0,
};

const CourseManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CourseForm>(emptyForm);

  const { data: courses, isLoading } = useQuery({
    queryKey: ["admin-lms-courses"],
    queryFn: async () => {
      const { data, error } = await supabase.from("lms_courses").select("*").order("display_order");
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (data: CourseForm & { id?: string }) => {
      if (data.id) {
        const { error } = await supabase.from("lms_courses").update(data).eq("id", data.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("lms_courses").insert(data);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-lms-courses"] });
      setShowDialog(false);
      setEditingId(null);
      setForm(emptyForm);
      toast({ title: "Saved successfully" });
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("lms_courses").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-lms-courses"] });
      toast({ title: "Deleted" });
    },
  });

  const openEdit = (course: any) => {
    setEditingId(course.id);
    setForm({
      title_english: course.title_english,
      title_bengali: course.title_bengali,
      description_english: course.description_english || "",
      description_bengali: course.description_bengali || "",
      thumbnail_url: course.thumbnail_url || "",
      is_published: course.is_published,
      display_order: course.display_order,
    });
    setShowDialog(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <GraduationCap className="h-5 w-5" /> Course Management
        </h2>
        <Button onClick={() => { setEditingId(null); setForm(emptyForm); setShowDialog(true); }}>
          <Plus className="h-4 w-4 mr-2" /> Add Course
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin" /></div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Lessons</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses?.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.display_order}</TableCell>
                <TableCell>{course.title_english}</TableCell>
                <TableCell>{course.is_published ? "✅" : "❌"}</TableCell>
                <TableCell>{course.total_lessons}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => navigate(`/abdullah/courses/${course.id}/lessons`)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => openEdit(course)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => deleteMutation.mutate(course.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Course" : "New Course"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div><Label>Title (English)</Label><Input value={form.title_english} onChange={(e) => setForm({ ...form, title_english: e.target.value })} /></div>
            <div><Label>Title (Bengali)</Label><Input value={form.title_bengali} onChange={(e) => setForm({ ...form, title_bengali: e.target.value })} /></div>
            <div><Label>Description (English)</Label><Textarea value={form.description_english} onChange={(e) => setForm({ ...form, description_english: e.target.value })} /></div>
            <div><Label>Description (Bengali)</Label><Textarea value={form.description_bengali} onChange={(e) => setForm({ ...form, description_bengali: e.target.value })} /></div>
            <div><Label>Thumbnail URL</Label><Input value={form.thumbnail_url} onChange={(e) => setForm({ ...form, thumbnail_url: e.target.value })} /></div>
            <div><Label>Display Order</Label><Input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })} /></div>
            <div className="flex items-center gap-2">
              <Switch checked={form.is_published} onCheckedChange={(v) => setForm({ ...form, is_published: v })} />
              <Label>Published</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>
            <Button onClick={() => saveMutation.mutate({ ...form, ...(editingId ? { id: editingId } : {}) })} disabled={saveMutation.isPending}>
              {saveMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseManagement;
