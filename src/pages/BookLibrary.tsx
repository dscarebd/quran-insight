import { useState, useEffect } from "react";
import { BookOpen, Loader2, Library, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Language } from "@/types/language";
import { useBookLibrary, PDFBook } from "@/hooks/useBookLibrary";
import { useBookDownload } from "@/hooks/useBookDownload";
import { BookCard } from "@/components/BookCard";
import { getAllReadingProgress, ReadingProgress } from "@/services/pdfStorageService";

interface BookLibraryProps {
  language: Language;
}

const BookLibrary = ({ language }: BookLibraryProps) => {
  const { data: books, isLoading, error } = useBookLibrary();
  const { 
    downloadBook, 
    deleteBook, 
    isBookCached, 
    getDownloadProgress,
    cachedBooks,
    isLoading: isCacheLoading 
  } = useBookDownload();
  const [readingProgress, setReadingProgress] = useState<Map<string, ReadingProgress>>(new Map());

  // Load reading progress for all books
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const allProgress = await getAllReadingProgress();
        const progressMap = new Map<string, ReadingProgress>();
        allProgress.forEach(p => progressMap.set(p.book_id, p));
        setReadingProgress(progressMap);
      } catch (error) {
        console.error("Error loading reading progress:", error);
      }
    };
    loadProgress();
  }, [cachedBooks]);

  if (isLoading || isCacheLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <WifiOff className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className={cn(
          "text-xl font-semibold mb-2",
          language === "bn" && "font-bengali"
        )}>
          {language === "bn" ? "লোড করতে ব্যর্থ" : "Failed to load"}
        </h2>
        <p className={cn(
          "text-muted-foreground",
          language === "bn" && "font-bengali"
        )}>
          {language === "bn" 
            ? "ইন্টারনেট সংযোগ পরীক্ষা করুন"
            : "Please check your internet connection"
          }
        </p>
      </div>
    );
  }

  if (!books || books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <Library className="h-16 w-16 text-muted-foreground/50 mb-4" />
        <h2 className={cn(
          "text-xl font-semibold mb-2",
          language === "bn" && "font-bengali"
        )}>
          {language === "bn" ? "কোনো বই নেই" : "No books available"}
        </h2>
        <p className={cn(
          "text-muted-foreground",
          language === "bn" && "font-bengali"
        )}>
          {language === "bn" 
            ? "শীঘ্রই নতুন বই যোগ করা হবে"
            : "New books will be added soon"
          }
        </p>
      </div>
    );
  }

  // Separate downloaded and available books
  const downloadedBooks = books.filter(book => isBookCached(book.id));
  const availableBooks = books.filter(book => !isBookCached(book.id));

  return (
    <div className="container max-w-6xl mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <BookOpen className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className={cn(
            "text-2xl font-bold",
            language === "bn" && "font-bengali"
          )}>
            {language === "bn" ? "বই লাইব্রেরি" : "Book Library"}
          </h1>
          <p className={cn(
            "text-sm text-muted-foreground",
            language === "bn" && "font-bengali"
          )}>
            {language === "bn" 
              ? "অফলাইনে পড়ার জন্য বই ডাউনলোড করুন"
              : "Download books to read offline"
            }
          </p>
        </div>
      </div>

      {/* Downloaded Books Section */}
      {downloadedBooks.length > 0 && (
        <section>
          <h2 className={cn(
            "text-lg font-semibold mb-4 flex items-center gap-2",
            language === "bn" && "font-bengali"
          )}>
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
            {language === "bn" ? "ডাউনলোড করা বই" : "Downloaded Books"}
            <span className="text-sm font-normal text-muted-foreground">
              ({downloadedBooks.length})
            </span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {downloadedBooks.map(book => {
              const progress = readingProgress.get(book.id);
              return (
                <BookCard
                  key={book.id}
                  book={book}
                  language={language}
                  isCached={true}
                  downloadProgress={getDownloadProgress(book.id)}
                  onDownload={() => downloadBook(book.id, book.pdf_url)}
                  onDelete={() => deleteBook(book.id)}
                  lastPage={progress?.current_page}
                  totalPages={progress?.total_pages || book.total_pages || undefined}
                />
              );
            })}
          </div>
        </section>
      )}

      {/* Available Books Section */}
      {availableBooks.length > 0 && (
        <section>
          <h2 className={cn(
            "text-lg font-semibold mb-4",
            language === "bn" && "font-bengali"
          )}>
            {language === "bn" ? "উপলব্ধ বই" : "Available Books"}
            <span className="text-sm font-normal text-muted-foreground ml-2">
              ({availableBooks.length})
            </span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {availableBooks.map(book => (
              <BookCard
                key={book.id}
                book={book}
                language={language}
                isCached={false}
                downloadProgress={getDownloadProgress(book.id)}
                onDownload={() => downloadBook(book.id, book.pdf_url)}
                onDelete={() => deleteBook(book.id)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default BookLibrary;
