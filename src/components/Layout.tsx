import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { MobileNavFooter } from "@/components/MobileNavFooter";
import { Header } from "@/components/Header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";

interface LayoutProps {
  children: React.ReactNode;
  language: "bn" | "en";
  onLanguageChange: (lang: "bn" | "en") => void;
}

export const Layout = ({ children, language, onLanguageChange }: LayoutProps) => {
  const [activeTab, setActiveTab] = useState<"search" | "bookmarks">("search");
  
  // Track anonymous page views
  useVisitorTracking();

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar
        language={language}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <SidebarInset className="flex flex-col pb-16 md:pb-0">
        <Header language={language} onLanguageChange={onLanguageChange} />
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </SidebarInset>
      <MobileNavFooter language={language} />
    </SidebarProvider>
  );
};