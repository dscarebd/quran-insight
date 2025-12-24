import { ArrowLeft, HandHelping } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { MobileNavFooter } from "@/components/MobileNavFooter";

interface DuaProps {
  language: "bn" | "en";
}

const Dua = ({ language }: DuaProps) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-background/95 px-4 py-3 backdrop-blur-sm">
          <button
            onClick={() => navigate(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className={cn("text-lg font-semibold", language === "bn" && "font-bengali")}>
            {language === "bn" ? "দোয়া সমূহ" : "Duas"}
          </h1>
        </header>

        {/* Content */}
        <div className="mx-auto max-w-2xl p-4 pb-20 md:pb-4">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-6">
              <HandHelping className="h-10 w-10 text-primary" />
            </div>
            <h2 className={cn("text-xl font-semibold mb-2", language === "bn" && "font-bengali")}>
              {language === "bn" ? "শীঘ্রই আসছে" : "Coming Soon"}
            </h2>
            <p className={cn("text-muted-foreground max-w-sm", language === "bn" && "font-bengali")}>
              {language === "bn" 
                ? "দোয়া সংগ্রহ শীঘ্রই যোগ করা হবে। অনুগ্রহ করে অপেক্ষা করুন।" 
                : "Dua collection will be added soon. Please stay tuned."}
            </p>
          </div>
        </div>
      </div>
      <MobileNavFooter language={language} />
    </>
  );
};

export default Dua;
