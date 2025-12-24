import { useState, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { AuthProvider } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import Index from "./pages/Index";
import SurahDetail from "./pages/SurahDetail";
import ParaDetail from "./pages/ParaDetail";
import Bookmarks from "./pages/Bookmarks";
import NotFound from "./pages/NotFound";

// Lazy load admin pages
const Admin = lazy(() => import("./pages/Admin"));
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const SurahsManagement = lazy(() => import("./pages/admin/SurahsManagement"));
const VersesManagement = lazy(() => import("./pages/admin/VersesManagement"));
const ImportVerses = lazy(() => import("./pages/admin/ImportVerses"));
const UsersManagement = lazy(() => import("./pages/admin/UsersManagement"));
const AdminEmailsManagement = lazy(() => import("./pages/admin/AdminEmailsManagement"));

const queryClient = new QueryClient();

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

const AppContent = () => {
  const [language, setLanguage] = useState<"bn" | "en">("bn");

  return (
    <Routes>
      <Route path="/" element={
        <Layout language={language} onLanguageChange={setLanguage}>
          <Index language={language} onLanguageChange={setLanguage} />
        </Layout>
      } />
      <Route path="/surah/:surahNumber" element={
        <Layout language={language} onLanguageChange={setLanguage}>
          <SurahDetail language={language} onLanguageChange={setLanguage} />
        </Layout>
      } />
      <Route path="/para/:paraNumber" element={
        <Layout language={language} onLanguageChange={setLanguage}>
          <ParaDetail language={language} onLanguageChange={setLanguage} />
        </Layout>
      } />
      <Route path="/bookmarks" element={
        <Layout language={language} onLanguageChange={setLanguage}>
          <Bookmarks language={language} onLanguageChange={setLanguage} />
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
        <Route path="import-verses" element={<ImportVerses />} />
        <Route path="users" element={<UsersManagement />} />
        <Route path="admin-emails" element={<AdminEmailsManagement />} />
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
