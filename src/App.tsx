import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import SurahDetail from "./pages/SurahDetail";
import ParaDetail from "./pages/ParaDetail";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import Dashboard from "./pages/admin/Dashboard";
import SurahsManagement from "./pages/admin/SurahsManagement";
import VersesManagement from "./pages/admin/VersesManagement";
import UsersManagement from "./pages/admin/UsersManagement";
import AdminEmailsManagement from "./pages/admin/AdminEmailsManagement";

const queryClient = new QueryClient();

const AppContent = () => {
  const [language, setLanguage] = useState<"bn" | "en">("bn");

  return (
    <Routes>
      {/* Public routes with Layout */}
      <Route path="/" element={<Layout language={language} onLanguageChange={setLanguage}><Index language={language} onLanguageChange={setLanguage} /></Layout>} />
      <Route path="/surah/:surahNumber" element={<Layout language={language} onLanguageChange={setLanguage}><SurahDetail language={language} onLanguageChange={setLanguage} /></Layout>} />
      <Route path="/para/:paraNumber" element={<Layout language={language} onLanguageChange={setLanguage}><ParaDetail language={language} onLanguageChange={setLanguage} /></Layout>} />
      
      {/* Auth route */}
      <Route path="/auth" element={<Auth />} />
      
      {/* Admin routes */}
      <Route path="/admin" element={<Admin />}>
        <Route index element={<Dashboard />} />
        <Route path="surahs" element={<SurahsManagement />} />
        <Route path="verses" element={<VersesManagement />} />
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
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;