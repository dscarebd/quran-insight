import { ArrowLeft, Book, BookOpen, Heart, ExternalLink, Palette, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { MobileNavFooter } from "@/components/MobileNavFooter";

interface SourcesCreditsProps {
  language: "bn" | "en";
}

const SourcesCredits = ({ language }: SourcesCreditsProps) => {
  const navigate = useNavigate();

  const quranSources = [
    {
      nameEn: "Quran.com API",
      nameBn: "কুরআন.কম এপিআই",
      descriptionEn: "Arabic text, translations, and verse data",
      descriptionBn: "আরবি টেক্সট, অনুবাদ এবং আয়াতের তথ্য",
      url: "https://quran.com",
    },
    {
      nameEn: "King Fahd Complex",
      nameBn: "কিং ফাহদ কমপ্লেক্স",
      descriptionEn: "Uthmani script and Quran printing standards",
      descriptionBn: "উসমানী স্ক্রিপ্ট এবং কুরআন মুদ্রণ মান",
      url: "https://qurancomplex.gov.sa",
    },
    {
      nameEn: "Tanzil.net",
      nameBn: "তানজিল.নেট",
      descriptionEn: "Quran text verification and resources",
      descriptionBn: "কুরআন টেক্সট যাচাই ও রিসোর্স",
      url: "https://tanzil.net",
    },
  ];

  const duaSources = [
    {
      nameEn: "Fortress of the Muslim (Hisnul Muslim)",
      nameBn: "হিসনুল মুসলিম",
      descriptionEn: "Authentic duas from Quran and Sunnah",
      descriptionBn: "কুরআন ও সুন্নাহ থেকে প্রামাণিক দোয়া",
      url: "https://sunnah.com",
    },
    {
      nameEn: "Sahih Bukhari",
      nameBn: "সহীহ বুখারী",
      descriptionEn: "Authentic hadith collection for duas",
      descriptionBn: "দোয়ার জন্য প্রামাণিক হাদিস সংকলন",
      url: "https://sunnah.com/bukhari",
    },
    {
      nameEn: "Sahih Muslim",
      nameBn: "সহীহ মুসলিম",
      descriptionEn: "Authentic hadith collection for duas",
      descriptionBn: "দোয়ার জন্য প্রামাণিক হাদিস সংকলন",
      url: "https://sunnah.com/muslim",
    },
    {
      nameEn: "Sunan Abu Dawud",
      nameBn: "সুনান আবু দাউদ",
      descriptionEn: "Hadith collection with daily life duas",
      descriptionBn: "দৈনন্দিন জীবনের দোয়া সহ হাদিস সংকলন",
      url: "https://sunnah.com/abudawud",
    },
    {
      nameEn: "Jami at-Tirmidhi",
      nameBn: "জামি তিরমিযী",
      descriptionEn: "Hadith collection with supplications",
      descriptionBn: "দোয়া সহ হাদিস সংকলন",
      url: "https://sunnah.com/tirmidhi",
    },
  ];

  const hadithSources = [
    {
      nameEn: "Sunnah.com",
      nameBn: "সুন্নাহ.কম",
      descriptionEn: "Primary source for hadith collections",
      descriptionBn: "হাদিস সংকলনের প্রাথমিক উৎস",
      url: "https://sunnah.com",
    },
    {
      nameEn: "IslamQA",
      nameBn: "ইসলামকিউএ",
      descriptionEn: "Hadith verification and references",
      descriptionBn: "হাদিস যাচাই ও রেফারেন্স",
      url: "https://islamqa.info",
    },
  ];

  const fontSources = [
    {
      nameEn: "Amiri Font",
      nameBn: "আমিরী ফন্ট",
      descriptionEn: "Classic Arabic calligraphy font",
      descriptionBn: "ক্লাসিক আরবি ক্যালিগ্রাফি ফন্ট",
      url: "https://www.amirifont.org",
    },
    {
      nameEn: "KFGQPC Uthmani Font",
      nameBn: "কেএফজিকিউপিসি উসমানী ফন্ট",
      descriptionEn: "Official Uthmani script font",
      descriptionBn: "অফিসিয়াল উসমানী স্ক্রিপ্ট ফন্ট",
      url: "https://fonts.qurancomplex.gov.sa",
    },
    {
      nameEn: "Lemon Milk Font",
      nameBn: "লেমন মিল্ক ফন্ট",
      descriptionEn: "App branding and UI typography",
      descriptionBn: "অ্যাপ ব্র্যান্ডিং ও UI টাইপোগ্রাফি",
      url: "https://www.dafont.com/lemon-milk.font",
    },
  ];

  const logoCredits = [
    {
      nameEn: "Logo Smith",
      nameBn: "লোগো স্মিথ",
      descriptionEn: "Logo design and branding",
      descriptionBn: "লোগো ডিজাইন ও ব্র্যান্ডিং",
      url: "https://www.behance.net/LogoSmithStudio",
    },
    {
      nameEn: "Abdulla Mohamed (Addhu)",
      nameBn: "আব্দুল্লাহ মোহাম্মদ (আদ্ধু)",
      descriptionEn: "Logo design and creative direction",
      descriptionBn: "লোগো ডিজাইন ও ক্রিয়েটিভ ডিরেকশন",
      url: "https://www.behance.net/addhu",
    },
  ];

  const SourceSection = ({ 
    title,
    titleBn, 
    icon: Icon, 
    sources 
  }: { 
    title: string; 
    titleBn: string; 
    icon: React.ComponentType<{ className?: string }>; 
    sources: typeof quranSources;
  }) => (
    <section className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="h-5 w-5 text-primary" />
        <h2 className={cn(
          "text-sm font-medium text-muted-foreground uppercase tracking-wider",
          language === "bn" && "font-bengali"
        )}>
          {language === "bn" ? titleBn : title}
        </h2>
      </div>
      <div className="space-y-2">
        {sources.map((source, index) => (
          <a
            key={index}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted/50"
          >
            <div className="flex-1">
              <h3 className={cn("text-sm font-semibold", language === "bn" && "font-bengali")}>
                {language === "bn" ? source.nameBn : source.nameEn}
              </h3>
              <p className={cn("text-xs text-muted-foreground mt-1", language === "bn" && "font-bengali")}>
                {language === "bn" ? source.descriptionBn : source.descriptionEn}
              </p>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </a>
        ))}
      </div>
    </section>
  );

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="flex items-center gap-3 px-4 py-3">
            <button
              onClick={() => navigate(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-muted/50 hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className={cn("text-lg font-semibold", language === "bn" && "font-bengali")}>
              {language === "bn" ? "সূত্র ও কৃতজ্ঞতা" : "Sources & Credits"}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-2xl p-4 pb-24 space-y-6">
          {/* Introduction */}
          <div className="rounded-xl border border-border bg-gradient-to-br from-primary/5 to-primary/10 p-4">
            <div className="flex items-start gap-3">
              <Heart className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className={cn("text-sm font-semibold mb-1", language === "bn" && "font-bengali")}>
                  {language === "bn" ? "কৃতজ্ঞতা স্বীকার" : "Acknowledgments"}
                </h3>
                <p className={cn("text-xs text-muted-foreground leading-relaxed", language === "bn" && "font-bengali")}>
                  {language === "bn" 
                    ? "এই অ্যাপে ব্যবহৃত সমস্ত কন্টেন্ট নিম্নলিখিত বিশ্বস্ত উৎস থেকে সংগ্রহ করা হয়েছে। আমরা তাদের অমূল্য অবদানের জন্য কৃতজ্ঞ।"
                    : "All content used in this app has been collected from the following trusted sources. We are grateful for their invaluable contributions."}
                </p>
              </div>
            </div>
          </div>

          {/* Quran Sources */}
          <SourceSection 
            title="Quran Sources" 
            titleBn="কুরআনের উৎস" 
            icon={Book} 
            sources={quranSources} 
          />

          {/* Dua Sources */}
          <SourceSection 
            title="Dua & Hadith Sources" 
            titleBn="দোয়া ও হাদিসের উৎস" 
            icon={BookOpen} 
            sources={[...duaSources, ...hadithSources]} 
          />

          {/* Font Sources */}
          <SourceSection 
            title="Font Credits" 
            titleBn="ফন্ট ক্রেডিট" 
            icon={Book} 
            sources={fontSources} 
          />

          {/* Logo Credits */}
          <section className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Palette className="h-5 w-5 text-primary" />
              <h2 className={cn(
                "text-sm font-medium text-muted-foreground uppercase tracking-wider",
                language === "bn" && "font-bengali"
              )}>
                {language === "bn" ? "লোগো ক্রেডিট" : "Logo Credits"}
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {logoCredits.map((credit, index) => {
                const CardWrapper = credit.url ? 'a' : 'div';
                const cardProps = credit.url ? {
                  href: credit.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                } : {};
                
                return (
                  <CardWrapper
                    key={index}
                    {...cardProps}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center",
                      credit.url && "hover:bg-muted/50 transition-colors cursor-pointer"
                    )}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className={cn("text-sm font-semibold", language === "bn" && "font-bengali")}>
                        {language === "bn" ? credit.nameBn : credit.nameEn}
                      </h3>
                      <p className={cn("text-xs text-muted-foreground mt-1", language === "bn" && "font-bengali")}>
                        {language === "bn" ? credit.descriptionBn : credit.descriptionEn}
                      </p>
                      {credit.url && (
                        <div className="flex items-center justify-center gap-1 mt-2 text-primary">
                          <ExternalLink className="h-3 w-3" />
                          <span className="text-xs">Behance</span>
                        </div>
                      )}
                    </div>
                  </CardWrapper>
                );
              })}
            </div>
          </section>

          {/* Disclaimer */}
          <div className="rounded-xl border border-border bg-muted/30 p-4">
            <p className={cn("text-xs text-muted-foreground leading-relaxed text-center", language === "bn" && "font-bengali")}>
              {language === "bn" 
                ? "এই অ্যাপটি শুধুমাত্র শিক্ষামূলক উদ্দেশ্যে তৈরি। সমস্ত কন্টেন্ট প্রামাণিক উৎস থেকে সংগ্রহ করা হয়েছে এবং সঠিকতা নিশ্চিত করার জন্য যাচাই করা হয়েছে।"
                : "This app is created for educational purposes only. All content has been collected from authentic sources and verified for accuracy."}
            </p>
          </div>
        </div>
      </div>
      <MobileNavFooter language={language} />
    </>
  );
};

export default SourcesCredits;
