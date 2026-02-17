import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Loader2, ArrowLeft, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LessonForm {
  title_english: string;
  title_bengali: string;
  description_english: string;
  description_bengali: string;
  video_url: string;
  duration_seconds: number;
  lesson_order: number;
  is_published: boolean;
}

const emptyForm: LessonForm = {
  title_english: "",
  title_bengali: "",
  description_english: "",
  description_bengali: "",
  video_url: "",
  duration_seconds: 0,
  lesson_order: 1,
  is_published: true,
};

const LessonManagement = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<LessonForm>(emptyForm);
  const [uploading, setUploading] = useState(false);

  const { data: course } = useQuery({
    queryKey: ["admin-course", courseId],
    queryFn: async () => {
      const { data, error } = await supabase.from("lms_courses").select("*").eq("id", courseId!).single();
      if (error) throw error;
      return data;
    },
    enabled: !!courseId,
  });

  const { data: lessons, isLoading } = useQuery({
    queryKey: ["admin-lms-lessons", courseId],
    queryFn: async () => {
      const { data, error } = await supabase.from("lms_lessons").select("*").eq("course_id", courseId!).order("lesson_order");
      if (error) throw error;
      return data;
    },
    enabled: !!courseId,
  });

  const uploadVideo = async (file: File) => {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${courseId}/${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from("lms-videos").upload(path, file);
      if (error) throw error;
      const { data: urlData } = supabase.storage.from("lms-videos").getPublicUrl(path);
      setForm((f) => ({ ...f, video_url: urlData.publicUrl }));
      toast({ title: "Video uploaded" });
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const saveMutation = useMutation({
    mutationFn: async (data: LessonForm & { id?: string }) => {
      const payload = { ...data, course_id: courseId };
      if (data.id) {
        const { id, ...rest } = payload as any;
        const { error } = await supabase.from("lms_lessons").update(rest).eq("id", data.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("lms_lessons").insert(payload);
        if (error) throw error;
      }
      // Update total_lessons count
      const { count } = await supabase.from("lms_lessons").select("*", { count: "exact", head: true }).eq("course_id", courseId!);
      await supabase.from("lms_courses").update({ total_lessons: count || 0 }).eq("id", courseId!);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-lms-lessons", courseId] });
      queryClient.invalidateQueries({ queryKey: ["admin-lms-courses"] });
      setShowDialog(false);
      setEditingId(null);
      setForm(emptyForm);
      toast({ title: "Saved" });
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("lms_lessons").delete().eq("id", id);
      if (error) throw error;
      const { count } = await supabase.from("lms_lessons").select("*", { count: "exact", head: true }).eq("course_id", courseId!);
      await supabase.from("lms_courses").update({ total_lessons: count || 0 }).eq("id", courseId!);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-lms-lessons", courseId] });
      queryClient.invalidateQueries({ queryKey: ["admin-lms-courses"] });
      toast({ title: "Deleted" });
    },
  });

  const openEdit = (lesson: any) => {
    setEditingId(lesson.id);
    setForm({
      title_english: lesson.title_english,
      title_bengali: lesson.title_bengali,
      description_english: lesson.description_english || "",
      description_bengali: lesson.description_bengali || "",
      video_url: lesson.video_url,
      duration_seconds: lesson.duration_seconds || 0,
      lesson_order: lesson.lesson_order,
      is_published: lesson.is_published,
    });
    setShowDialog(true);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate("/abdullah/courses")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h2 className="text-xl font-semibold">Lessons: {course?.title_english}</h2>
        </div>
        <Button onClick={() => { setEditingId(null); setForm({ ...emptyForm, lesson_order: (lessons?.length || 0) + 1 }); setShowDialog(true); }}>
          <Plus className="h-4 w-4 mr-2" /> Add Lesson
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
              <TableHead>Duration</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lessons?.map((lesson) => (
              <TableRow key={lesson.id}>
                <TableCell>{lesson.lesson_order}</TableCell>
                <TableCell>{lesson.title_english}</TableCell>
                <TableCell>{lesson.duration_seconds ? `${Math.floor(lesson.duration_seconds / 60)}m` : "-"}</TableCell>
                <TableCell>{lesson.is_published ? "✅" : "❌"}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => openEdit(lesson)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => deleteMutation.mutate(lesson.id)}>
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
            <DialogTitle>{editingId ? "Edit Lesson" : "New Lesson"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div><Label>Title (English)</Label><Input value={form.title_english} onChange={(e) => setForm({ ...form, title_english: e.target.value })} /></div>
            <div><Label>Title (Bengali)</Label><Input value={form.title_bengali} onChange={(e) => setForm({ ...form, title_bengali: e.target.value })} /></div>
            <div><Label>Description (English)</Label><Textarea value={form.description_english} onChange={(e) => setForm({ ...form, description_english: e.target.value })} /></div>
            <div><Label>Description (Bengali)</Label><Textarea value={form.description_bengali} onChange={(e) => setForm({ ...form, description_bengali: e.target.value })} /></div>
            <div>
              <Label>Video</Label>
              <div className="flex gap-2 mt-1">
                <Input value={form.video_url} onChange={(e) => setForm({ ...form, video_url: e.target.value })} placeholder="Video URL" className="flex-1" />
                <input ref={fileRef} type="file" accept="video/*" className="hidden" onChange={(e) => e.target.files?.[0] && uploadVideo(e.target.files[0])} />
                <Button variant="outline" onClick={() => fileRef.current?.click()} disabled={uploading}>
                  {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div><Label>Duration (seconds)</Label><Input type="number" value={form.duration_seconds} onChange={(e) => setForm({ ...form, duration_seconds: parseInt(e.target.value) || 0 })} /></div>
            <div><Label>Lesson Order</Label><Input type="number" value={form.lesson_order} onChange={(e) => setForm({ ...form, lesson_order: parseInt(e.target.value) || 1 })} /></div>
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

export default LessonManagement;
