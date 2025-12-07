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
import type { Tables } from "@/integrations/supabase/types";

type Verse = Tables<"verses">;
type Surah = Tables<"surahs">;

const VersesManagement = () => {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVerse, setEditingVerse] = useState<Verse | null>(null);
  const [selectedSurah, setSelectedSurah] = useState<string>("all");
  const [formData, setFormData] = useState({
    surah_number: "",
    verse_number: "",
    arabic: "",
    english: "",
    bengali: "",
    tafsir_english: "",
    tafsir_bengali: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSurahs();
    fetchVerses();
  }, []);

  useEffect(() => {
    fetchVerses();
  }, [selectedSurah]);

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
    }
  };

  const fetchVerses = async () => {
    try {
      setIsLoading(true);
      let query = supabase
        .from("verses")
        .select("*")
        .order("surah_number")
        .order("verse_number");

      if (selectedSurah !== "all") {
        query = query.eq("surah_number", parseInt(selectedSurah));
      }

      // Limit to 100 verses for performance
      query = query.limit(100);

      const { data, error } = await query;

      if (error) throw error;
      setVerses(data || []);
    } catch (error) {
      console.error("Error fetching verses:", error);
      toast({
        title: "Error",
        description: "Failed to fetch verses",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDialog = (verse?: Verse) => {
    if (verse) {
      setEditingVerse(verse);
      setFormData({
        surah_number: verse.surah_number.toString(),
        verse_number: verse.verse_number.toString(),
        arabic: verse.arabic,
        english: verse.english,
        bengali: verse.bengali,
        tafsir_english: verse.tafsir_english || "",
        tafsir_bengali: verse.tafsir_bengali || "",
      });
    } else {
      setEditingVerse(null);
      setFormData({
        surah_number: selectedSurah !== "all" ? selectedSurah : "",
        verse_number: "",
        arabic: "",
        english: "",
        bengali: "",
        tafsir_english: "",
        tafsir_bengali: "",
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.surah_number || !formData.verse_number || !formData.arabic) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const verseData = {
        surah_number: parseInt(formData.surah_number),
        verse_number: parseInt(formData.verse_number),
        arabic: formData.arabic,
        english: formData.english,
        bengali: formData.bengali,
        tafsir_english: formData.tafsir_english || null,
        tafsir_bengali: formData.tafsir_bengali || null,
      };

      if (editingVerse) {
        const { error } = await supabase
          .from("verses")
          .update(verseData)
          .eq("id", editingVerse.id);

        if (error) throw error;
        toast({ title: "Success", description: "Verse updated successfully" });
      } else {
        const { error } = await supabase
          .from("verses")
          .insert(verseData);

        if (error) throw error;
        toast({ title: "Success", description: "Verse created successfully" });
      }

      setIsDialogOpen(false);
      fetchVerses();
    } catch (error) {
      console.error("Error saving verse:", error);
      toast({
        title: "Error",
        description: "Failed to save verse",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (verse: Verse) => {
    if (!confirm(`Are you sure you want to delete this verse?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from("verses")
        .delete()
        .eq("id", verse.id);

      if (error) throw error;
      
      toast({ title: "Success", description: "Verse deleted successfully" });
      fetchVerses();
    } catch (error) {
      console.error("Error deleting verse:", error);
      toast({
        title: "Error",
        description: "Failed to delete verse",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold">Verses Management</h2>
          <p className="text-muted-foreground">Add, edit, or remove Quran verses</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedSurah} onValueChange={setSelectedSurah}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by Surah" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Surahs</SelectItem>
              {surahs.map((surah) => (
                <SelectItem key={surah.id} value={surah.number.toString()}>
                  {surah.number}. {surah.name_english}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Add Verse
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingVerse ? "Edit Verse" : "Add New Verse"}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="surah_number">Surah Number *</Label>
                    <Select
                      value={formData.surah_number}
                      onValueChange={(value) => setFormData({ ...formData, surah_number: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Surah" />
                      </SelectTrigger>
                      <SelectContent>
                        {surahs.map((surah) => (
                          <SelectItem key={surah.id} value={surah.number.toString()}>
                            {surah.number}. {surah.name_english}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="verse_number">Verse Number *</Label>
                    <Input
                      id="verse_number"
                      type="number"
                      value={formData.verse_number}
                      onChange={(e) => setFormData({ ...formData, verse_number: e.target.value })}
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
                  <Label htmlFor="tafsir_english">English Tafsir</Label>
                  <Textarea
                    id="tafsir_english"
                    value={formData.tafsir_english}
                    onChange={(e) => setFormData({ ...formData, tafsir_english: e.target.value })}
                    className="min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tafsir_bengali">Bengali Tafsir</Label>
                  <Textarea
                    id="tafsir_bengali"
                    value={formData.tafsir_bengali}
                    onChange={(e) => setFormData({ ...formData, tafsir_bengali: e.target.value })}
                    className="font-bengali min-h-[100px]"
                  />
                </div>
                <Button onClick={handleSubmit} disabled={isSubmitting} className="mt-4">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    editingVerse ? "Update Verse" : "Create Verse"
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
                  <TableHead className="w-20">Surah</TableHead>
                  <TableHead className="w-20">Verse</TableHead>
                  <TableHead>Arabic</TableHead>
                  <TableHead>English</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {verses.map((verse) => (
                  <TableRow key={verse.id}>
                    <TableCell>{verse.surah_number}</TableCell>
                    <TableCell>{verse.verse_number}</TableCell>
                    <TableCell className="font-arabic text-lg max-w-xs truncate" dir="rtl">
                      {verse.arabic.substring(0, 50)}...
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {verse.english?.substring(0, 50)}...
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(verse)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(verse)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {verses.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No verses found. {selectedSurah !== "all" && "Try selecting a different surah or "}Add your first verse to get started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      
      {verses.length > 0 && (
        <p className="text-sm text-muted-foreground">
          Showing first 100 verses. Use the surah filter to narrow down results.
        </p>
      )}
    </div>
  );
};

export default VersesManagement;
