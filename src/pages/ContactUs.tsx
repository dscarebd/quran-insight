import { ArrowLeft, Mail, Facebook, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Language } from "@/types/language";

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

interface ContactUsProps {
  language?: Language;
}

const ContactUs = ({ language = 'bn' }: ContactUsProps) => {
  const navigate = useNavigate();
  const isBengali = language === 'bn';

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: isBengali ? 'যোগাযোগ করুন - Quran Insight' : 'Contact Us - Quran Insight',
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-accent rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className={cn(
              "text-lg font-semibold",
              isBengali && "font-bengali"
            )}>
              {isBengali ? 'যোগাযোগ করুন' : 'Contact Us'}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleShare}
              className="p-2 hover:bg-accent rounded-full transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-6 pb-24 md:pb-8">
        <div className="bg-card rounded-xl p-5 md:p-8 shadow-sm border border-border">
          <div className={cn("space-y-6 text-foreground leading-relaxed", isBengali && "font-bengali")}>
            {/* Intro */}
            <p className="text-base md:text-lg">
              আমরা মানুষ। আমরা নবী নই। আমরা অতীব সাধারণ মানুষ। আমাদের ভুল হবে। আমাদের এই এ্যাপ এবং ওয়েবসাইটে যে কোন ধরণের ভুল, বা অসঙ্গতি দেখলে আমাদেরকে জানালে কৃতজ্ঞ থাকবো। যদি কোন কারণে কেউ কোন মত দিয়ে বা ভূল ধরিয়ে দিয়ে উপকার করার নিয়ত করি তাহলে কয়েকটি বিষয় খেয়াল রাখবো (ইনশাআল্লাহ):
            </p>

            {/* Guidelines */}
            <div className="space-y-4 text-base">
              <p>
                <span className="font-semibold">১.</span> আমি যা বলছি এটা আমার খেয়াল মাত্র, ফায়সালা না। তাই আমার খেয়াল মত কাজ করা না হলে মনে কষ্ট নিবো না।
              </p>
              <p>
                <span className="font-semibold">২.</span> খেয়াল দেয়ার সময় বা ভুল ধরিয়ে দেয়ার সময় আদবের সাথে সুন্দরভাবে উল্লেখ করবো। কখনো হুকুম করা বা খারাপ শব্দ ব্যবহার করবো না।
              </p>
              <p>
                <span className="font-semibold">৩.</span> মনে রাখবো এই এ্যাপ এবং ওয়েবাইটগুলো পরিচালনার জন্য প্রতি মাসে হাজার হাজার টাকা খরচ হয়। যে কোন পরিবর্তন বা পরিবর্ধনে প্রচুর টাকা খরচ হয়। এবং এখানে যারা শ্রম দিচ্ছেন তারা নিজেদের পরিবারকে সময় দেয়া, চাকুরী-ব্যবসায় সময় দেয়ার পাশাপাশি দীনের এই মহান কাজে নিয়োজিত। সুতরাং বলা মাত্রই কাজ হয়ে যাবে এমনটি আশা করবো না। তাদের ভুলত্রুটি ক্ষমা সুন্দর চোখে দেখে দু'আ করবো।
              </p>
              <p>
                <span className="font-semibold">৪.</span> আমাদের অনেকের ধারনা এই ওয়েবসাইট বা এ্যাপ থেকে এর সাথে নিয়োজিত যারা তাদের অনেক আয় হয়। এটা ভুল ধারনা। এই এ্যাপ বা ওয়েবসাইট থেকে আমাদের একটি টাকাও আয় হয় না। এর মূল কারণ আমাদের এই এ্যাপ বা ওয়েবসাইট সম্পূর্ণ ফ্রী এবং বিজ্ঞাপণমুক্ত। তাই যে কোন ধরণের মতামত দেয়ার সময় বা এর সাথে জড়িত কাউকে কিছু বলার সময় আমরা একটু নম্রভাবে বলার চেষ্টা করি।
              </p>
            </div>

            {/* Dua Request */}
            <p className="text-base md:text-lg">
              সবার নিকট বিনীতভাবে দু'আর আবেদন করছি। আল্লাহ যেন আমাদের এই মেহনতের উসিলায় সারা দুনিয়ার সকল মুসলমানকে জান্নাতের উঁচু মাকাম দান করেন। আমীন।
            </p>

            {/* Contact Info */}
            <div className="space-y-3 pt-4 border-t border-border">
              <p className="font-semibold text-base">
                আমাদের সাথে যোগাযোগের মাধ্যম:
              </p>
              
              <a 
                href="mailto:info@quraninsight.app"
                className="flex items-center gap-3 text-primary hover:underline"
              >
                <Mail className="w-5 h-5" />
                <span>info@quraninsight.app</span>
              </a>

              <a 
                href="https://www.facebook.com/quraninsightapp/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-primary hover:underline"
              >
                <Facebook className="w-5 h-5" />
                <span>facebook.com/quraninsightapp</span>
              </a>

              <a 
                href="https://t.me/nuralamin_official"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-primary hover:underline"
              >
                <TelegramIcon />
                <span>@nuralamin_official</span>
              </a>
            </div>

            {/* Note */}
            <div className="bg-accent/50 rounded-lg p-4 mt-6">
              <p className="text-sm md:text-base">
                <span className="font-semibold">বি.দ্র.</span> আমাদের আকাবিরদের কারো বয়ান, কিতাব, মালফুয ইত্যাদি আপনার সংগ্রহে থাকলে আমাদেরকে দিতে পারেন, আমরা আমাদের এ্যাপ এবং ওয়েবসাইটের মাধ্যমে সকলের কাছে পৌঁছানোর চেষ্টা করবো, ইনশাআল্লাহ।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
