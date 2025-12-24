import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { MobileNavFooter } from "@/components/MobileNavFooter";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

interface LayoutProps {
  children: React.ReactNode;
  language: "bn" | "en";
  onLanguageChange: (lang: "bn" | "en") => void;
}

export const Layout = ({ children, language, onLanguageChange }: LayoutProps) => {
  const [activeTab, setActiveTab] = useState<"search" | "bookmarks">("search");

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar
        language={language}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <SidebarInset className="pb-16 md:pb-0">
        {children}
      </SidebarInset>
      <MobileNavFooter language={language} />
    </SidebarProvider>
  );
};