import { useEffect } from "react";
import { ArrowLeft, User, Heart, Star, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { MobileNavFooter } from "@/components/MobileNavFooter";
import { Language } from "@/types/language";
import appLogo from "@/assets/app-logo.png";

interface OwnerProps {
  language: Language;
}

const Owner = ({ language }: OwnerProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const ownerDetails = {
    name: language === "bn" ? "আব্দুল্লাহ" : "Abdullah",
    role: language === "bn" ? "প্রতিষ্ঠাতা ও ডেভেলপার" : "Founder & Developer",
    bio: language === "bn" 
      ? "কুরআন ইনসাইট অ্যাপটি মুসলিম উম্মাহর জন্য তৈরি করা হয়েছে, যাতে সবাই সহজে কুরআন, হাদিস ও দোয়া পড়তে ও বুঝতে পারে।"
      : "Quran Insight app is created for the Muslim Ummah, to help everyone easily read and understand the Quran, Hadith, and Duas.",
  };

  const features = [
    {
      icon: BookOpen,
      titleBn: "কুরআন পড়ুন",
      titleEn: "Read Quran",
      descBn: "আরবি, বাংলা অনুবাদ ও তাফসির সহ",
      descEn: "With Arabic, Bengali translation & Tafsir",
    },
    {
      icon: Star,
      titleBn: "হাদিস সংগ্রহ",
      titleEn: "Hadith Collection",
      descBn: "সহিহ হাদিস সংকলন",
      descEn: "Authentic Hadith compilations",
    },
    {
      icon: Heart,
      titleBn: "দৈনিক দোয়া",
      titleEn: "Daily Duas",
      descBn: "প্রতিদিনের প্রয়োজনীয় দোয়া",
      descEn: "Essential daily prayers",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-background pb-24">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
          <div className="flex items-center gap-3 px-4 py-3">
            <button
              onClick={() => navigate(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className={cn("text-lg font-semibold", language === "bn" && "font-bengali")}>
              {language === "bn" ? "মালিকের তথ্য" : "Owner Details"}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-2xl p-4 space-y-6">
          {/* Owner Card */}
          <section>
            <div className="rounded-xl border border-border bg-gradient-to-br from-primary/5 to-primary/10 overflow-hidden">
              <div className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <img 
                    src={appLogo} 
                    alt="Owner" 
                    className="h-24 w-24 rounded-full object-cover border-4 border-primary/20 shadow-lg"
                  />
                </div>
                <h2 className={cn("text-xl font-bold", language === "bn" && "font-bengali")}>
                  {ownerDetails.name}
                </h2>
                <p className={cn("text-sm text-primary font-medium mt-1", language === "bn" && "font-bengali")}>
                  {ownerDetails.role}
                </p>
                <p className={cn("text-sm text-muted-foreground mt-3 leading-relaxed", language === "bn" && "font-bengali")}>
                  {ownerDetails.bio}
                </p>
              </div>
            </div>
          </section>

          {/* Mission */}
          <section>
            <h2 className={cn(
              "mb-3 text-base font-medium text-muted-foreground uppercase tracking-wider",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? "আমাদের লক্ষ্য" : "Our Mission"}
            </h2>
            <div className="rounded-xl border border-border bg-card p-4">
              <p className={cn("text-sm text-muted-foreground leading-relaxed", language === "bn" && "font-bengali")}>
                {language === "bn" 
                  ? "কুরআন ইনসাইট একটি বিনামূল্যের অ্যাপ যা মুসলিমদের কুরআন, হাদিস ও দোয়া সহজে অধ্যয়ন করতে সাহায্য করে। আমাদের লক্ষ্য হল ইসলামী জ্ঞানকে সবার কাছে সহজলভ্য করা।"
                  : "Quran Insight is a free app that helps Muslims easily study the Quran, Hadith, and Duas. Our mission is to make Islamic knowledge accessible to everyone."
                }
              </p>
            </div>
          </section>

          {/* Features */}
          <section>
            <h2 className={cn(
              "mb-3 text-base font-medium text-muted-foreground uppercase tracking-wider",
              language === "bn" && "font-bengali"
            )}>
              {language === "bn" ? "বৈশিষ্ট্যসমূহ" : "Features"}
            </h2>
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="rounded-xl border border-border bg-card p-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 shrink-0">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className={cn("text-base font-semibold", language === "bn" && "font-bengali")}>
                        {language === "bn" ? feature.titleBn : feature.titleEn}
                      </h3>
                      <p className={cn("text-sm text-muted-foreground mt-0.5", language === "bn" && "font-bengali")}>
                        {language === "bn" ? feature.descBn : feature.descEn}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Thank You */}
          <section>
            <div className="rounded-xl border border-border bg-gradient-to-br from-primary/5 to-primary/10 p-6 text-center">
              <Heart className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className={cn("text-lg font-semibold", language === "bn" && "font-bengali")}>
                {language === "bn" ? "জাযাকাল্লাহু খাইরান" : "JazakAllahu Khairan"}
              </h3>
              <p className={cn("text-sm text-muted-foreground mt-2", language === "bn" && "font-bengali")}>
                {language === "bn" 
                  ? "অ্যাপটি ব্যবহার করার জন্য ধন্যবাদ। আপনার দোয়া কামনা করছি।"
                  : "Thank you for using the app. Please remember us in your prayers."
                }
              </p>
            </div>
          </section>
        </div>
      </div>
      <MobileNavFooter language={language} />
    </>
  );
};

export default Owner;
