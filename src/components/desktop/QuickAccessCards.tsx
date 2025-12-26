import { useNavigate } from "react-router-dom";
import { Book, BookOpen, HandHeart, Bookmark } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import { surahs } from "@/data/surahs";
import { paras } from "@/data/paras";

interface QuickAccessCardsProps {
  language: "bn" | "en";
}

const quickLinks = [
  {
    id: "surah",
    icon: Book,
    labelEn: "Browse Surahs",
    labelBn: "সূরা দেখুন",
    descEn: "114 chapters of the Holy Quran",
    descBn: "পবিত্র কুরআনের ১১৪টি সূরা",
    path: "/surah/1",
    gradient: "from-emerald-500 to-teal-600",
    count: 114,
  },
  {
    id: "para",
    icon: BookOpen,
    labelEn: "Browse Paras",
    labelBn: "পারা দেখুন",
    descEn: "30 Juz for easy reading",
    descBn: "সহজ পড়ার জন্য ৩০টি পারা",
    path: "/para/1",
    gradient: "from-blue-500 to-indigo-600",
    count: 30,
  },
  {
    id: "dua",
    icon: HandHeart,
    labelEn: "Daily Duas",
    labelBn: "দৈনিক দোয়া",
    descEn: "Authentic prayers and supplications",
    descBn: "প্রামাণিক দোয়া ও মোনাজাত",
    path: "/dua",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    id: "bookmarks",
    icon: Bookmark,
    labelEn: "My Bookmarks",
    labelBn: "আমার বুকমার্ক",
    descEn: "Your saved verses and duas",
    descBn: "আপনার সংরক্ষিত আয়াত ও দোয়া",
    path: "/bookmarks",
    gradient: "from-rose-500 to-pink-600",
  },
];

export const QuickAccessCards = ({ language }: QuickAccessCardsProps) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {quickLinks.map((link) => {
        const Icon = link.icon;
        return (
          <button
            key={link.id}
            onClick={() => navigate(link.path)}
            className="group relative overflow-hidden rounded-2xl bg-card border border-border p-5 text-left transition-all duration-300 hover:shadow-elevated hover:-translate-y-1"
          >
            {/* Gradient overlay on hover */}
            <div className={cn(
              "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br",
              link.gradient
            )} />
            
            {/* Icon */}
            <div className={cn(
              "mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md transition-transform group-hover:scale-110",
              link.gradient
            )}>
              <Icon className="h-6 w-6" />
            </div>
            
            {/* Content */}
            <h3 className={cn(
              "font-semibold text-foreground mb-1",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? link.labelBn : link.labelEn}
            </h3>
            <p className={cn(
              "text-sm text-muted-foreground line-clamp-2",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? link.descBn : link.descEn}
            </p>
            
            {/* Count badge */}
            {link.count && (
              <span className={cn(
                "absolute top-4 right-4 text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full",
                language === "bn" && "font-bengali"
              )}>
                {formatNumber(link.count, language)}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
