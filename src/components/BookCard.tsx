import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, Check, Loader2, Trash2, BookOpen, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Language } from "@/types/language";
import { PDFBook } from "@/hooks/useBookLibrary";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface BookCardProps {
  book: PDFBook;
  language: Language;
  isCached: boolean;
  downloadProgress?: { progress: number; isDownloading: boolean };
  onDownload: () => Promise<boolean>;
  onDelete: () => Promise<void>;
  lastPage?: number;
  totalPages?: number;
}

export const BookCard = ({
  book,
  language,
  isCached,
  downloadProgress,
  onDownload,
  onDelete,
  lastPage,
  totalPages
}: BookCardProps) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const title = language === "bn" ? book.title_bengali : book.title_english;
  const author = language === "bn" ? book.author_bengali : book.author_english;
  const description = language === "bn" ? book.description_bengali : book.description_english;

  const handleDownload = async () => {
    const success = await onDownload();
    if (success) {
      toast.success(language === "bn" ? "ডাউনলোড সম্পন্ন" : "Download complete");
    } else {
      toast.error(language === "bn" ? "ডাউনলোড ব্যর্থ" : "Download failed");
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete();
      toast.success(language === "bn" ? "মুছে ফেলা হয়েছে" : "Deleted");
    } catch (error) {
      toast.error(language === "bn" ? "মুছতে ব্যর্থ" : "Failed to delete");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleRead = () => {
    if (isCached) {
      navigate(`/books/${book.id}`);
    } else {
      toast.error(language === "bn" ? "প্রথমে ডাউনলোড করুন" : "Download first to read");
    }
  };

  const formatFileSize = (sizeMb: number | null) => {
    if (!sizeMb) return "";
    if (sizeMb < 1) return `${Math.round(sizeMb * 1024)} KB`;
    return `${sizeMb.toFixed(1)} MB`;
  };

  const readingPercentage = lastPage && totalPages ? Math.round((lastPage / totalPages) * 100) : 0;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-[3/4] bg-muted">
        {book.cover_image_url ? (
          <img
            src={book.cover_image_url}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
            <BookOpen className="h-16 w-16 text-primary/40" />
          </div>
        )}
        
        {/* Status badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {isCached && (
            <Badge variant="secondary" className="bg-emerald-500/90 text-white">
              <Check className="h-3 w-3 mr-1" />
              {language === "bn" ? "ডাউনলোড" : "Ready"}
            </Badge>
          )}
          {book.is_featured && (
            <Badge variant="secondary" className="bg-amber-500/90 text-white">
              {language === "bn" ? "বৈশিষ্ট্যযুক্ত" : "Featured"}
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className={cn(
            "font-semibold text-base line-clamp-2",
            language === "bn" && "font-bengali"
          )}>
            {title}
          </h3>
          {author && (
            <p className={cn(
              "text-sm text-muted-foreground mt-1",
              language === "bn" && "font-bengali"
            )}>
              {author}
            </p>
          )}
        </div>

        {description && (
          <p className={cn(
            "text-xs text-muted-foreground line-clamp-2",
            language === "bn" && "font-bengali"
          )}>
            {description}
          </p>
        )}

        {/* Reading progress */}
        {isCached && lastPage && totalPages && lastPage > 1 && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span className={language === "bn" ? "font-bengali" : ""}>
                {language === "bn" ? "পড়া হয়েছে" : "Read"}
              </span>
              <span>{readingPercentage}%</span>
            </div>
            <Progress value={readingPercentage} className="h-1.5" />
          </div>
        )}

        {/* Download progress */}
        {downloadProgress?.isDownloading && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span className={language === "bn" ? "font-bengali" : ""}>
                {language === "bn" ? "ডাউনলোড হচ্ছে" : "Downloading"}
              </span>
              <span>{downloadProgress.progress}%</span>
            </div>
            <Progress value={downloadProgress.progress} className="h-1.5" />
          </div>
        )}

        {/* Meta info */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          {book.file_size_mb && (
            <span>{formatFileSize(book.file_size_mb)}</span>
          )}
          {book.total_pages && (
            <span className={language === "bn" ? "font-bengali" : ""}>
              {book.total_pages} {language === "bn" ? "পৃষ্ঠা" : "pages"}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {isCached ? (
            <>
              <Button
                onClick={handleRead}
                className="flex-1"
                size="sm"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                <span className={language === "bn" ? "font-bengali" : ""}>
                  {lastPage && lastPage > 1 
                    ? (language === "bn" ? "পড়া চালিয়ে যান" : "Continue")
                    : (language === "bn" ? "পড়ুন" : "Read")
                  }
                </span>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="px-3"
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4 text-destructive" />
                    )}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className={language === "bn" ? "font-bengali" : ""}>
                      {language === "bn" ? "বই মুছে ফেলবেন?" : "Delete book?"}
                    </AlertDialogTitle>
                    <AlertDialogDescription className={language === "bn" ? "font-bengali" : ""}>
                      {language === "bn" 
                        ? "এটি আপনার ডাউনলোড করা বই এবং পড়ার অগ্রগতি মুছে ফেলবে।"
                        : "This will delete the downloaded book and your reading progress."
                      }
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className={language === "bn" ? "font-bengali" : ""}>
                      {language === "bn" ? "বাতিল" : "Cancel"}
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                      <span className={language === "bn" ? "font-bengali" : ""}>
                        {language === "bn" ? "মুছে ফেলুন" : "Delete"}
                      </span>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          ) : (
            <Button
              onClick={handleDownload}
              className="flex-1"
              size="sm"
              disabled={downloadProgress?.isDownloading}
            >
              {downloadProgress?.isDownloading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Download className="h-4 w-4 mr-2" />
              )}
              <span className={language === "bn" ? "font-bengali" : ""}>
                {downloadProgress?.isDownloading 
                  ? `${downloadProgress.progress}%`
                  : (language === "bn" ? "ডাউনলোড" : "Download")
                }
              </span>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
