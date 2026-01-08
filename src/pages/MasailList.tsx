import { Scale } from "lucide-react";
import { Language } from "@/types/language";
import { cn } from "@/lib/utils";

interface MasailListProps {
  language: Language;
}

const MasailList = ({ language }: MasailListProps) => {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
            <Scale className="h-6 w-6" />
          </div>
          <div>
            <h1 className={cn(
              "text-2xl font-bold text-foreground",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? "মাসআলা" : "Masail"}
            </h1>
            <p className={cn(
              "text-sm text-muted-foreground",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? "ইসলামিক মাসআলা ও ফতোয়া" : "Islamic Rulings & Fatwas"}
            </p>
          </div>
        </div>

        {/* Coming Soon Placeholder */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-12 text-center">
          <Scale className="mb-4 h-16 w-16 text-muted-foreground/50" />
          <h2 className={cn(
            "text-xl font-semibold text-foreground mb-2",
            language === "bn" && "font-bengali"
          )}>
            {language === "bn" ? "শীঘ্রই আসছে" : "Coming Soon"}
          </h2>
          <p className={cn(
            "text-muted-foreground max-w-md",
            language === "bn" && "font-bengali"
          )}>
            {language === "bn" 
              ? "ইসলামিক মাসআলা ও ফতোয়া সংগ্রহ করা হচ্ছে। অনুগ্রহ করে অপেক্ষা করুন।"
              : "Islamic rulings and fatwas are being collected. Please check back soon."
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default MasailList;
