import { Check, Volume2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Language } from "@/types/language";
import { reciters, Reciter } from "@/data/reciters";

interface ReciterSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedReciterId: string;
  onSelect: (reciterId: string) => void;
  language: Language;
}

export const ReciterSelector = ({
  open,
  onOpenChange,
  selectedReciterId,
  onSelect,
  language
}: ReciterSelectorProps) => {
  const handleSelect = (reciterId: string) => {
    onSelect(reciterId);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl">
        <SheetHeader className="pb-4">
          <SheetTitle className={cn("text-center", language === "bn" && "font-bengali")}>
            {language === "bn" ? "ক্বারী নির্বাচন করুন" : "Select Reciter"}
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(70vh-80px)]">
          <div className="space-y-2 pr-4">
            {reciters.map((reciter) => (
              <button
                key={reciter.id}
                onClick={() => handleSelect(reciter.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors",
                  selectedReciterId === reciter.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                )}
              >
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full",
                  selectedReciterId === reciter.id
                    ? "bg-primary-foreground/20"
                    : "bg-primary/10"
                )}>
                  <Volume2 className={cn(
                    "h-5 w-5",
                    selectedReciterId === reciter.id
                      ? "text-primary-foreground"
                      : "text-primary"
                  )} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className={cn(
                    "font-medium truncate",
                    language === "bn" && "font-bengali"
                  )}>
                    {language === "bn" ? reciter.nameBengali : reciter.nameEnglish}
                  </div>
                  <div className={cn(
                    "text-sm truncate",
                    selectedReciterId === reciter.id
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground"
                  )}>
                    <span className="font-arabic text-xs">{reciter.nameArabic}</span>
                    <span className="mx-1">•</span>
                    <span className={language === "bn" ? "font-bengali" : ""}>
                      {language === "bn" ? reciter.styleBengali : reciter.style}
                    </span>
                  </div>
                </div>

                {selectedReciterId === reciter.id && (
                  <Check className="h-5 w-5 text-primary-foreground" />
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
