import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AppSidebar } from "@/components/AppSidebar";
import { MobileNavFooter } from "@/components/MobileNavFooter";
import { Header } from "@/components/Header";
import { DesktopHeader } from "@/components/DesktopHeader";
import { PageTransition } from "@/components/PageTransition";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { useIsMobile } from "@/hooks/use-mobile";
import { Language } from "@/types/language";

interface LayoutProps {
  children: React.ReactNode;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  // Optional ReadPage controls for tablet header
  arabicFont?: "amiri" | "uthmani";
  onArabicFontChange?: (font: "amiri" | "uthmani") => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  canZoomIn?: boolean;
  canZoomOut?: boolean;
}

export const Layout = ({
  children,
  language,
  onLanguageChange,
  arabicFont,
  onArabicFontChange,
  onZoomIn,
  onZoomOut,
  canZoomIn,
  canZoomOut,
}: LayoutProps) => {
  const [activeTab, setActiveTab] = useState<"search" | "bookmarks">("search");
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Track anonymous page views
  useVisitorTracking();

  // Desktop layout with top navigation
  if (!isMobile) {
    return (
      <div className="min-h-screen flex flex-col bg-background overflow-x-hidden max-w-full">
        <DesktopHeader language={language} onLanguageChange={onLanguageChange} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden pt-[68px] max-w-full">
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              {children}
            </PageTransition>
          </AnimatePresence>
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
      <SidebarInset className="flex flex-col pb-14 lg:pb-0 overflow-x-hidden max-w-full min-h-screen">
        {/* Safe area fill for top notch/cutout (Samsung S25 Plus, S23 Ultra, iPhone, etc.) */}
        {/* Uses max() to ensure minimum 24px fallback when env() returns 0 on some Samsung devices */}
        <div 
          className="fixed top-0 left-0 right-0 z-40 bg-card lg:hidden"
          style={{ height: 'max(env(safe-area-inset-top, 0px), 24px)' }}
        />
        <div 
          className="fixed left-0 right-0 z-30 lg:left-[var(--sidebar-width)]"
          style={{ top: 'max(env(safe-area-inset-top, 0px), 24px)' }}
        >
          <Header
            language={language}
            onLanguageChange={onLanguageChange}
            arabicFont={arabicFont}
            onArabicFontChange={onArabicFontChange}
            onZoomIn={onZoomIn}
            onZoomOut={onZoomOut}
            canZoomIn={canZoomIn}
            canZoomOut={canZoomOut}
          />
        </div>
        <div 
          className="flex-1 overflow-y-auto overflow-x-hidden max-w-full"
          style={{ paddingTop: 'calc(max(env(safe-area-inset-top, 0px), 24px) + 57px)' }}
        >
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              {children}
            </PageTransition>
          </AnimatePresence>
        </div>
      </SidebarInset>
      <MobileNavFooter language={language} />
    </SidebarProvider>
  );
};
