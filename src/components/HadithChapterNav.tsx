import { useState } from "react";
import { ChevronDown, BookOpen } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import { Language } from "@/types/language";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface Chapter {
  chapter_number: number;
  chapter_name_english: string | null;
  chapter_name_bengali: string | null;
  hadith_count: number;
}

interface HadithChapterNavProps {
  chapters: Chapter[];
  selectedChapter: number | null;
  onSelectChapter: (chapterNumber: number | null) => void;
  language: Language;
}

const HadithChapterNav = ({
  chapters,
  selectedChapter,
  onSelectChapter,
  language,
}: HadithChapterNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedChapterData = chapters.find(
    (c) => c.chapter_number === selectedChapter
  );

  const handleSelect = (chapterNumber: number | null) => {
    onSelectChapter(chapterNumber);
    setIsOpen(false);
  };

  if (chapters.length === 0) {
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 max-w-[200px] sm:max-w-[300px]"
        >
          <BookOpen className="h-4 w-4 shrink-0" />
          <span className={cn("truncate", language === "bn" && "font-bengali")}>
            {selectedChapter !== null
              ? language === "bn"
                ? selectedChapterData?.chapter_name_bengali ||
                  selectedChapterData?.chapter_name_english ||
                  `${"অধ্যায়"} ${formatNumber(selectedChapter, language)}`
                : selectedChapterData?.chapter_name_english ||
                  selectedChapterData?.chapter_name_bengali ||
                  `${"Chapter"} ${formatNumber(selectedChapter, language)}`
              : language === "bn"
              ? "সব অধ্যায়"
              : "All Chapters"}
          </span>
          <ChevronDown className="h-4 w-4 shrink-0" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[70vh]">
        <SheetHeader>
          <SheetTitle className={cn(language === "bn" && "font-bengali")}>
            {language === "bn" ? "অধ্যায় নির্বাচন করুন" : "Select Chapter"}
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-full mt-4 -mx-6 px-6">
          <div className="space-y-1 pb-8">
            {/* All Chapters option */}
            <button
              onClick={() => handleSelect(null)}
              className={cn(
                "w-full text-left px-4 py-3 rounded-lg transition-colors",
                "hover:bg-accent",
                selectedChapter === null && "bg-primary/10 text-primary"
              )}
            >
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "font-medium",
                    language === "bn" && "font-bengali"
                  )}
                >
                  {language === "bn" ? "সব অধ্যায়" : "All Chapters"}
                </span>
                <Badge variant="secondary" className="text-xs">
                  {formatNumber(
                    chapters.reduce((sum, c) => sum + c.hadith_count, 0),
                    language
                  )}
                </Badge>
              </div>
            </button>

            {/* Chapter list */}
            {chapters.map((chapter) => (
              <button
                key={chapter.chapter_number}
                onClick={() => handleSelect(chapter.chapter_number)}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-lg transition-colors",
                  "hover:bg-accent",
                  selectedChapter === chapter.chapter_number &&
                    "bg-primary/10 text-primary"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "text-sm text-muted-foreground",
                          language === "bn" && "font-bengali"
                        )}
                      >
                        {formatNumber(chapter.chapter_number, language)}.
                      </span>
                      <span
                        className={cn(
                          "font-medium truncate",
                          language === "bn" && "font-bengali"
                        )}
                      >
                      {language === "bn"
                          ? chapter.chapter_name_bengali ||
                            chapter.chapter_name_english ||
                            `${"অধ্যায়"} ${formatNumber(chapter.chapter_number, language)}`
                          : chapter.chapter_name_english ||
                            chapter.chapter_name_bengali ||
                            `${"Chapter"} ${formatNumber(chapter.chapter_number, language)}`}
                      </span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs shrink-0">
                    {formatNumber(chapter.hadith_count, language)}
                  </Badge>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default HadithChapterNav;