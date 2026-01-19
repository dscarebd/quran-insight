import { useState } from "react";
import { Moon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Language } from "@/types/language";
import { SleepTimerDuration, SLEEP_TIMER_OPTIONS } from "@/hooks/useSleepTimer";

interface SleepTimerButtonProps {
  isActive: boolean;
  duration: SleepTimerDuration;
  formattedTime: string;
  language: Language;
  onSelectDuration: (minutes: SleepTimerDuration) => void;
  onCancel: () => void;
}

export const SleepTimerButton = ({
  isActive,
  duration,
  formattedTime,
  language,
  onSelectDuration,
  onCancel,
}: SleepTimerButtonProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (minutes: SleepTimerDuration) => {
    onSelectDuration(minutes);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-8 px-2 gap-1.5 text-xs font-medium",
            isActive ? "text-primary" : "text-muted-foreground"
          )}
        >
          <Moon className="h-3.5 w-3.5" />
          {isActive ? (
            <span className="tabular-nums">{formattedTime}</span>
          ) : (
            <span className="hidden sm:inline">
              {language === "bn" ? "টাইমার" : "Timer"}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2" align="end" side="top">
        <div className="space-y-1">
          <p className={cn(
            "text-xs font-medium text-muted-foreground px-2 py-1",
            language === "bn" && "font-bengali"
          )}>
            {language === "bn" ? "স্লিপ টাইমার" : "Sleep Timer"}
          </p>
          
          {SLEEP_TIMER_OPTIONS.map((option) => (
            <Button
              key={option.value}
              variant={isActive && duration === option.value ? "default" : "ghost"}
              size="sm"
              className={cn(
                "w-full justify-start text-sm",
                language === "bn" && "font-bengali"
              )}
              onClick={() => handleSelect(option.value)}
            >
              {language === "bn" ? option.labelBn : option.label}
            </Button>
          ))}
          
          {isActive && (
            <>
              <div className="border-t border-border my-1" />
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "w-full justify-start text-sm text-destructive hover:text-destructive",
                  language === "bn" && "font-bengali"
                )}
                onClick={() => {
                  onCancel();
                  setOpen(false);
                }}
              >
                <X className="h-3.5 w-3.5 mr-2" />
                {language === "bn" ? "বাতিল করুন" : "Cancel Timer"}
              </Button>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
