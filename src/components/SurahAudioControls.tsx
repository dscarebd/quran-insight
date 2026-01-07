import { useState, useEffect } from "react";
import { Play, Pause, Download, Check, Loader2, Trash2, Volume2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Language } from "@/types/language";
import { 
  isSurahDownloaded, 
  downloadSurahAudio, 
  deleteSurahAudio,
  getSurahDownloadProgress 
} from "@/services/quranAudioService";
import { getReciterById } from "@/data/reciters";
import { toast } from "sonner";

interface SurahAudioControlsProps {
  surahNumber: number;
  totalVerses: number;
  reciterId: string;
  language: Language;
  isPlaying: boolean;
  isAudioActive: boolean;
  onPlayAll: () => void;
  onPause: () => void;
  onOpenReciterSelector: () => void;
}

export const SurahAudioControls = ({
  surahNumber,
  totalVerses,
  reciterId,
  language,
  isPlaying,
  isAudioActive,
  onPlayAll,
  onPause,
  onOpenReciterSelector
}: SurahAudioControlsProps) => {
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isCheckingDownload, setIsCheckingDownload] = useState(true);

  const reciter = getReciterById(reciterId);

  // Check download status
  useEffect(() => {
    const checkDownloadStatus = async () => {
      setIsCheckingDownload(true);
      const downloaded = await isSurahDownloaded(surahNumber, totalVerses, reciterId);
      setIsDownloaded(downloaded);
      
      if (!downloaded) {
        const progress = await getSurahDownloadProgress(surahNumber, reciterId);
        setDownloadProgress((progress / totalVerses) * 100);
      }
      setIsCheckingDownload(false);
    };

    checkDownloadStatus();
  }, [surahNumber, totalVerses, reciterId]);

  const handleDownload = async () => {
    if (isDownloading) return;

    setIsDownloading(true);
    setDownloadProgress(0);

    try {
      await downloadSurahAudio(
        surahNumber,
        totalVerses,
        reciterId,
        (downloaded, total) => {
          setDownloadProgress((downloaded / total) * 100);
        }
      );
      
      setIsDownloaded(true);
      toast.success(
        language === "bn" 
          ? "সূরা ডাউনলোড সম্পন্ন হয়েছে" 
          : "Surah audio downloaded successfully"
      );
    } catch (error) {
      toast.error(
        language === "bn" 
          ? "ডাউনলোড ব্যর্থ হয়েছে" 
          : "Failed to download audio"
      );
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteSurahAudio(surahNumber, reciterId);
      setIsDownloaded(false);
      setDownloadProgress(0);
      toast.success(
        language === "bn" 
          ? "ডাউনলোড মুছে ফেলা হয়েছে" 
          : "Downloaded audio deleted"
      );
    } catch (error) {
      toast.error(
        language === "bn" 
          ? "মুছে ফেলা ব্যর্থ হয়েছে" 
          : "Failed to delete audio"
      );
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
      {/* Play All Button */}
      <Button
        variant={isAudioActive ? "default" : "outline"}
        size="sm"
        className="gap-2"
        onClick={isPlaying ? onPause : onPlayAll}
      >
        {isPlaying ? (
          <>
            <Pause className="h-4 w-4" />
            <span className={language === "bn" ? "font-bengali" : ""}>
              {language === "bn" ? "বিরতি" : "Pause"}
            </span>
          </>
        ) : (
          <>
            <Play className="h-4 w-4" />
            <span className={language === "bn" ? "font-bengali" : ""}>
              {language === "bn" ? "সব শুনুন" : "Play All"}
            </span>
          </>
        )}
      </Button>

      {/* Reciter Selector */}
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={onOpenReciterSelector}
      >
        <Volume2 className="h-4 w-4" />
        <span className={cn("max-w-[100px] truncate", language === "bn" && "font-bengali")}>
          {language === "bn" ? reciter?.nameBengali?.split(" ")[0] : reciter?.nameEnglish?.split(" ")[0]}
        </span>
        <ChevronDown className="h-3 w-3" />
      </Button>

      {/* Download/Downloaded Button */}
      {isCheckingDownload ? (
        <Button variant="outline" size="sm" disabled>
          <Loader2 className="h-4 w-4 animate-spin" />
        </Button>
      ) : isDownloading ? (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled className="gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className={language === "bn" ? "font-bengali" : ""}>
              {Math.round(downloadProgress)}%
            </span>
          </Button>
        </div>
      ) : isDownloaded ? (
        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" className="gap-2 text-primary" disabled>
            <Check className="h-4 w-4" />
            <span className={language === "bn" ? "font-bengali" : ""}>
              {language === "bn" ? "সংরক্ষিত" : "Saved"}
            </span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={handleDownload}
        >
          <Download className="h-4 w-4" />
          <span className={language === "bn" ? "font-bengali" : ""}>
            {language === "bn" ? "ডাউনলোড" : "Download"}
          </span>
        </Button>
      )}
    </div>
  );
};
