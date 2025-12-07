import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Plus, Trash2, Loader2, AlertTriangle } from "lucide-react";
import { z } from "zod";
import type { Tables } from "@/integrations/supabase/types";

type AdminEmail = Tables<"admin_emails">;

const emailSchema = z.string().email("Please enter a valid email address");

const AdminEmailsManagement = () => {
  const [adminEmails, setAdminEmails] = useState<AdminEmail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchAdminEmails();
  }, []);

  const fetchAdminEmails = async () => {
    try {
      const { data, error } = await supabase
        .from("admin_emails")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAdminEmails(data || []);
    } catch (error) {
      console.error("Error fetching admin emails:", error);
      toast({
        title: "Error",
        description: "Failed to fetch admin emails",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    // Validate email
    const validation = emailSchema.safeParse(newEmail);
    if (!validation.success) {
      toast({
        title: "Validation Error",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    // Check if email already exists
    if (adminEmails.some((e) => e.email.toLowerCase() === newEmail.toLowerCase())) {
      toast({
        title: "Email Already Exists",
        description: "This email is already in the admin list",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from("admin_emails")
        .insert({ email: newEmail.toLowerCase() });

      if (error) throw error;
      
      toast({ title: "Success", description: "Admin email added successfully" });
      setNewEmail("");
      setIsDialogOpen(false);
      fetchAdminEmails();
    } catch (error) {
      console.error("Error adding admin email:", error);
      toast({
        title: "Error",
        description: "Failed to add admin email",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (adminEmail: AdminEmail) => {
    if (!confirm(`Are you sure you want to remove ${adminEmail.email} from admin list?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from("admin_emails")
        .delete()
        .eq("id", adminEmail.id);

      if (error) throw error;
      
      toast({ title: "Success", description: "Admin email removed successfully" });
      fetchAdminEmails();
    } catch (error) {
      console.error("Error deleting admin email:", error);
      toast({
        title: "Error",
        description: "Failed to remove admin email",
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
          <h2 className="text-2xl font-bold">Admin Emails</h2>
          <p className="text-muted-foreground">Manage which emails have admin access</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Admin Email
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Admin Email</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />
              </div>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add Email"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            <CardTitle className="text-base text-amber-800 dark:text-amber-200">
              How Admin Access Works
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-amber-700 dark:text-amber-300">
            When a user signs up with an email in this list, they will automatically be 
            assigned the admin role. Existing users will need to be manually assigned 
            the admin role in the database.
          </CardDescription>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Added</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminEmails.map((adminEmail) => (
                <TableRow key={adminEmail.id}>
                  <TableCell className="font-medium">{adminEmail.email}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {adminEmail.created_at
                      ? new Date(adminEmail.created_at).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(adminEmail)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {adminEmails.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                    No admin emails configured. Add an email to get started.
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

export default AdminEmailsManagement;
