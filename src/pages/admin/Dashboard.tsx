import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, FileText, Users, Mail, Eye, TrendingUp, Radio } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { startOfDay, startOfWeek, startOfMonth } from "date-fns";

interface Stats {
  surahs: number;
  verses: number;
  users: number;
  adminEmails: number;
}

interface VisitorStats {
  today: { views: number; visitors: number };
  week: { views: number; visitors: number };
  month: { views: number; visitors: number };
  all: { views: number; visitors: number };
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({ surahs: 0, verses: 0, users: 0, adminEmails: 0 });
  const [visitorStats, setVisitorStats] = useState<VisitorStats>({
    today: { views: 0, visitors: 0 },
    week: { views: 0, visitors: 0 },
    month: { views: 0, visitors: 0 },
    all: { views: 0, visitors: 0 },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(true);

  const calculateVisitorStats = (pageViews: any[]) => {
    const todayStart = startOfDay(new Date());
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 0 });
    const monthStart = startOfMonth(new Date());

    const todayViews = pageViews.filter(v => new Date(v.created_at) >= todayStart);
    const weekViews = pageViews.filter(v => new Date(v.created_at) >= weekStart);
    const monthViews = pageViews.filter(v => new Date(v.created_at) >= monthStart);

    setVisitorStats({
      today: {
        views: todayViews.length,
        visitors: new Set(todayViews.map(v => v.visitor_id)).size,
      },
      week: {
        views: weekViews.length,
        visitors: new Set(weekViews.map(v => v.visitor_id)).size,
      },
      month: {
        views: monthViews.length,
        visitors: new Set(monthViews.map(v => v.visitor_id)).size,
      },
      all: {
        views: pageViews.length,
        visitors: new Set(pageViews.map(v => v.visitor_id)).size,
      },
    });
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [surahsRes, versesRes, profilesRes, adminEmailsRes, pageViewsRes] = await Promise.all([
          supabase.from("surahs").select("id", { count: "exact", head: true }),
          supabase.from("verses").select("id", { count: "exact", head: true }),
          supabase.from("profiles").select("id", { count: "exact", head: true }),
          supabase.from("admin_emails").select("id", { count: "exact", head: true }),
          supabase.from("page_views").select("*"),
        ]);

        setStats({
          surahs: surahsRes.count || 0,
          verses: versesRes.count || 0,
          users: profilesRes.count || 0,
          adminEmails: adminEmailsRes.count || 0,
        });

        if (pageViewsRes.data) {
          calculateVisitorStats(pageViewsRes.data);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Real-time subscription for visitor stats
  useEffect(() => {
    const channel = supabase
      .channel('dashboard-page-views')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'page_views'
        },
        async () => {
          const { data: pageViews } = await supabase
            .from("page_views")
            .select("*");
          
          if (pageViews) {
            calculateVisitorStats(pageViews);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const statCards = [
    { title: "Total Surahs", value: stats.surahs, icon: Book, color: "text-primary" },
    { title: "Total Verses", value: stats.verses, icon: FileText, color: "text-blue-500" },
    { title: "Registered Users", value: stats.users, icon: Users, color: "text-amber-500" },
    { title: "Admin Emails", value: stats.adminEmails, icon: Mail, color: "text-rose-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Welcome to Admin Panel</h2>
          <p className="text-muted-foreground">Manage your Quran application content and users.</p>
        </div>
        <Badge variant={isLive ? "default" : "secondary"} className="flex items-center gap-1.5">
          <Radio className={`h-3 w-3 ${isLive ? "animate-pulse" : ""}`} />
          Live
        </Badge>
      </div>

      {/* Visitor Analytics Section */}
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Eye className="h-5 w-5 text-primary" />
          Visitor Analytics
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Today's Visitors
              </CardTitle>
              <TrendingUp className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? "..." : visitorStats.today.visitors}
              </div>
              <p className="text-xs text-muted-foreground">
                {visitorStats.today.views} page views
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                This Week
              </CardTitle>
              <Eye className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? "..." : visitorStats.week.visitors}
              </div>
              <p className="text-xs text-muted-foreground">
                {visitorStats.week.views} page views
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                This Month
              </CardTitle>
              <Users className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? "..." : visitorStats.month.visitors}
              </div>
              <p className="text-xs text-muted-foreground">
                {visitorStats.month.views} page views
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                All Time
              </CardTitle>
              <Eye className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? "..." : visitorStats.all.visitors}
              </div>
              <p className="text-xs text-muted-foreground">
                {visitorStats.all.views} page views
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Content Stats Section */}
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Book className="h-5 w-5 text-primary" />
          Content Overview
        </h3>
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
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Navigate to <strong>Analytics</strong> for detailed visitor insights</p>
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
