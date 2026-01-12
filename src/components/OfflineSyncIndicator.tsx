import { useState, useEffect } from "react";
import { Cloud, CloudOff, Download, Check, Loader2, RefreshCw, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOfflineBundle } from "@/hooks/useOfflineBundle";
import { Language } from "@/types/language";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface OfflineSyncIndicatorProps {
  language: Language;
  showDetails?: boolean;
}

export const OfflineSyncIndicator = ({ language, showDetails = false }: OfflineSyncIndicatorProps) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { 
    verses, 
    hadiths, 
    masail, 
    duas, 
    isComplete,
    isLoading,
    isSyncing, 
    currentType, 
    progress, 
    total,
    syncAll,
    lastSyncTime
  } = useOfflineBundle(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  const progressPercent = total > 0 ? Math.round((progress / total) * 100) : 0;

  // Compact indicator for header
  if (!showDetails) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <button
            className={cn(
              "flex items-center gap-1.5 px-2 py-1 rounded-full text-xs transition-colors",
              isOnline 
                ? isComplete 
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : isLoading || isSyncing
                    ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                : "bg-red-500/10 text-red-600 dark:text-red-400"
            )}
          >
            {!isOnline ? (
              <>
                <CloudOff className="h-3 w-3" />
                <span className={cn(language === "bn" && "font-bengali")}>
                  {language === "bn" ? "অফলাইন" : "Offline"}
                </span>
              </>
            ) : isLoading ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin" />
                <span className={cn(language === "bn" && "font-bengali")}>
                  {language === "bn" ? "লোড হচ্ছে" : "Loading"}
                </span>
              </>
            ) : isSyncing ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin" />
                <span className={cn(language === "bn" && "font-bengali")}>
                  {total > 0 ? `${progress}/${total}` : language === "bn" ? "চেক হচ্ছে" : "Checking"}
                </span>
              </>
            ) : isComplete ? (
              <>
                <Check className="h-3 w-3" />
                <span className={cn(language === "bn" && "font-bengali")}>
                  {language === "bn" ? "সম্পূর্ণ" : "Ready"}
                </span>
              </>
            ) : (
              <>
                <Download className="h-3 w-3" />
                <span className={cn(language === "bn" && "font-bengali")}>
                  {language === "bn" ? "আপডেট" : "Update"}
                </span>
              </>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-3" align="end">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className={cn("font-semibold text-sm", language === "bn" && "font-bengali")}>
                {language === "bn" ? "অফলাইন ডেটা" : "Offline Data"}
              </h4>
              {isOnline && !isSyncing && !isLoading && (
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-7 px-2"
                  onClick={() => syncAll(true)}
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  <span className={cn("text-xs", language === "bn" && "font-bengali")}>
                    {language === "bn" ? "আপডেট" : "Update"}
                  </span>
                </Button>
              )}
            </div>

            {isSyncing && currentType && total > 0 && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className={cn("text-muted-foreground", language === "bn" && "font-bengali")}>
                    {language === "bn" ? "নতুন মাসায়েল ডাউনলোড হচ্ছে" : "Downloading new masail"}
                  </span>
                  <span className="font-medium">{progress}/{total}</span>
                </div>
                <Progress value={progressPercent} className="h-1.5" />
              </div>
            )}

            {/* All Bundled Data */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Package className="h-3 w-3 text-emerald-600" />
                <span className={cn(language === "bn" && "font-bengali")}>
                  {language === "bn" ? "অন্তর্ভুক্ত (100% অফলাইন)" : "Built-in (100% offline)"}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex flex-col items-center p-2 rounded-md bg-emerald-500/10">
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">{formatNumber(verses)}</span>
                  <span className={cn("text-[10px] text-muted-foreground", language === "bn" && "font-bengali")}>
                    {language === "bn" ? "আয়াত" : "Verses"}
                  </span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-md bg-emerald-500/10">
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">{formatNumber(hadiths)}</span>
                  <span className={cn("text-[10px] text-muted-foreground", language === "bn" && "font-bengali")}>
                    {language === "bn" ? "হাদিস" : "Hadiths"}
                  </span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-md bg-emerald-500/10">
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">{formatNumber(duas)}</span>
                  <span className={cn("text-[10px] text-muted-foreground", language === "bn" && "font-bengali")}>
                    {language === "bn" ? "দোয়া" : "Duas"}
                  </span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-md bg-emerald-500/10">
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">{formatNumber(masail)}</span>
                  <span className={cn("text-[10px] text-muted-foreground", language === "bn" && "font-bengali")}>
                    {language === "bn" ? "মাসায়েল" : "Masail"}
                  </span>
                </div>
              </div>
            </div>

            {lastSyncTime && (
              <p className={cn("text-xs text-muted-foreground text-center", language === "bn" && "font-bengali")}>
                {language === "bn" ? "নতুন মাসায়েল চেক: " : "Last update check: "}
                {new Date(lastSyncTime).toLocaleDateString(language === "bn" ? "bn-BD" : "en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </p>
            )}

            {!isOnline && (
              <p className={cn("text-xs text-amber-600 dark:text-amber-400 text-center", language === "bn" && "font-bengali")}>
                {language === "bn" 
                  ? "আপনি অফলাইনে আছেন। সব ডেটা উপলব্ধ।" 
                  : "You're offline. All data is available."}
              </p>
            )}
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  // Full details view (for settings page)
  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isOnline ? (
            <Cloud className="h-5 w-5 text-primary" />
          ) : (
            <CloudOff className="h-5 w-5 text-muted-foreground" />
          )}
          <h3 className={cn("font-semibold", language === "bn" && "font-bengali")}>
            {language === "bn" ? "অফলাইন ডেটা" : "Offline Data"}
          </h3>
        </div>
        <div className={cn(
          "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs",
          isComplete 
            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
        )}>
          {isComplete ? (
            <>
              <Check className="h-3 w-3" />
              <span className={cn(language === "bn" && "font-bengali")}>
                {language === "bn" ? "সম্পূর্ণ" : "Complete"}
              </span>
            </>
          ) : isLoading ? (
            <>
              <Loader2 className="h-3 w-3 animate-spin" />
              <span className={cn(language === "bn" && "font-bengali")}>
                {language === "bn" ? "লোড হচ্ছে" : "Loading"}
              </span>
            </>
          ) : (
            <>
              <Download className="h-3 w-3" />
              <span className={cn(language === "bn" && "font-bengali")}>
                {language === "bn" ? "অসম্পূর্ণ" : "Incomplete"}
              </span>
            </>
          )}
        </div>
      </div>

      {isSyncing && currentType && total > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className={cn("text-muted-foreground", language === "bn" && "font-bengali")}>
              {language === "bn" ? "নতুন মাসায়েল ডাউনলোড হচ্ছে" : "Downloading new masail"}
            </span>
            <span className="font-medium">{progress}/{total}</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>
      )}

      {/* All Bundled Data */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Package className="h-4 w-4 text-emerald-600" />
          <span className={cn(language === "bn" && "font-bengali")}>
            {language === "bn" ? "অন্তর্ভুক্ত ডেটা (100% অফলাইন)" : "Built-in data (100% offline)"}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col items-center p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">{formatNumber(verses)}</span>
            <span className={cn("text-xs text-muted-foreground", language === "bn" && "font-bengali")}>
              {language === "bn" ? "কুরআনের আয়াত" : "Quran Verses"}
            </span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">{formatNumber(hadiths)}</span>
            <span className={cn("text-xs text-muted-foreground", language === "bn" && "font-bengali")}>
              {language === "bn" ? "হাদিস" : "Hadiths"}
            </span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">{formatNumber(duas)}</span>
            <span className={cn("text-xs text-muted-foreground", language === "bn" && "font-bengali")}>
              {language === "bn" ? "দোয়া সমূহ" : "Duas"}
            </span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">{formatNumber(masail)}</span>
            <span className={cn("text-xs text-muted-foreground", language === "bn" && "font-bengali")}>
              {language === "bn" ? "মাসায়েল" : "Masail"}
            </span>
          </div>
        </div>
      </div>

      <Button 
        className="w-full" 
        onClick={() => syncAll(true)}
        disabled={isSyncing || isLoading || !isOnline}
      >
        {isSyncing ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            <span className={cn(language === "bn" && "font-bengali")}>
              {language === "bn" ? "আপডেট হচ্ছে..." : "Updating..."}
            </span>
          </>
        ) : (
          <>
            <RefreshCw className="h-4 w-4 mr-2" />
            <span className={cn(language === "bn" && "font-bengali")}>
              {language === "bn" ? "নতুন মাসায়েল চেক করুন" : "Check for new masail"}
            </span>
          </>
        )}
      </Button>

      {lastSyncTime && (
        <p className={cn("text-xs text-muted-foreground text-center", language === "bn" && "font-bengali")}>
          {language === "bn" ? "সর্বশেষ আপডেট চেক: " : "Last update check: "}
          {new Date(lastSyncTime).toLocaleDateString(language === "bn" ? "bn-BD" : "en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          })}
        </p>
      )}
    </div>
  );
};
