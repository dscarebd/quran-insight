import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Users, Eye, Calendar, TrendingUp, Radio, Smartphone, Globe } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { startOfDay, startOfWeek, startOfMonth, format, subDays } from "date-fns";

type TimePeriod = "today" | "week" | "month" | "all";

interface PageViewStats {
  totalViews: number;
  uniqueVisitors: number;
  topPages: { page_path: string; count: number }[];
}

interface DailyStats {
  date: string;
  views: number;
  visitors: number;
}

interface DeviceStats {
  web: { views: number; visitors: number };
  app: { views: number; visitors: number };
}

const Analytics = () => {
  const [period, setPeriod] = useState<TimePeriod>("today");
  const [stats, setStats] = useState<PageViewStats>({
    totalViews: 0,
    uniqueVisitors: 0,
    topPages: [],
  });
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(true);
  const [deviceStats, setDeviceStats] = useState<DeviceStats>({
    web: { views: 0, visitors: 0 },
    app: { views: 0, visitors: 0 },
  });
  const [summaryStats, setSummaryStats] = useState({
    today: { views: 0, visitors: 0 },
    week: { views: 0, visitors: 0 },
    month: { views: 0, visitors: 0 },
    all: { views: 0, visitors: 0 },
  });

  const getStartDate = (p: TimePeriod): Date | null => {
    const now = new Date();
    // Use UTC to avoid timezone issues with database timestamps
    switch (p) {
      case "today":
        return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
      case "week":
        const weekStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
        weekStart.setUTCDate(weekStart.getUTCDate() - now.getUTCDay());
        return weekStart;
      case "month":
        return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
      case "all":
        return null;
    }
  };

  // Detect if user agent is from APK (Capacitor WebView)
  const isAppUserAgent = (userAgent: string | null): boolean => {
    if (!userAgent) return false;
    // Capacitor apps use WebView with "wv" in user agent
    return userAgent.includes('wv') && userAgent.includes('Android');
  };

  const calculateStats = (pageViews: any[]) => {
    const startDate = getStartDate(period);
    
    // Filter for current period
    const filteredViews = startDate 
      ? pageViews.filter(v => new Date(v.created_at) >= startDate)
      : pageViews;

    const totalViews = filteredViews.length;
    const uniqueVisitors = new Set(filteredViews.map(pv => pv.visitor_id)).size;

    // Calculate top pages
    const pageCounts: Record<string, number> = {};
    filteredViews.forEach(pv => {
      pageCounts[pv.page_path] = (pageCounts[pv.page_path] || 0) + 1;
    });

    const topPages = Object.entries(pageCounts)
      .map(([page_path, count]) => ({ page_path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    setStats({ totalViews, uniqueVisitors, topPages });

    // Calculate device stats (Web vs App)
    const appViews = pageViews.filter(v => isAppUserAgent(v.user_agent));
    const webViews = pageViews.filter(v => !isAppUserAgent(v.user_agent));
    
    setDeviceStats({
      app: {
        views: appViews.length,
        visitors: new Set(appViews.map(v => v.visitor_id)).size,
      },
      web: {
        views: webViews.length,
        visitors: new Set(webViews.map(v => v.visitor_id)).size,
      },
    });

    // Calculate summary stats using UTC dates
    const now = new Date();
    const todayStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const weekStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    weekStart.setUTCDate(weekStart.getUTCDate() - now.getUTCDay());
    const monthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));

    const todayViews = pageViews.filter(v => new Date(v.created_at) >= todayStart);
    const weekViews = pageViews.filter(v => new Date(v.created_at) >= weekStart);
    const monthViews = pageViews.filter(v => new Date(v.created_at) >= monthStart);

    setSummaryStats({
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

    // Calculate daily stats for last 7 days
    const last7Days: DailyStats[] = [];
    for (let i = 6; i >= 0; i--) {
      const day = subDays(new Date(), i);
      const dayStart = startOfDay(day);
      const dayEnd = new Date(dayStart);
      dayEnd.setDate(dayEnd.getDate() + 1);

      const dayViews = pageViews.filter(v => {
        const date = new Date(v.created_at);
        return date >= dayStart && date < dayEnd;
      });

      last7Days.push({
        date: format(day, "EEE"),
        views: dayViews.length,
        visitors: new Set(dayViews.map(v => v.visitor_id)).size,
      });
    }
    setDailyStats(last7Days);
  };

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      // Fetch all page views with higher limit and ordered by recency
      const { data: pageViews, error } = await supabase
        .from("page_views")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10000);
      
      if (error) throw error;
      if (pageViews) {
        calculateStats(pageViews);
      }
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [period]);

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('page-views-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'page_views'
        },
        async () => {
          // Refetch all data when new page view arrives
          const { data: pageViews } = await supabase
            .from("page_views")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(10000);
          
          if (pageViews) {
            calculateStats(pageViews);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [period]);

  const periodLabels: Record<TimePeriod, string> = {
    today: "Today",
    week: "This Week",
    month: "This Month",
    all: "All Time",
  };

  const getPageName = (path: string): string => {
    if (path === "/") return "Home";
    if (path.startsWith("/surah/")) return `Surah ${path.split("/")[2]}`;
    if (path.startsWith("/para/")) return `Para ${path.split("/")[2]}`;
    if (path === "/dua") return "Dua";
    if (path === "/bookmarks") return "Bookmarks";
    if (path === "/settings") return "Settings";
    if (path.startsWith("/abdullah")) return "Admin Panel";
    return path;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Visitor Analytics</h2>
          <p className="text-muted-foreground">Track anonymous page views and visitor activity</p>
        </div>
        <Badge variant={isLive ? "default" : "secondary"} className="flex items-center gap-1.5">
          <Radio className={`h-3 w-3 ${isLive ? "animate-pulse" : ""}`} />
          {isLive ? "Live" : "Paused"}
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryStats.today.visitors}</div>
            <p className="text-xs text-muted-foreground">{summaryStats.today.views} page views</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryStats.week.visitors}</div>
            <p className="text-xs text-muted-foreground">{summaryStats.week.views} page views</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="h-4 w-4" />
              This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryStats.month.visitors}</div>
            <p className="text-xs text-muted-foreground">{summaryStats.month.views} page views</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Eye className="h-4 w-4" />
              All Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryStats.all.visitors}</div>
            <p className="text-xs text-muted-foreground">{summaryStats.all.views} page views</p>
          </CardContent>
        </Card>
      </div>

      {/* Device Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Device Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="p-2 rounded-full bg-blue-500/20">
                <Globe className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <div className="text-lg font-bold">{deviceStats.web.visitors}</div>
                <div className="text-xs text-muted-foreground">Web Visitors</div>
                <div className="text-xs text-muted-foreground">{deviceStats.web.views} views</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="p-2 rounded-full bg-green-500/20">
                <Smartphone className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <div className="text-lg font-bold">{deviceStats.app.visitors}</div>
                <div className="text-xs text-muted-foreground">App (APK) Users</div>
                <div className="text-xs text-muted-foreground">{deviceStats.app.views} views</div>
              </div>
            </div>
          </div>
          {/* Progress bar showing distribution */}
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Traffic Distribution</span>
              <span>
                {deviceStats.web.views + deviceStats.app.views > 0 
                  ? `${Math.round((deviceStats.app.views / (deviceStats.web.views + deviceStats.app.views)) * 100)}% App`
                  : '0%'}
              </span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden flex">
              <div 
                className="h-full bg-blue-500 transition-all"
                style={{ 
                  width: `${deviceStats.web.views + deviceStats.app.views > 0 
                    ? (deviceStats.web.views / (deviceStats.web.views + deviceStats.app.views)) * 100 
                    : 50}%` 
                }}
              />
              <div 
                className="h-full bg-green-500 transition-all"
                style={{ 
                  width: `${deviceStats.web.views + deviceStats.app.views > 0 
                    ? (deviceStats.app.views / (deviceStats.web.views + deviceStats.app.views)) * 100 
                    : 50}%` 
                }}
              />
            </div>
            <div className="flex justify-between text-xs">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                Web
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                App (APK)
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Last 7 Days Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Last 7 Days</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-2 h-32">
            {dailyStats.map((day, index) => {
              const maxViews = Math.max(...dailyStats.map(d => d.views), 1);
              const height = (day.views / maxViews) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-1">
                  <div className="text-xs text-muted-foreground">{day.views}</div>
                  <div
                    className="w-full bg-primary/80 rounded-t transition-all hover:bg-primary"
                    style={{ height: `${Math.max(height, 4)}%` }}
                    title={`${day.views} views, ${day.visitors} visitors`}
                  />
                  <div className="text-xs text-muted-foreground">{day.date}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Time Period Filter & Top Pages */}
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0 pb-4">
          <CardTitle className="text-lg">Top Pages</CardTitle>
          
          {/* Mobile: Dropdown Select */}
          <div className="md:hidden w-full">
            <Select value={period} onValueChange={(value) => setPeriod(value as TimePeriod)}>
              <SelectTrigger className="w-full bg-card">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent className="bg-card z-50">
                {(["today", "week", "month", "all"] as TimePeriod[]).map((p) => (
                  <SelectItem key={p} value={p}>
                    {periodLabels[p]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Desktop: Button Group */}
          <div className="hidden md:flex gap-2">
            {(["today", "week", "month", "all"] as TimePeriod[]).map((p) => (
              <Button
                key={p}
                variant={period === p ? "default" : "outline"}
                size="sm"
                onClick={() => setPeriod(p)}
              >
                {periodLabels[p]}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          {stats.topPages.length > 0 ? (
            <div className="space-y-3">
              {stats.topPages.map((page, index) => {
                const percentage = (page.count / stats.totalViews) * 100;
                return (
                  <div key={page.page_path} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <span className="text-muted-foreground">{index + 1}.</span>
                        {getPageName(page.page_path)}
                      </span>
                      <span className="text-muted-foreground">{page.count} views</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary/70 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No page views recorded for {periodLabels[period].toLowerCase()}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
