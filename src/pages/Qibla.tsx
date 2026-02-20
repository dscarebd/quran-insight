import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Language } from "@/types/language";
import { QiblaCompass } from "@/components/QiblaCompass";

interface QiblaPageProps {
  language: Language;
}

const QiblaPage = ({ language }: QiblaPageProps) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-lg px-4 py-6 sm:py-8">
        <h1 className={cn(
          "mb-6 text-center text-xl sm:text-2xl font-bold text-foreground",
          language === "bn" && "font-bengali"
        )}>
          {language === "bn" ? "কিবলা দিকনির্দেশক" : "Qibla Finder"}
        </h1>

        <QiblaCompass language={language} />

        {/* Info section */}
        <div className="mt-6 rounded-xl border border-border bg-card p-4">
          <h2 className={cn(
            "mb-2 text-sm font-semibold text-foreground",
            language === "bn" && "font-bengali"
          )}>
            {language === "bn" ? "কিবলা কী?" : "What is Qibla?"}
          </h2>
          <p className={cn(
            "text-xs leading-relaxed text-muted-foreground",
            language === "bn" && "font-bengali"
          )}>
            {language === "bn"
              ? "কিবলা হলো মক্কার কাবা শরীফের দিক, যেদিকে মুখ করে মুসলমানরা নামাজ আদায় করেন। এই কম্পাস আপনার বর্তমান অবস্থান থেকে কিবলার সঠিক দিক দেখায়। মোবাইলে 'লাইভ কম্পাস' চালু করলে ডিভাইস ঘোরানোর সাথে সাথে দিক পরিবর্তন হবে।"
              : "Qibla is the direction of the Kaaba in Makkah, which Muslims face during prayer. This compass shows the exact Qibla direction from your current location. On mobile, enable 'Live Compass' to see the direction update as you rotate your device."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QiblaPage;
