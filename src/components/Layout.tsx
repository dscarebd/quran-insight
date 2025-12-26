import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { MobileNavFooter } from "@/components/MobileNavFooter";
import { Header } from "@/components/Header";
import { DesktopHeader } from "@/components/DesktopHeader";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { useIsMobile } from "@/hooks/use-mobile";
import { Language } from "@/types/language";

interface LayoutProps {
  children: React.ReactNode;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Layout = ({ children, language, onLanguageChange }: LayoutProps) => {
  const [activeTab, setActiveTab] = useState<"search" | "bookmarks">("search");
  const isMobile = useIsMobile();
  
  // Track anonymous page views
  useVisitorTracking();

  // Desktop layout with top navigation
  if (!isMobile) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <DesktopHeader language={language} onLanguageChange={onLanguageChange} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    );
  }

  // Mobile/Tablet layout with sidebar
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar
        language={language}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <SidebarInset className="flex flex-col pb-14 lg:pb-0">
        <Header language={language} onLanguageChange={onLanguageChange} />
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </SidebarInset>
      <MobileNavFooter language={language} />
    </SidebarProvider>
  );
};