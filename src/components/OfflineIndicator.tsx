import { Wifi, WifiOff, RefreshCw, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Language } from "@/types/language";

interface OfflineIndicatorProps {
  isOffline: boolean;
  isSyncing: boolean;
  lastSyncTime: string | null;
  onRefresh?: () => void;
  language?: Language;
  className?: string;
  showRefreshButton?: boolean;
}

export const OfflineIndicator = ({
  isOffline,
  isSyncing,
  lastSyncTime,
  onRefresh,
  language = "bn",
  className,
  showRefreshButton = true,
}: OfflineIndicatorProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-xs px-2 py-1 rounded-md",
        isOffline
          ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200"
          : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200",
        className
      )}
    >
      {isSyncing ? (
        <>
          <RefreshCw className="h-3 w-3 animate-spin" />
          <span className={language === "bn" ? "font-bengali" : ""}>
            {language === "bn" ? "সিঙ্ক হচ্ছে..." : "Syncing..."}
          </span>
        </>
      ) : isOffline ? (
        <>
          <WifiOff className="h-3 w-3" />
          <span className={language === "bn" ? "font-bengali" : ""}>
            {language === "bn" ? "অফলাইন" : "Offline"}
          </span>
        </>
      ) : (
        <>
          <Wifi className="h-3 w-3" />
          <span className={language === "bn" ? "font-bengali" : ""}>
            {language === "bn" ? "অনলাইন" : "Online"}
          </span>
        </>
      )}

      {lastSyncTime && !isSyncing && (
        <span className={cn("text-muted-foreground flex items-center gap-1", language === "bn" ? "font-bengali" : "")}>
          <Clock className="h-3 w-3" />
          {lastSyncTime}
        </span>
      )}

      {showRefreshButton && !isOffline && !isSyncing && onRefresh && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onRefresh}
          className="h-5 px-1.5 text-xs"
        >
          <RefreshCw className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};

export default OfflineIndicator;
