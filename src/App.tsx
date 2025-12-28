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
import { Language } from "@/types/language";
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

const queryClient = new QueryClient();

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

const AppContent = () => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("quran-language");
    return (saved as Language) || "bn";
  });
  const [readingMode, setReadingMode] = useState<"normal" | "sepia">(() => {
    const saved = localStorage.getItem("quran-reading-mode");
    return (saved as "normal" | "sepia") || "normal";
  });
  const [arabicFont, setArabicFont] = useState<"amiri" | "uthmani">(() => {
    const saved = localStorage.getItem("quran-arabic-font");
    return (saved as "amiri" | "uthmani") || "amiri";
  });
  const { fontSize, setFontSize } = useFontSize();
  
  // Save language to localStorage
  useEffect(() => {
    localStorage.setItem("quran-language", language);
  }, [language]);
  
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

  return (
    <Routes>
      <Route path="/" element={
        <Layout language={language} onLanguageChange={setLanguage}>
          <Index language={language} />
        </Layout>
      } />
      <Route path="/surah" element={
        <Layout language={language} onLanguageChange={setLanguage}>
          <SurahList language={language} />
        </Layout>
      } />
      <Route path="/surah/:surahNumber" element={
        <Layout language={language} onLanguageChange={setLanguage}>
          <SurahDetail language={language} readingMode={readingMode} arabicFont={arabicFont} />
        </Layout>
      } />
      <Route path="/para" element={
        <Layout language={language} onLanguageChange={setLanguage}>
          <ParaList language={language} />
        </Layout>
      } />
      <Route path="/para/:paraNumber" element={
        <Layout language={language} onLanguageChange={setLanguage}>
          <ParaDetail language={language} readingMode={readingMode} arabicFont={arabicFont} />
        </Layout>
      } />
      <Route path="/read" element={<ReadPageRedirect />} />
      <Route path="/read/:pageNumber" element={
        <ReadPageWrapper
          language={language}
          onLanguageChange={setLanguage}
          readingMode={readingMode}
          arabicFont={arabicFont}
          onArabicFontChange={setArabicFont}
        />
      } />
      <Route path="/bookmarks" element={
        <Layout language={language} onLanguageChange={setLanguage}>
          <Bookmarks language={language} readingMode={readingMode} arabicFont={arabicFont} />
        </Layout>
      } />
      <Route path="/dua" element={
        <Layout language={language} onLanguageChange={setLanguage}>
          <Dua language={language} arabicFont={arabicFont} />
        </Layout>
      } />
      <Route path="/dua/:categoryId" element={
        <Layout language={language} onLanguageChange={setLanguage}>
          <Dua language={language} arabicFont={arabicFont} />
        </Layout>
      } />
      <Route path="/daily-dua" element={
        <Layout language={language} onLanguageChange={setLanguage}>
          <DailyDuaPage language={language} arabicFont={arabicFont} />
        </Layout>
      } />
      <Route path="/islamic-calendar" element={
        <Layout language={language} onLanguageChange={setLanguage}>
          <IslamicCalendar language={language} />
        </Layout>
      } />
      <Route path="/prayer-times" element={
        <Layout language={language} onLanguageChange={setLanguage}>
          <PrayerTimes language={language} />
        </Layout>
      } />
      <Route path="/names-of-allah" element={
        <Layout language={language} onLanguageChange={setLanguage}>
          <NamesOfAllah language={language} arabicFont={arabicFont} />
        </Layout>
      } />
      <Route path="/hadith" element={
        <Layout language={language} onLanguageChange={setLanguage}>
          <HadithList language={language} />
        </Layout>
      } />
      <Route path="/hadith/:bookSlug" element={
        <Layout language={language} onLanguageChange={setLanguage}>
          <HadithDetail language={language} arabicFont={arabicFont} />
        </Layout>
      } />
      <Route path="/hadith-search" element={
        <Layout language={language} onLanguageChange={setLanguage}>
          <HadithSearch language={language} arabicFont={arabicFont} />
        </Layout>
      } />
      <Route path="/settings" element={
        <Layout language={language} onLanguageChange={setLanguage}>
          <Settings language={language} onLanguageChange={setLanguage} readingMode={readingMode} onReadingModeChange={setReadingMode} arabicFont={arabicFont} onArabicFontChange={setArabicFont} fontSize={fontSize} onFontSizeChange={setFontSize} />
        </Layout>
      } />
      <Route path="/sources-credits" element={
        <Layout language={language} onLanguageChange={setLanguage}>
          <SourcesCredits language={language} />
        </Layout>
      } />
      <Route path="/developer" element={
        <Layout language={language} onLanguageChange={setLanguage}>
          <Developer language={language} />
        </Layout>
      } />
      <Route path="/auth" element={
        <Suspense fallback={<LoadingFallback />}>
          <Auth />
        </Suspense>
      } />
      <Route path="/admin" element={
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
