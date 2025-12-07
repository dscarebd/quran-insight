import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, FileText, Users, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Stats {
  surahs: number;
  verses: number;
  users: number;
  adminEmails: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({ surahs: 0, verses: 0, users: 0, adminEmails: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [surahsRes, versesRes, profilesRes, adminEmailsRes] = await Promise.all([
          supabase.from("surahs").select("id", { count: "exact", head: true }),
          supabase.from("verses").select("id", { count: "exact", head: true }),
          supabase.from("profiles").select("id", { count: "exact", head: true }),
          supabase.from("admin_emails").select("id", { count: "exact", head: true }),
        ]);

        setStats({
          surahs: surahsRes.count || 0,
          verses: versesRes.count || 0,
          users: profilesRes.count || 0,
          adminEmails: adminEmailsRes.count || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: "Total Surahs", value: stats.surahs, icon: Book, color: "text-primary" },
    { title: "Total Verses", value: stats.verses, icon: FileText, color: "text-blue-500" },
    { title: "Registered Users", value: stats.users, icon: Users, color: "text-amber-500" },
    { title: "Admin Emails", value: stats.adminEmails, icon: Mail, color: "text-rose-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Welcome to Admin Panel</h2>
        <p className="text-muted-foreground">Manage your Quran application content and users.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? "..." : stat.value.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Navigate to <strong>Surahs</strong> to manage Quran chapters</p>
          <p>• Navigate to <strong>Verses</strong> to manage individual verses</p>
          <p>• Navigate to <strong>Users</strong> to view registered users and their roles</p>
          <p>• Navigate to <strong>Admin Emails</strong> to manage admin access</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
