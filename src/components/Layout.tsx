import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
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
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};