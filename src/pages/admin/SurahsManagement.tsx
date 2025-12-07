import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import type { Tables } from "@/integrations/supabase/types";

type Surah = Tables<"surahs">;

const SurahsManagement = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSurah, setEditingSurah] = useState<Surah | null>(null);
  const [formData, setFormData] = useState({
    number: "",
    name_arabic: "",
    name_english: "",
    name_bengali: "",
    meaning_english: "",
    meaning_bengali: "",
    revelation_type: "meccan",
    total_verses: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSurahs();
  }, []);

  const fetchSurahs = async () => {
    try {
      const { data, error } = await supabase
        .from("surahs")
        .select("*")
        .order("number");

      if (error) throw error;
      setSurahs(data || []);
    } catch (error) {
      console.error("Error fetching surahs:", error);
      toast({
        title: "Error",
        description: "Failed to fetch surahs",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDialog = (surah?: Surah) => {
    if (surah) {
      setEditingSurah(surah);
      setFormData({
        number: surah.number.toString(),
        name_arabic: surah.name_arabic,
        name_english: surah.name_english,
        name_bengali: surah.name_bengali,
        meaning_english: surah.meaning_english,
        meaning_bengali: surah.meaning_bengali,
        revelation_type: surah.revelation_type,
        total_verses: surah.total_verses.toString(),
      });
    } else {
      setEditingSurah(null);
      setFormData({
        number: "",
        name_arabic: "",
        name_english: "",
        name_bengali: "",
        meaning_english: "",
        meaning_bengali: "",
        revelation_type: "meccan",
        total_verses: "",
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.number || !formData.name_arabic || !formData.name_english) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const surahData = {
        number: parseInt(formData.number),
        name_arabic: formData.name_arabic,
        name_english: formData.name_english,
        name_bengali: formData.name_bengali,
        meaning_english: formData.meaning_english,
        meaning_bengali: formData.meaning_bengali,
        revelation_type: formData.revelation_type,
        total_verses: parseInt(formData.total_verses) || 0,
      };

      if (editingSurah) {
        const { error } = await supabase
          .from("surahs")
          .update(surahData)
          .eq("id", editingSurah.id);

        if (error) throw error;
        toast({ title: "Success", description: "Surah updated successfully" });
      } else {
        const { error } = await supabase
          .from("surahs")
          .insert(surahData);

        if (error) throw error;
        toast({ title: "Success", description: "Surah created successfully" });
      }

      setIsDialogOpen(false);
      fetchSurahs();
    } catch (error) {
      console.error("Error saving surah:", error);
      toast({
        title: "Error",
        description: "Failed to save surah",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (surah: Surah) => {
    if (!confirm(`Are you sure you want to delete Surah ${surah.name_english}?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from("surahs")
        .delete()
        .eq("id", surah.id);

      if (error) throw error;
      
      toast({ title: "Success", description: "Surah deleted successfully" });
      fetchSurahs();
    } catch (error) {
      console.error("Error deleting surah:", error);
      toast({
        title: "Error",
        description: "Failed to delete surah",
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
          <h2 className="text-2xl font-bold">Surahs Management</h2>
          <p className="text-muted-foreground">Add, edit, or remove Quran chapters</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Surah
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingSurah ? "Edit Surah" : "Add New Surah"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="number">Surah Number *</Label>
                  <Input
                    id="number"
                    type="number"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="total_verses">Total Verses</Label>
                  <Input
                    id="total_verses"
                    type="number"
                    value={formData.total_verses}
                    onChange={(e) => setFormData({ ...formData, total_verses: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name_arabic">Arabic Name *</Label>
                <Input
                  id="name_arabic"
                  value={formData.name_arabic}
                  onChange={(e) => setFormData({ ...formData, name_arabic: e.target.value })}
                  className="font-arabic text-right"
                  dir="rtl"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name_english">English Name *</Label>
                  <Input
                    id="name_english"
                    value={formData.name_english}
                    onChange={(e) => setFormData({ ...formData, name_english: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name_bengali">Bengali Name</Label>
                  <Input
                    id="name_bengali"
                    value={formData.name_bengali}
                    onChange={(e) => setFormData({ ...formData, name_bengali: e.target.value })}
                    className="font-bengali"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="meaning_english">English Meaning</Label>
                  <Input
                    id="meaning_english"
                    value={formData.meaning_english}
                    onChange={(e) => setFormData({ ...formData, meaning_english: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meaning_bengali">Bengali Meaning</Label>
                  <Input
                    id="meaning_bengali"
                    value={formData.meaning_bengali}
                    onChange={(e) => setFormData({ ...formData, meaning_bengali: e.target.value })}
                    className="font-bengali"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="revelation_type">Revelation Type</Label>
                <Select
                  value={formData.revelation_type}
                  onValueChange={(value) => setFormData({ ...formData, revelation_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meccan">Meccan</SelectItem>
                    <SelectItem value="medinan">Medinan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSubmit} disabled={isSubmitting} className="mt-4">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  editingSurah ? "Update Surah" : "Create Surah"
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
                <TableHead className="w-16">#</TableHead>
                <TableHead>Arabic</TableHead>
                <TableHead>English</TableHead>
                <TableHead>Bengali</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="w-20">Verses</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {surahs.map((surah) => (
                <TableRow key={surah.id}>
                  <TableCell className="font-medium">{surah.number}</TableCell>
                  <TableCell className="font-arabic text-lg">{surah.name_arabic}</TableCell>
                  <TableCell>{surah.name_english}</TableCell>
                  <TableCell className="font-bengali">{surah.name_bengali}</TableCell>
                  <TableCell className="capitalize">{surah.revelation_type}</TableCell>
                  <TableCell>{surah.total_verses}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenDialog(surah)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(surah)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {surahs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No surahs found. Add your first surah to get started.
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

export default SurahsManagement;
