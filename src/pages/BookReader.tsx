import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, Download, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Language } from "@/types/language";
import { useBookById } from "@/hooks/useBookLibrary";
import { useBookDownload } from "@/hooks/useBookDownload";
import { PDFViewer } from "@/components/PDFViewer";
import { getReadingProgress } from "@/services/pdfStorageService";

interface BookReaderProps {
  language: Language;
}

const BookReader = ({ language }: BookReaderProps) => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const { data: book, isLoading: isBookLoading } = useBookById(bookId);
  const { getPDFBlob, isBookCached, downloadBook } = useBookDownload();
  
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [isLoadingPDF, setIsLoadingPDF] = useState(true);
  const [initialPage, setInitialPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Load PDF blob and reading progress
  useEffect(() => {
    const loadPDF = async () => {
      if (!bookId) return;
      
      setIsLoadingPDF(true);
      setError(null);
      
      try {
        // Check if book is cached
        const isCached = isBookCached(bookId);
        
        if (!isCached) {
          setError("not_downloaded");
          setIsLoadingPDF(false);
          return;
        }

        // Get PDF blob from cache
        const blob = await getPDFBlob(bookId);
        
        if (!blob) {
          setError("not_found");
          setIsLoadingPDF(false);
          return;
        }

        // Get reading progress
        const progress = await getReadingProgress(bookId);
        if (progress) {
          setInitialPage(progress.current_page);
        }

        setPdfBlob(blob);
      } catch (err) {
        console.error("Error loading PDF:", err);
        setError("load_failed");
      } finally {
        setIsLoadingPDF(false);
      }
    };

    loadPDF();
  }, [bookId, isBookCached, getPDFBlob]);

  const handleDownload = async () => {
    if (!book) return;
    
    setIsDownloading(true);
    try {
      const success = await downloadBook(book.id, book.pdf_url);
      if (success) {
        // Reload to show PDF
        const blob = await getPDFBlob(book.id);
        if (blob) {
          setPdfBlob(blob);
          setError(null);
        }
      }
    } finally {
      setIsDownloading(false);
    }
  };

  const title = book 
    ? (language === "bn" ? book.title_bengali : book.title_english)
    : "";

  if (isBookLoading || isLoadingPDF) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className={cn(
          "text-xl font-semibold mb-2",
          language === "bn" && "font-bengali"
        )}>
          {language === "bn" ? "বই পাওয়া যায়নি" : "Book not found"}
        </h2>
        <Button onClick={() => navigate("/books")} variant="outline" className="mt-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span className={language === "bn" ? "font-bengali" : ""}>
            {language === "bn" ? "লাইব্রেরিতে ফিরে যান" : "Back to Library"}
          </span>
        </Button>
      </div>
    );
  }

  if (error === "not_downloaded") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <Download className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className={cn(
          "text-xl font-semibold mb-2",
          language === "bn" && "font-bengali"
        )}>
          {language === "bn" ? "বই ডাউনলোড করুন" : "Download Book"}
        </h2>
        <p className={cn(
          "text-muted-foreground mb-4",
          language === "bn" && "font-bengali"
        )}>
          {language === "bn" 
            ? "পড়ার জন্য প্রথমে বইটি ডাউনলোড করুন"
            : "Download the book first to read it offline"
          }
        </p>
        <div className="flex gap-3">
          <Button onClick={() => navigate("/books")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className={language === "bn" ? "font-bengali" : ""}>
              {language === "bn" ? "ফিরে যান" : "Go Back"}
            </span>
          </Button>
          <Button onClick={handleDownload} disabled={isDownloading}>
            {isDownloading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Download className="h-4 w-4 mr-2" />
            )}
            <span className={language === "bn" ? "font-bengali" : ""}>
              {language === "bn" ? "ডাউনলোড করুন" : "Download"}
            </span>
          </Button>
        </div>
      </div>
    );
  }

  if (error || !pdfBlob) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h2 className={cn(
          "text-xl font-semibold mb-2",
          language === "bn" && "font-bengali"
        )}>
          {language === "bn" ? "লোড করতে ব্যর্থ" : "Failed to load"}
        </h2>
        <p className={cn(
          "text-muted-foreground mb-4",
          language === "bn" && "font-bengali"
        )}>
          {language === "bn" 
            ? "বইটি আবার ডাউনলোড করার চেষ্টা করুন"
            : "Try downloading the book again"
          }
        </p>
        <Button onClick={() => navigate("/books")} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span className={language === "bn" ? "font-bengali" : ""}>
            {language === "bn" ? "লাইব্রেরিতে ফিরে যান" : "Back to Library"}
          </span>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] lg:h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 border-b bg-background">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/books")}
          className="shrink-0"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className={cn(
          "font-semibold truncate",
          language === "bn" && "font-bengali"
        )}>
          {title}
        </h1>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 overflow-hidden">
        <PDFViewer
          pdfBlob={pdfBlob}
          bookId={book.id}
          initialPage={initialPage}
          language={language}
        />
      </div>
    </div>
  );
};

export default BookReader;
