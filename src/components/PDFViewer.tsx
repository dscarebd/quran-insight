import { useState, useEffect, useCallback, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Loader2,
  Maximize2,
  Minimize2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Language } from "@/types/language";
import { updateLastPage } from "@/services/pdfStorageService";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

interface PDFViewerProps {
  pdfBlob: Blob;
  bookId: string;
  initialPage?: number;
  language: Language;
  onPageChange?: (page: number, total: number) => void;
}

export const PDFViewer = ({
  pdfBlob,
  bookId,
  initialPage = 1,
  language,
  onPageChange
}: PDFViewerProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(initialPage);
  const [scale, setScale] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pageInputValue, setPageInputValue] = useState<string>(String(initialPage));
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout>();

  // Create blob URL
  useEffect(() => {
    const url = URL.createObjectURL(pdfBlob);
    setPdfUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [pdfBlob]);

  // Save reading progress with debounce
  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    saveTimeoutRef.current = setTimeout(() => {
      if (numPages > 0) {
        updateLastPage(bookId, pageNumber, numPages);
        onPageChange?.(pageNumber, numPages);
      }
    }, 1000);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [pageNumber, numPages, bookId, onPageChange]);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
  }, []);

  const goToPrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(prev => prev - 1);
      setPageInputValue(String(pageNumber - 1));
    }
  };

  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(prev => prev + 1);
      setPageInputValue(String(pageNumber + 1));
    }
  };

  const handlePageInput = (value: string) => {
    setPageInputValue(value);
    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= 1 && num <= numPages) {
      setPageNumber(num);
    }
  };

  const handlePageInputBlur = () => {
    setPageInputValue(String(pageNumber));
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        goToPrevPage();
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        goToNextPage();
      } else if (e.key === "+" || e.key === "=") {
        zoomIn();
      } else if (e.key === "-") {
        zoomOut();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pageNumber, numPages]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "flex flex-col h-full bg-muted/30",
        isFullscreen && "fixed inset-0 z-50 bg-background"
      )}
    >
      {/* Controls bar */}
      <div className="flex items-center justify-between gap-2 p-2 border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        {/* Page navigation */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-1 text-sm">
            <Input
              type="text"
              value={pageInputValue}
              onChange={(e) => handlePageInput(e.target.value)}
              onBlur={handlePageInputBlur}
              className="w-14 h-8 text-center"
            />
            <span className="text-muted-foreground whitespace-nowrap">
              / {numPages}
            </span>
          </div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Zoom controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={zoomOut}
            disabled={scale <= 0.5}
            className="h-8 w-8"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          
          <div className="hidden sm:flex items-center w-24">
            <Slider
              value={[scale * 100]}
              min={50}
              max={300}
              step={25}
              onValueChange={([value]) => setScale(value / 100)}
            />
          </div>
          
          <span className="text-xs text-muted-foreground w-12 text-center">
            {Math.round(scale * 100)}%
          </span>
          
          <Button
            variant="outline"
            size="icon"
            onClick={zoomIn}
            disabled={scale >= 3}
            className="h-8 w-8"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={toggleFullscreen}
            className="h-8 w-8"
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* PDF content */}
      <div className="flex-1 overflow-auto flex justify-center p-4">
        {isLoading && (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        
        {pdfUrl && (
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            }
            error={
              <div className="flex flex-col items-center justify-center h-64 text-destructive">
                <p className={language === "bn" ? "font-bengali" : ""}>
                  {language === "bn" ? "পিডিএফ লোড করতে ব্যর্থ" : "Failed to load PDF"}
                </p>
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              loading={
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              }
              className="shadow-lg"
            />
          </Document>
        )}
      </div>

      {/* Bottom progress bar */}
      <div className="border-t bg-background/95 backdrop-blur-sm p-2">
        <div className="flex items-center gap-4">
          <Slider
            value={[pageNumber]}
            min={1}
            max={numPages || 1}
            step={1}
            onValueChange={([value]) => {
              setPageNumber(value);
              setPageInputValue(String(value));
            }}
            className="flex-1"
          />
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {Math.round((pageNumber / (numPages || 1)) * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
};
