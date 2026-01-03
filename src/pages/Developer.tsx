import { useRef, useEffect } from "react";
import { ArrowLeft, Globe, Mail, Code, Heart, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import annurLogo from "@/assets/annur-digital-logo.jpeg";
import { Language } from "@/types/language";

// Telegram SVG Icon Component
const TelegramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

interface DeveloperProps {
  language: Language;
}

const Developer = ({ language }: DeveloperProps) => {
  const navigate = useNavigate();

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Easter egg: 7 clicks on developer logo navigates to admin (no time restriction)
  const clickCountRef = useRef(0);

  const handleDeveloperLogoClick = () => {
    clickCountRef.current += 1;

    if (clickCountRef.current >= 7) {
      clickCountRef.current = 0;
      toast.success(language === "bn" ? "অ্যাডমিন লগইনে যাচ্ছি…" : "Opening admin login…");
      navigate("/auth");
    }
  };

  const contactLinks = [
    {
      labelEn: "Website",
      labelBn: "ওয়েবসাইট",
      value: "annurdigital.com",
      href: "https://annurdigital.com",
      icon: Globe,
      iconColor: "text-blue-500",
    },
    {
      labelEn: "Email",
      labelBn: "ইমেইল",
      value: "support@annurdigital.com",
      href: "mailto:support@annurdigital.com",
      icon: Mail,
      iconColor: "text-red-500",
    },
    {
      labelEn: "Telegram",
      labelBn: "টেলিগ্রাম",
      value: "@nuralamin_official",
      href: "https://t.me/nuralamin_official",
      icon: TelegramIcon,
      iconColor: "text-[#0088cc]",
    },
  ];

  const services = [
    {
      nameEn: "WordPress Development",
      nameBn: "ওয়ার্ডপ্রেস ডেভেলপমেন্ট",
      descriptionEn: "Custom themes, plugins, and e-commerce solutions",
      descriptionBn: "কাস্টম থিম, প্লাগইন এবং ই-কমার্স সমাধান",
    },
    {
      nameEn: "Software Design",
      nameBn: "সফটওয়্যার ডিজাইন",
      descriptionEn: "Web and mobile application development",
      descriptionBn: "ওয়েব এবং মোবাইল অ্যাপ্লিকেশন ডেভেলপমেন্ট",
    },
    {
      nameEn: "UI/UX Design",
      nameBn: "UI/UX ডিজাইন",
      descriptionEn: "User-centered design and prototyping",
      descriptionBn: "ইউজার-কেন্দ্রিক ডিজাইন এবং প্রোটোটাইপিং",
    },
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className={cn("text-lg font-semibold", language === "bn" ? "font-bengali" : "font-sans")}>
            {language === "bn" ? "ডেভেলপার তথ্য" : "Developer Information"}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-2xl px-4 pt-3 pb-4 lg:pb-3 space-y-4">
        {/* Developer Card */}
        <section>
          <div className="rounded-lg border border-border bg-gradient-to-br from-primary/5 to-primary/10 overflow-hidden">
            <div className="p-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label={language === "bn" ? "অ্যাডমিন লগইন খুলুন" : "Open admin login"}
                  onClick={handleDeveloperLogoClick}
                  className="h-12 w-12 rounded-full border-2 border-primary/20 overflow-hidden cursor-pointer select-none"
                >
                  <img
                    src={annurLogo}
                    alt="An-Nur Digital"
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                </button>
                <div className="flex-1">
                  <h3 className={cn("text-base font-semibold", language === "bn" ? "font-bengali" : "font-sans")}>
                    An-Nur Digital
                  </h3>
                  <p className={cn("text-sm text-muted-foreground leading-tight", language === "bn" ? "font-bengali" : "font-sans")}>
                    {language === "bn" 
                      ? "ওয়ার্ডপ্রেস ও সফটওয়্যার ডিজাইনার" 
                      : "WordPress & Software Designer"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section>
          <h2 className={cn(
            "mb-2 text-base font-medium text-muted-foreground tracking-wider",
            language === "bn" ? "font-bengali" : "font-sans"
          )}>
            {language === "bn" ? "আমাদের সম্পর্কে" : "About Us"}
          </h2>
          <div className="rounded-lg border border-border bg-card p-3">
            <p className={cn("text-sm text-muted-foreground leading-relaxed", language === "bn" ? "font-bengali" : "font-sans")}>
              {language === "bn" 
                ? "আন-নূর ডিজিটাল একটি ক্রিয়েটিভ ডিজিটাল এজেন্সি যা ওয়েব ডেভেলপমেন্ট, সফটওয়্যার ডিজাইন এবং ডিজিটাল সমাধান প্রদান করে।"
                : "An-Nur Digital is a creative digital agency providing web development, software design, and digital solutions."}
            </p>
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2 className={cn(
            "mb-2 text-base font-medium text-muted-foreground tracking-wider",
            language === "bn" ? "font-bengali" : "font-sans"
          )}>
            {language === "bn" ? "যোগাযোগ" : "Contact"}
          </h2>
          <div className="rounded-lg border border-border bg-card overflow-hidden divide-y divide-border">
            {contactLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="flex items-center gap-3 p-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 shrink-0">
                  <link.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn("text-base font-semibold", language === "bn" ? "font-bengali" : "font-sans")}>
                    {language === "bn" ? link.labelBn : link.labelEn}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">{link.value}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Services */}
        <section>
          <h2 className={cn(
            "mb-2 text-base font-medium text-muted-foreground tracking-wider",
            language === "bn" ? "font-bengali" : "font-sans"
          )}>
            {language === "bn" ? "সেবাসমূহ" : "Services"}
          </h2>
          <div className="rounded-lg border border-border bg-card overflow-hidden divide-y divide-border">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-3"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 shrink-0">
                    <Code className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className={cn("text-base font-semibold", language === "bn" ? "font-bengali" : "font-sans")}>
                      {language === "bn" ? service.nameBn : service.nameEn}
                    </h3>
                    <p className={cn("text-sm text-muted-foreground mt-0.5", language === "bn" ? "font-bengali" : "font-sans")}>
                      {language === "bn" ? service.descriptionBn : service.descriptionEn}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="rounded-lg border border-border bg-gradient-to-br from-primary/5 to-primary/10 p-3 text-center">
            <Heart className="h-6 w-6 text-primary mx-auto mb-2" />
            <p className={cn("text-base font-semibold", language === "bn" ? "font-bengali" : "font-sans")}>
              {language === "bn" 
                ? "আপনার প্রজেক্টে সাহায্য দরকার?" 
                : "Need help with your project?"}
            </p>
            <a
              href="https://annurdigital.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Globe className="h-4 w-4" />
              {language === "bn" ? "আমাদের সাথে যোগাযোগ করুন" : "Contact Us"}
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Developer;
