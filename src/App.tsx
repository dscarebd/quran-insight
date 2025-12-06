import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import SurahDetail from "./pages/SurahDetail";
import ParaDetail from "./pages/ParaDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const [language, setLanguage] = useState<"bn" | "en">("bn");

  return (
    <Layout language={language} onLanguageChange={setLanguage}>
      <Routes>
        <Route path="/" element={<Index language={language} onLanguageChange={setLanguage} />} />
        <Route path="/surah/:surahNumber" element={<SurahDetail language={language} onLanguageChange={setLanguage} />} />
        <Route path="/para/:paraNumber" element={<ParaDetail language={language} onLanguageChange={setLanguage} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;