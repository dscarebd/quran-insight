import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AppSidebar } from "@/components/AppSidebar";
import { MobileNavFooter } from "@/components/MobileNavFooter";
import { Header } from "@/components/Header";
import { DesktopHeader } from "@/components/DesktopHeader";
import { DesktopFooter } from "@/components/DesktopFooter";
import { PageTransition } from "@/components/PageTransition";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { useIsMobile } from "@/hooks/use-mobile";
import { useDeviceDetection, getStatusBarOffset } from "@/hooks/useDeviceDetection";
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
  const { statusBarHeight } = useDeviceDetection();
  
  // Calculate status bar offset with device-specific fallback
  const statusBarOffset = useMemo(() => getStatusBarOffset(statusBarHeight), [statusBarHeight]);
  
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
        <DesktopFooter language={language} />
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
      <SidebarInset className="flex flex-col lg:pb-0 overflow-x-hidden max-w-full min-h-screen">
        {/* Safe area fill for top notch/cutout (Samsung S25 Plus, S23 Ultra, iPhone, etc.) */}
        {/* Uses device-specific detection for Samsung devices where env() returns 0 */}
        <div 
          className="fixed top-0 left-0 right-0 z-40 bg-card lg:hidden"
          style={{ height: statusBarOffset }}
        />
        <div 
          className="fixed left-0 right-0 z-30 lg:left-[var(--sidebar-width)]"
          style={{ top: statusBarOffset }}
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
          className="flex-1 overflow-y-auto overflow-x-hidden max-w-full pb-28 lg:pb-0"
          style={{ paddingTop: `calc(${statusBarOffset} + 57px)` }}
        >
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              {children}
            </PageTransition>
          </AnimatePresence>
        </div>
        <DesktopFooter language={language} />
      </SidebarInset>
      <MobileNavFooter language={language} />
    </SidebarProvider>
  );
};
