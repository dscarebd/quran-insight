import { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, Book, Users, Mail, FileText, LogOut, Home, Upload, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const adminNavItems = [
  { title: "Dashboard", url: "/admin", icon: Home },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "Surahs", url: "/admin/surahs", icon: Book },
  { title: "Verses", url: "/admin/verses", icon: FileText },
  { title: "Import", url: "/admin/import-verses", icon: Upload },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Emails", url: "/admin/admin-emails", icon: Mail },
];

const Admin = () => {
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate("/auth");
      } else if (!isAdmin) {
        navigate("/");
      }
    }
  }, [user, isAdmin, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const currentPageTitle = adminNavItems.find(item => 
    item.url === "/admin" 
      ? location.pathname === "/admin"
      : location.pathname.startsWith(item.url)
  )?.title || "Admin";

  const isActive = (url: string) => {
    if (url === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(url);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        {/* Desktop Sidebar - Hidden on mobile */}
        <Sidebar className="border-r hidden md:flex">
          <div className="p-4 border-b">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Book className="h-4 w-4 text-primary" />
              </div>
              <span className="font-semibold text-lg">Admin Panel</span>
            </div>
          </div>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {adminNavItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink 
                          to={item.url} 
                          end={item.url === "/admin"}
                          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent transition-colors"
                          activeClassName="bg-accent text-primary font-medium"
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <div className="mt-auto p-4 border-t">
            <div className="text-sm text-muted-foreground mb-2 truncate">
              {user.email}
            </div>
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </Sidebar>
        
        <main className="flex-1 overflow-auto pb-20 md:pb-0">
          <header className="h-14 border-b flex items-center justify-between px-4 gap-4 bg-card">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hidden md:flex" />
              <h1 className="font-semibold">{currentPageTitle}</h1>
            </div>
            {/* Mobile sign out button */}
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </header>
          <div className="p-4 md:p-6">
            <Outlet />
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card border-t">
          <div className="flex items-center justify-around py-2">
            {adminNavItems.map((item) => (
              <NavLink
                key={item.title}
                to={item.url}
                end={item.url === "/admin"}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 px-2 py-1.5 rounded-lg transition-colors min-w-[48px]",
                  isActive(item.url)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{item.title}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </SidebarProvider>
  );
};

export default Admin;
