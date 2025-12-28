import { useEffect } from "react";
import { ArrowLeft, Book, BookOpen, Heart, ExternalLink, Palette, Clock, Calendar, Sparkles, Moon, Code } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Language } from "@/types/language";

interface SourcesCreditsProps {
  language: Language;
}

const SourcesCredits = ({ language }: SourcesCreditsProps) => {
  const navigate = useNavigate();

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const prayerTimeSources = [
    {
      nameEn: "Islamic Foundation Bangladesh (IFB)",
      nameBn: "ইসলামিক ফাউন্ডেশন বাংলাদেশ",
      descriptionEn: "Prayer time calculation method for Bangladesh",
      descriptionBn: "বাংলাদেশের জন্য নামাজের সময় গণনা পদ্ধতি",
      url: "https://islamicfoundation.gov.bd",
    },
    {
      nameEn: "PrayTimes.org",
      nameBn: "প্রেয়টাইমস.অর্গ",
      descriptionEn: "Prayer time calculation algorithms",
      descriptionBn: "নামাজের সময় গণনার অ্যালগরিদম",
      url: "http://praytimes.org",
    },
  ];

  const islamicCalendarSources = [
    {
      nameEn: "Hijri Calendar API",
      nameBn: "হিজরি ক্যালেন্ডার এপিআই",
      descriptionEn: "Islamic date conversion and calendar data",
      descriptionBn: "ইসলামিক তারিখ রূপান্তর ও ক্যালেন্ডার ডেটা",
      url: "https://aladhan.com",
    },
  ];

  const namesOfAllahSources = [
    {
      nameEn: "99 Names of Allah",
      nameBn: "আল্লাহর ৯৯ নাম",
      descriptionEn: "Authentic names with meanings and benefits",
      descriptionBn: "অর্থ ও ফজিলত সহ প্রামাণিক নাম",
      url: "https://99namesofallah.name",
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
      nameEn: "Scheherazade New",
      nameBn: "শেহেরাজাদ নিউ",
      descriptionEn: "Arabic font for Quranic text",
      descriptionBn: "কুরআনিক টেক্সটের জন্য আরবি ফন্ট",
      url: "https://fonts.google.com/specimen/Scheherazade+New",
    },
    {
      nameEn: "Anek Bangla",
      nameBn: "অনেক বাংলা",
      descriptionEn: "Bengali UI and content font",
      descriptionBn: "বাংলা UI ও কন্টেন্ট ফন্ট",
      url: "https://fonts.google.com/specimen/Anek+Bangla",
    },
    {
      nameEn: "Lemon Milk Font",
      nameBn: "লেমন মিল্ক ফন্ট",
      descriptionEn: "App branding and UI typography",
      descriptionBn: "অ্যাপ ব্র্যান্ডিং ও UI টাইপোগ্রাফি",
      url: "https://www.dafont.com/lemon-milk.font",
    },
  ];

  const technologySources = [
    {
      nameEn: "React + Vite",
      nameBn: "রিয়াক্ট + ভাইট",
      descriptionEn: "Frontend framework and build tool",
      descriptionBn: "ফ্রন্টএন্ড ফ্রেমওয়ার্ক ও বিল্ড টুল",
      url: "https://react.dev",
    },
    {
      nameEn: "Tailwind CSS",
      nameBn: "টেইলউইন্ড সিএসএস",
      descriptionEn: "Utility-first CSS framework",
      descriptionBn: "ইউটিলিটি-ফার্স্ট সিএসএস ফ্রেমওয়ার্ক",
      url: "https://tailwindcss.com",
    },
    {
      nameEn: "Shadcn/UI",
      nameBn: "শ্যাডসিএন/ইউআই",
      descriptionEn: "Beautiful UI components",
      descriptionBn: "সুন্দর UI কম্পোনেন্ট",
      url: "https://ui.shadcn.com",
    },
    {
      nameEn: "Android Studio",
      nameBn: "অ্যান্ড্রয়েড স্টুডিও",
      descriptionEn: "Native Android app development IDE",
      descriptionBn: "নেটিভ অ্যান্ড্রয়েড অ্যাপ ডেভেলপমেন্ট আইডিই",
      url: "https://developer.android.com/studio",
    },
    {
      nameEn: "Xcode",
      nameBn: "এক্সকোড",
      descriptionEn: "Native iOS app development IDE",
      descriptionBn: "নেটিভ আইওএস অ্যাপ ডেভেলপমেন্ট আইডিই",
      url: "https://developer.apple.com/xcode",
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

  const developerCredits = [
    {
      nameEn: "An-Nur Digital",
      nameBn: "আন-নূর ডিজিটাল",
      descriptionEn: "App development and design",
      descriptionBn: "অ্যাপ ডেভেলপমেন্ট ও ডিজাইন",
      url: "https://annurdigital.com",
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
    <div className="min-h-screen bg-background pb-4">
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
        <div className="mx-auto max-w-2xl p-4 pb-4 space-y-6">
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

          {/* Dua & Hadith Sources */}
          <SourceSection 
            title="Dua & Hadith Sources" 
            titleBn="দোয়া ও হাদিসের উৎস" 
            icon={BookOpen} 
            sources={[...duaSources, ...hadithSources]} 
          />

          {/* Prayer Time Sources */}
          <SourceSection 
            title="Prayer Time Sources" 
            titleBn="নামাজের সময়ের উৎস" 
            icon={Clock} 
            sources={prayerTimeSources} 
          />

          {/* Islamic Calendar Sources */}
          <SourceSection 
            title="Islamic Calendar" 
            titleBn="ইসলামিক ক্যালেন্ডার" 
            icon={Calendar} 
            sources={islamicCalendarSources} 
          />

          {/* Names of Allah Sources */}
          <SourceSection 
            title="99 Names of Allah" 
            titleBn="আল্লাহর ৯৯ নাম" 
            icon={Sparkles} 
            sources={namesOfAllahSources} 
          />

          {/* Font Sources */}
          <SourceSection 
            title="Font Credits" 
            titleBn="ফন্ট ক্রেডিট" 
            icon={Book} 
            sources={fontSources} 
          />

          {/* Technology Stack */}
          <SourceSection 
            title="Technology Stack" 
            titleBn="প্রযুক্তি স্ট্যাক" 
            icon={Code} 
            sources={technologySources} 
          />

          {/* Logo Credits */}
          <SourceSection 
            title="Logo Credits" 
            titleBn="লোগো ক্রেডিট" 
            icon={Palette} 
            sources={logoCredits} 
          />

          {/* Developer Credits */}
          <SourceSection 
            title="Developed By" 
            titleBn="ডেভেলপার" 
            icon={Moon} 
            sources={developerCredits} 
          />

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
  );
};

export default SourcesCredits;
