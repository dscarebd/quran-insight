import { useState } from "react";
import { Copy, Check, HandHeart } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Language } from "@/types/language";
import { Button } from "@/components/ui/button";

interface DailyDuaPageProps {
  language: Language;
  arabicFont?: "amiri" | "uthmani";
}

interface DailyDuaItem {
  id: string;
  titleBn: string;
  titleEn: string;
  arabic: string;
  bengali: string;
  english: string;
  transliteration?: string;
  transliterationBn?: string;
  referenceBn?: string;
  referenceEn?: string;
}

const allDuas: DailyDuaItem[] = [
  {
    id: "before-sleep",
    titleBn: "ঘুমানোর আগে",
    titleEn: "Before Sleeping",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    bengali: "হে আল্লাহ! তোমার নামেই মৃত্যুবরণ করি এবং জীবিত হই।",
    english: "In Your name, O Allah, I die and I live.",
    transliteration: "Bismika Allahumma amutu wa ahya",
    transliterationBn: "বিসমিকা আল্লাহুম্মা আমুতু ওয়া আহইয়া",
    referenceBn: "সহীহ বুখারী",
    referenceEn: "Sahih Bukhari"
  },
  {
    id: "after-waking",
    titleBn: "ঘুম থেকে জাগার পর",
    titleEn: "After Waking Up",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    bengali: "সমস্ত প্রশংসা আল্লাহর জন্য, যিনি আমাদের মৃত্যুর পর জীবিত করেছেন এবং তাঁর কাছেই আমাদের ফিরে যেতে হবে।",
    english: "All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.",
    transliteration: "Alhamdu lillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur",
    transliterationBn: "আলহামদু লিল্লাহিল্লাযী আহইয়ানা বা'দা মা আমাতানা ওয়া ইলাইহিন নুশুর",
    referenceBn: "সহীহ বুখারী",
    referenceEn: "Sahih Bukhari"
  },
  {
    id: "before-eating",
    titleBn: "খাওয়ার আগে",
    titleEn: "Before Eating",
    arabic: "بِسْمِ اللَّهِ",
    bengali: "আল্লাহর নামে শুরু করছি।",
    english: "In the name of Allah.",
    transliteration: "Bismillah",
    transliterationBn: "বিসমিল্লাহ",
    referenceBn: "সহীহ মুসলিম",
    referenceEn: "Sahih Muslim"
  },
  {
    id: "after-eating",
    titleBn: "খাওয়ার পর",
    titleEn: "After Eating",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
    bengali: "সমস্ত প্রশংসা আল্লাহর জন্য, যিনি আমাদের খাওয়ালেন, পান করালেন এবং আমাদের মুসলিম বানালেন।",
    english: "All praise is for Allah who fed us, gave us drink, and made us Muslims.",
    transliteration: "Alhamdu lillahil-ladhi at'amana wa saqana wa ja'alana muslimin",
    transliterationBn: "আলহামদু লিল্লাহিল্লাযী আত'আমানা ওয়া সাক্বানা ওয়া জা'আলানা মুসলিমীন",
    referenceBn: "তিরমিযী",
    referenceEn: "Tirmidhi"
  },
  {
    id: "entering-mosque",
    titleBn: "মসজিদে প্রবেশের সময়",
    titleEn: "Entering the Mosque",
    arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    bengali: "হে আল্লাহ! আমার জন্য তোমার রহমতের দরজাগুলো খুলে দাও।",
    english: "O Allah, open for me the gates of Your mercy.",
    transliteration: "Allahumma-ftah li abwaba rahmatik",
    transliterationBn: "আল্লাহুম্মাফতাহ লী আবওয়াবা রাহমাতিক",
    referenceBn: "সহীহ মুসলিম",
    referenceEn: "Sahih Muslim"
  },
  {
    id: "leaving-mosque",
    titleBn: "মসজিদ থেকে বের হওয়ার সময়",
    titleEn: "Leaving the Mosque",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
    bengali: "হে আল্লাহ! আমি তোমার অনুগ্রহ প্রার্থনা করছি।",
    english: "O Allah, I ask You from Your bounty.",
    transliteration: "Allahumma inni as'aluka min fadlik",
    transliterationBn: "আল্লাহুম্মা ইন্নী আসআলুকা মিন ফাদলিক",
    referenceBn: "সহীহ মুসলিম",
    referenceEn: "Sahih Muslim"
  },
  {
    id: "after-salah",
    titleBn: "নামাযের পর",
    titleEn: "After Salah",
    arabic: "أَسْتَغْفِرُ اللَّهَ، أَسْتَغْفِرُ اللَّهَ، أَسْتَغْفِرُ اللَّهَ",
    bengali: "আমি আল্লাহর কাছে ক্ষমা চাই। (তিনবার)",
    english: "I seek forgiveness from Allah. (3 times)",
    transliteration: "Astaghfirullah, Astaghfirullah, Astaghfirullah",
    transliterationBn: "আস্তাগফিরুল্লাহ, আস্তাগফিরুল্লাহ, আস্তাগফিরুল্লাহ",
    referenceBn: "সহীহ মুসলিম",
    referenceEn: "Sahih Muslim"
  },
  {
    id: "after-salah-2",
    titleBn: "নামাযের পর তাসবীহ",
    titleEn: "Tasbeeh After Salah",
    arabic: "سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَاللَّهُ أَكْبَرُ",
    bengali: "আল্লাহ পবিত্র, সমস্ত প্রশংসা আল্লাহর এবং আল্লাহ সবচেয়ে বড়। (৩৩ বার করে)",
    english: "Glory be to Allah, All praise is for Allah, and Allah is the Greatest. (33 times each)",
    transliteration: "SubhanAllah, Alhamdulillah, Allahu Akbar",
    transliterationBn: "সুবহানাল্লাহ, আলহামদুলিল্লাহ, আল্লাহু আকবার",
    referenceBn: "সহীহ মুসলিম",
    referenceEn: "Sahih Muslim"
  },
  {
    id: "morning",
    titleBn: "সকালের দোয়া",
    titleEn: "Morning Dua",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    bengali: "আমরা সকালে উপনীত হলাম এবং সকল রাজত্ব আল্লাহর জন্য, যিনি সমস্ত জগতের প্রতিপালক।",
    english: "We have reached the morning and the kingdom belongs to Allah, the Lord of all worlds.",
    transliteration: "Asbahna wa asbahal-mulku lillahi Rabbil-'alamin",
    transliterationBn: "আসবাহনা ওয়া আসবাহাল মুলকু লিল্লাহি রাব্বিল আলামীন",
    referenceBn: "আবু দাউদ",
    referenceEn: "Abu Dawud"
  },
  {
    id: "evening",
    titleBn: "সন্ধ্যার দোয়া",
    titleEn: "Evening Dua",
    arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    bengali: "আমরা সন্ধ্যায় উপনীত হলাম এবং সকল রাজত্ব আল্লাহর জন্য, যিনি সমস্ত জগতের প্রতিপালক।",
    english: "We have reached the evening and the kingdom belongs to Allah, the Lord of all worlds.",
    transliteration: "Amsayna wa amsal-mulku lillahi Rabbil-'alamin",
    transliterationBn: "আমসাইনা ওয়া আমসাল মুলকু লিল্লাহি রাব্বিল আলামীন",
    referenceBn: "আবু দাউদ",
    referenceEn: "Abu Dawud"
  },
  {
    id: "entering-home",
    titleBn: "ঘরে প্রবেশের সময়",
    titleEn: "Entering Home",
    arabic: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا",
    bengali: "আল্লাহর নামে আমরা প্রবেশ করলাম, আল্লাহর নামে আমরা বের হলাম এবং আমাদের প্রতিপালক আল্লাহর উপর আমরা ভরসা করলাম।",
    english: "In the name of Allah we enter, in the name of Allah we leave, and upon our Lord we rely.",
    transliteration: "Bismillahi walajna, wa bismillahi kharajna, wa 'ala Allahi rabbina tawakkalna",
    transliterationBn: "বিসমিল্লাহি ওয়ালাজনা, ওয়া বিসমিল্লাহি খারাজনা, ওয়া আলা আল্লাহি রাব্বিনা তাওয়াক্কালনা",
    referenceBn: "আবু দাউদ",
    referenceEn: "Abu Dawud"
  },
  {
    id: "leaving-home",
    titleBn: "ঘর থেকে বের হওয়ার সময়",
    titleEn: "Leaving Home",
    arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    bengali: "আল্লাহর নামে, আমি আল্লাহর উপর ভরসা করলাম। আল্লাহর সাহায্য ছাড়া কোন শক্তি ও ক্ষমতা নেই।",
    english: "In the name of Allah, I place my trust in Allah. There is no might or power except with Allah.",
    transliteration: "Bismillahi tawakkaltu 'alallahi la hawla wa la quwwata illa billah",
    transliterationBn: "বিসমিল্লাহি তাওয়াক্কালতু আলাল্লাহি লা হাওলা ওয়া লা কুওয়াতা ইল্লা বিল্লাহ",
    referenceBn: "তিরমিযী",
    referenceEn: "Tirmidhi"
  },
  {
    id: "starting-journey",
    titleBn: "সফর শুরুর দোয়া",
    titleEn: "Starting a Journey",
    arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ",
    bengali: "পবিত্র সেই সত্তা যিনি এটি আমাদের অধীন করে দিয়েছেন, আমরা এর সামর্থ্য রাখতাম না। আমাদের অবশ্যই আমাদের প্রতিপালকের কাছে ফিরে যেতে হবে।",
    english: "Glory to Him who has subjected this to us, and we could never have it. And indeed, to our Lord we will return.",
    transliteration: "Subhanal-ladhi sakh-khara lana hadha wa ma kunna lahu muqrinin wa inna ila Rabbina lamunqalibun",
    transliterationBn: "সুবহানাল্লাযী সাখ্খারা লানা হাযা ওয়া মা কুন্না লাহু মুক্বরিনীন ওয়া ইন্না ইলা রাব্বিনা লামুনক্বালিবূন",
    referenceBn: "সূরা যুখরুফ ৪৩:১৩-১৪",
    referenceEn: "Surah Az-Zukhruf 43:13-14"
  },
  {
    id: "before-wudu",
    titleBn: "অযু শুরুর আগে",
    titleEn: "Before Wudu",
    arabic: "بِسْمِ اللَّهِ",
    bengali: "আল্লাহর নামে শুরু করছি।",
    english: "In the name of Allah.",
    transliteration: "Bismillah",
    transliterationBn: "বিসমিল্লাহ",
    referenceBn: "তিরমিযী",
    referenceEn: "Tirmidhi"
  },
  {
    id: "after-wudu",
    titleBn: "অযু শেষে",
    titleEn: "After Wudu",
    arabic: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
    bengali: "আমি সাক্ষ্য দিচ্ছি যে, আল্লাহ ছাড়া কোন উপাস্য নেই, তিনি একক, তাঁর কোন শরীক নেই এবং আমি সাক্ষ্য দিচ্ছি যে, মুহাম্মাদ তাঁর বান্দা ও রাসূল।",
    english: "I bear witness that there is no god but Allah alone, with no partner, and I bear witness that Muhammad is His servant and Messenger.",
    transliteration: "Ash-hadu an la ilaha illallahu wahdahu la sharika lahu wa ash-hadu anna Muhammadan 'abduhu wa rasuluh",
    transliterationBn: "আশহাদু আন লা ইলাহা ইল্লাল্লাহু ওয়াহদাহু লা শারীকা লাহু ওয়া আশহাদু আন্না মুহাম্মাদান আবদুহু ওয়া রাসূলুহ",
    referenceBn: "সহীহ মুসলিম",
    referenceEn: "Sahih Muslim"
  },
  {
    id: "wearing-new-clothes",
    titleBn: "নতুন পোশাক পরার সময়",
    titleEn: "Wearing New Clothes",
    arabic: "اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ كَسَوْتَنِيهِ، أَسْأَلُكَ خَيْرَهُ وَخَيْرَ مَا صُنِعَ لَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّهِ وَشَرِّ مَا صُنِعَ لَهُ",
    bengali: "হে আল্লাহ! তোমার জন্য সমস্ত প্রশংসা, তুমি আমাকে এটি পরিয়েছ। আমি তোমার কাছে এর কল্যাণ এবং যে উদ্দেশ্যে এটি তৈরি হয়েছে তার কল্যাণ চাই এবং এর অকল্যাণ ও যে উদ্দেশ্যে এটি তৈরি হয়েছে তার অকল্যাণ থেকে আশ্রয় চাই।",
    english: "O Allah, for You is all praise, You have clothed me with it. I ask You for its goodness and the goodness for which it was made, and I seek refuge in You from its evil and the evil for which it was made.",
    transliteration: "Allahumma lakal-hamdu anta kasawtaneehi, as'aluka khayrahu wa khayra ma suni'a lahu, wa a'udhu bika min sharrihi wa sharri ma suni'a lah",
    transliterationBn: "আল্লাহুম্মা লাকাল হামদু আনতা কাসাওতানীহি, আসআলুকা খাইরাহু ওয়া খাইরা মা সুনিআ লাহু, ওয়া আউযু বিকা মিন শাররিহি ওয়া শাররি মা সুনিআ লাহ",
    referenceBn: "তিরমিযী",
    referenceEn: "Tirmidhi"
  },
  {
    id: "entering-bathroom",
    titleBn: "বাথরুমে প্রবেশের সময়",
    titleEn: "Entering the Bathroom",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
    bengali: "হে আল্লাহ! আমি তোমার কাছে পুরুষ ও মহিলা শয়তান থেকে আশ্রয় চাই।",
    english: "O Allah, I seek refuge in You from male and female evil spirits.",
    transliteration: "Allahumma inni a'udhu bika minal-khubuthi wal-khaba'ith",
    transliterationBn: "আল্লাহুম্মা ইন্নী আউযু বিকা মিনাল খুবুসি ওয়াল খাবাইস",
    referenceBn: "সহীহ বুখারী",
    referenceEn: "Sahih Bukhari"
  },
  {
    id: "leaving-bathroom",
    titleBn: "বাথরুম থেকে বের হওয়ার সময়",
    titleEn: "Leaving the Bathroom",
    arabic: "غُفْرَانَكَ",
    bengali: "হে আল্লাহ! তোমার ক্ষমা চাই।",
    english: "I seek Your forgiveness.",
    transliteration: "Ghufranaka",
    transliterationBn: "গুফরানাকা",
    referenceBn: "তিরমিযী",
    referenceEn: "Tirmidhi"
  },
  {
    id: "before-drinking-water",
    titleBn: "পানি পান করার আগে",
    titleEn: "Before Drinking Water",
    arabic: "بِسْمِ اللَّهِ",
    bengali: "আল্লাহর নামে শুরু করছি।",
    english: "In the name of Allah.",
    transliteration: "Bismillah",
    transliterationBn: "বিসমিল্লাহ",
    referenceBn: "সহীহ মুসলিম",
    referenceEn: "Sahih Muslim"
  },
  {
    id: "after-drinking-water",
    titleBn: "পানি পান করার পর",
    titleEn: "After Drinking Water",
    arabic: "الْحَمْدُ لِلَّهِ",
    bengali: "সমস্ত প্রশংসা আল্লাহর জন্য।",
    english: "All praise is for Allah.",
    transliteration: "Alhamdulillah",
    transliterationBn: "আলহামদুলিল্লাহ",
    referenceBn: "তিরমিযী",
    referenceEn: "Tirmidhi"
  }
];

const DailyDuaPage = ({ language, arabicFont = "amiri" }: DailyDuaPageProps) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (dua: DailyDuaItem) => {
    const translitText = language === "bn" ? dua.transliterationBn : dua.transliteration;
    const refText = language === "bn" ? dua.referenceBn : dua.referenceEn;
    const textToCopy = `${dua.arabic}\n\n${translitText ? translitText + "\n\n" : ""}${language === "bn" ? dua.bengali : dua.english}${refText ? `\n\n(${refText})` : ""}`;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedId(dua.id);
      toast.success(language === "bn" ? "কপি করা হয়েছে" : "Copied to clipboard");
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.error(language === "bn" ? "কপি করতে ব্যর্থ" : "Failed to copy");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-4">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shrink-0">
              <HandHeart className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <h1 className={cn(
                "text-xl font-bold text-foreground",
                language === "bn" && "font-bengali"
              )}>
                {language === "bn" ? "দৈনিক দোয়া" : "Daily Duas"}
              </h1>
              <p className={cn(
                "text-sm text-muted-foreground",
                language === "bn" && "font-bengali"
              )}>
                {language === "bn" ? `${allDuas.length}টি দোয়া` : `${allDuas.length} duas`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {allDuas.map((dua, index) => (
            <div
              key={dua.id}
              className="relative rounded-2xl bg-card border border-border p-5 transition-all hover:shadow-md"
            >
              {/* Serial Number */}
              <span className="absolute left-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                {index + 1}
              </span>

              {/* Copy Button */}
              <button
                onClick={() => handleCopy(dua)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all hover:bg-primary hover:text-primary-foreground"
              >
                {copiedId === dua.id ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>

              {/* Title */}
              <h3 className={cn(
                "text-sm font-medium text-primary mb-4 pl-10 pr-10",
                language === "bn" && "font-bengali"
              )}>
                {language === "bn" ? dua.titleBn : dua.titleEn}
              </h3>

              {/* Arabic */}
              <p 
                className={cn(
                  "text-2xl leading-loose text-foreground mb-4 text-right",
                  arabicFont === "uthmani" ? "font-uthmani" : "font-arabic"
                )}
                dir="rtl"
              >
                {dua.arabic}
              </p>

              {/* Transliteration */}
              {(language === "bn" ? dua.transliterationBn : dua.transliteration) && (
                <p className={cn(
                  "text-sm text-muted-foreground mb-3",
                  language === "bn" ? "font-bengali" : "italic"
                )}>
                  <span className={cn("font-medium", language === "bn" && "font-bengali")}>
                    {language === "bn" ? "উচ্চারণ: " : "Transliteration: "}
                  </span>
                  {language === "bn" ? dua.transliterationBn : dua.transliteration}
                </p>
              )}

              {/* Translation */}
              <p className={cn(
                "text-muted-foreground mb-3",
                language === "bn" && "font-bengali"
              )}>
                {language === "bn" ? dua.bengali : dua.english}
              </p>

              {/* Reference */}
              {(language === "bn" ? dua.referenceBn : dua.referenceEn) && (
                <span className={cn(
                  "inline-block rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground",
                  language === "bn" && "font-bengali"
                )}>
                  {language === "bn" ? dua.referenceBn : dua.referenceEn}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyDuaPage;
