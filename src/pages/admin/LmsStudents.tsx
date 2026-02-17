import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, Users } from "lucide-react";

const LmsStudents = () => {
  const { data: students, isLoading } = useQuery({
    queryKey: ["admin-lms-students"],
    queryFn: async () => {
      const { data, error } = await supabase.from("lms_students").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div>
      <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
        <Users className="h-5 w-5" /> LMS Students ({students?.length || 0})
      </h2>

      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin" /></div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Registered</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students?.map((s) => (
              <TableRow key={s.id}>
                <TableCell>{s.full_name}</TableCell>
                <TableCell>{s.email}</TableCell>
                <TableCell>{s.phone}</TableCell>
                <TableCell>{new Date(s.created_at).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default LmsStudents;
