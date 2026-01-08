import { useState, lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ReadPageWrapper } from "@/components/ReadPageWrapper";
import { AuthProvider } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { useContentProtection } from "@/hooks/useContentProtection";
import { useFontSize } from "@/hooks/useFontSize";
import { useBackButtonHandler } from "@/hooks/useBackButtonHandler";
import { useStatusBar } from "@/hooks/useStatusBar";
import { useSplashScreen } from "@/hooks/useSplashScreen";
import { useGeoLanguage } from "@/hooks/useGeoLanguage";
import { Language } from "@/types/language";
import { ArabicFontType } from "@/types/quranV1";
import { initializeBundledData } from "@/services/bundledDataLoader";
import Index from "./pages/Index";
import SurahList from "./pages/SurahList";
import SurahDetail from "./pages/SurahDetail";
import ParaList from "./pages/ParaList";
import ParaDetail from "./pages/ParaDetail";
import Bookmarks from "./pages/Bookmarks";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Dua from "./pages/Dua";
import DailyDuaPage from "./pages/DailyDua";
import SourcesCredits from "./pages/SourcesCredits";
import Developer from "./pages/Developer";
import IslamicCalendar from "./pages/IslamicCalendar";
import PrayerTimes from "./pages/PrayerTimes";
import NamesOfAllah from "./pages/NamesOfAllah";
import HadithList from "./pages/HadithList";
import HadithDetail from "./pages/HadithDetail";
import HadithSearch from "./pages/HadithSearch";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Owner from "./pages/Owner";
import MasailList from "./pages/MasailList";
import MasailDetail from "./pages/MasailDetail";
// Component to redirect to last read page
const ReadPageRedirect = () => {
  const lastReadPage = localStorage.getItem("quran-last-read-page") || "1";
  return <Navigate to={`/read/${lastReadPage}`} replace />;
};

// Lazy load admin pages
const Admin = lazy(() => import("./pages/Admin"));
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const SurahsManagement = lazy(() => import("./pages/admin/SurahsManagement"));
const VersesManagement = lazy(() => import("./pages/admin/VersesManagement"));
const ImportVerses = lazy(() => import("./pages/admin/ImportVerses"));
const UsersManagement = lazy(() => import("./pages/admin/UsersManagement"));
const AdminEmailsManagement = lazy(() => import("./pages/admin/AdminEmailsManagement"));
const Analytics = lazy(() => import("./pages/admin/Analytics"));
const DuaCategoriesManagement = lazy(() => import("./pages/admin/DuaCategoriesManagement"));
const DuasManagement = lazy(() => import("./pages/admin/DuasManagement"));
const ImportDuas = lazy(() => import("./pages/admin/ImportDuas"));
const HadithManagement = lazy(() => import("./pages/admin/HadithManagement"));
const ExportData = lazy(() => import("./pages/admin/ExportData"));
const MasailManagement = lazy(() => import("./pages/admin/MasailManagement"));
const queryClient = new QueryClient();

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

const AppContent = () => {
  const { language: geoLanguage, setLanguage: setGeoLanguage, isDetecting } = useGeoLanguage();
  const [language, setLanguage] = useState<Language>(geoLanguage);
  
  // Sync with geo language detection
  useEffect(() => {
    if (!localStorage.getItem("quran-language")) {
      setLanguage(geoLanguage);
    }
  }, [geoLanguage]);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    localStorage.setItem("quran-language", newLang);
  };

  const [readingMode, setReadingMode] = useState<"normal" | "sepia">(() => {
    const saved = localStorage.getItem("quran-reading-mode");
    return (saved as "normal" | "sepia") || "normal";
  });
  const [arabicFont, setArabicFont] = useState<ArabicFontType>(() => {
    const saved = localStorage.getItem("quran-arabic-font");
    return (saved as ArabicFontType) || "amiri";
  });
  const { fontSize, setFontSize } = useFontSize();
  
  // Save reading mode to localStorage
  useEffect(() => {
    localStorage.setItem("quran-reading-mode", readingMode);
  }, [readingMode]);

  // Save arabic font to localStorage
  useEffect(() => {
    localStorage.setItem("quran-arabic-font", arabicFont);
  }, [arabicFont]);
  
  // Enable content protection
  useContentProtection();
  
  // Handle mobile back button to prevent accidental exit
  useBackButtonHandler();

  // Configure native status bar for edge-to-edge display
  useStatusBar();

  // Hide splash screen once app is ready
  useSplashScreen();

  // Load bundled data on app startup
  useEffect(() => {
    initializeBundledData().catch(console.error);
  }, []);

  return (
    <Routes>
      <Route path="/" element={
        <Layout language={language} onLanguageChange={handleLanguageChange}>
          <Index language={language} />
        </Layout>
      } />
      <Route path="/surah" element={
        <Layout language={language} onLanguageChange={handleLanguageChange}>
          <SurahList language={language} />
        </Layout>
      } />
      <Route path="/surah/:surahNumber" element={
        <Layout language={language} onLanguageChange={handleLanguageChange}>
          <SurahDetail language={language} readingMode={readingMode} arabicFont={arabicFont} />
        </Layout>
      } />
      <Route path="/para" element={
        <Layout language={language} onLanguageChange={handleLanguageChange}>
          <ParaList language={language} />
        </Layout>
      } />
      <Route path="/para/:paraNumber" element={
        <Layout language={language} onLanguageChange={handleLanguageChange}>
          <ParaDetail language={language} readingMode={readingMode} arabicFont={arabicFont} />
        </Layout>
      } />
      <Route path="/read" element={<ReadPageRedirect />} />
      <Route path="/read/:pageNumber" element={
        <ReadPageWrapper
          language={language}
          onLanguageChange={handleLanguageChange}
          readingMode={readingMode}
          arabicFont={arabicFont}
          onArabicFontChange={setArabicFont}
        />
      } />
      <Route path="/bookmarks" element={
        <Layout language={language} onLanguageChange={handleLanguageChange}>
          <Bookmarks language={language} readingMode={readingMode} arabicFont={arabicFont} />
        </Layout>
      } />
      <Route path="/dua" element={
        <Layout language={language} onLanguageChange={handleLanguageChange}>
          <Dua language={language} arabicFont={arabicFont} />
        </Layout>
      } />
      <Route path="/dua/:categoryId" element={
        <Layout language={language} onLanguageChange={handleLanguageChange}>
          <Dua language={language} arabicFont={arabicFont} />
        </Layout>
      } />
      <Route path="/daily-dua" element={
        <Layout language={language} onLanguageChange={handleLanguageChange}>
          <DailyDuaPage language={language} arabicFont={arabicFont} />
        </Layout>
      } />
      <Route path="/islamic-calendar" element={
        <Layout language={language} onLanguageChange={handleLanguageChange}>
          <IslamicCalendar language={language} />
        </Layout>
      } />
      <Route path="/prayer-times" element={
        <Layout language={language} onLanguageChange={handleLanguageChange}>
          <PrayerTimes language={language} />
        </Layout>
      } />
      <Route path="/names-of-allah" element={
        <Layout language={language} onLanguageChange={handleLanguageChange}>
          <NamesOfAllah language={language} arabicFont={arabicFont} />
        </Layout>
      } />
      <Route path="/hadith" element={
        <Layout language={language} onLanguageChange={handleLanguageChange}>
          <HadithList language={language} />
        </Layout>
      } />
      <Route path="/hadith/:bookSlug" element={
        <Layout language={language} onLanguageChange={handleLanguageChange}>
          <HadithDetail language={language} arabicFont={arabicFont} />
        </Layout>
      } />
      <Route path="/hadith/:bookSlug/:hadithNumber" element={
        <Layout language={language} onLanguageChange={handleLanguageChange}>
          <HadithDetail language={language} arabicFont={arabicFont} />
        </Layout>
      } />
      <Route path="/hadith-search" element={
        <Layout language={language} onLanguageChange={handleLanguageChange}>
          <HadithSearch language={language} arabicFont={arabicFont} />
        </Layout>
      } />
      <Route path="/masail" element={
        <Layout language={language} onLanguageChange={handleLanguageChange}>
          <MasailList language={language} />
        </Layout>
      } />
      <Route path="/masail/:id" element={
        <Layout language={language} onLanguageChange={handleLanguageChange}>
          <MasailDetail language={language} />
        </Layout>
      } />
      <Route path="/settings" element={
        <Layout language={language} onLanguageChange={handleLanguageChange}>
          <Settings language={language} onLanguageChange={handleLanguageChange} readingMode={readingMode} onReadingModeChange={setReadingMode} arabicFont={arabicFont} onArabicFontChange={setArabicFont} fontSize={fontSize} onFontSizeChange={setFontSize} />
        </Layout>
      } />
      <Route path="/sources-credits" element={
        <Layout language={language} onLanguageChange={handleLanguageChange}>
          <SourcesCredits language={language} />
        </Layout>
      } />
      <Route path="/developer" element={
        <Layout language={language} onLanguageChange={handleLanguageChange}>
          <Developer language={language} />
        </Layout>
      } />
      <Route path="/privacy-policy" element={
        <Layout language={language} onLanguageChange={handleLanguageChange}>
          <PrivacyPolicy language={language} />
        </Layout>
      } />
      <Route path="/owner" element={
        <Layout language={language} onLanguageChange={handleLanguageChange}>
          <Owner language={language} />
        </Layout>
      } />
      <Route path="/auth" element={
        <Suspense fallback={<LoadingFallback />}>
          <Auth />
        </Suspense>
      } />
      <Route path="/abdullah" element={
        <Suspense fallback={<LoadingFallback />}>
          <Admin />
        </Suspense>
      }>
        <Route index element={<Dashboard />} />
        <Route path="surahs" element={<SurahsManagement />} />
        <Route path="verses" element={<VersesManagement />} />
        <Route path="dua-categories" element={<DuaCategoriesManagement />} />
        <Route path="duas" element={<DuasManagement />} />
        <Route path="import-duas" element={<ImportDuas />} />
        <Route path="hadiths" element={<HadithManagement />} />
        <Route path="import-verses" element={<ImportVerses />} />
        <Route path="users" element={<UsersManagement />} />
        <Route path="admin-emails" element={<AdminEmailsManagement />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="export-data" element={<ExportData />} />
        <Route path="masail" element={<MasailManagement />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
