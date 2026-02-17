import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Language } from "@/types/language";
import { useToast } from "@/hooks/use-toast";

interface LmsStudentRegistrationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRegister: (name: string, email: string, phone: string) => Promise<string>;
  isRegistering: boolean;
  language: Language;
}

export const LmsStudentRegistration = ({
  open,
  onOpenChange,
  onRegister,
  isRegistering,
  language,
}: LmsStudentRegistrationProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      toast({
        title: language === "bn" ? "ত্রুটি" : "Error",
        description: language === "bn" ? "সব তথ্য পূরণ করুন" : "Please fill all fields",
        variant: "destructive",
      });
      return;
    }
    try {
      await onRegister(name.trim(), email.trim(), phone.trim());
      toast({
        title: language === "bn" ? "সফল!" : "Success!",
        description: language === "bn" ? "নিবন্ধন সম্পন্ন হয়েছে" : "Registration completed successfully",
      });
    } catch {
      toast({
        title: language === "bn" ? "ত্রুটি" : "Error",
        description: language === "bn" ? "নিবন্ধন ব্যর্থ হয়েছে" : "Registration failed. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
            <GraduationCap className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className={cn("text-center", language === "bn" && "font-bengali")}>
            {language === "bn" ? "কোর্সে ভর্তি হন" : "Enroll in Course"}
          </DialogTitle>
          <DialogDescription className={cn("text-center", language === "bn" && "font-bengali")}>
            {language === "bn"
              ? "কোর্স শুরু করতে আপনার তথ্য দিন"
              : "Please provide your details to start learning"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div>
            <Label htmlFor="lms-name" className={cn(language === "bn" && "font-bengali")}>
              {language === "bn" ? "পুরো নাম" : "Full Name"}
            </Label>
            <Input
              id="lms-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={language === "bn" ? "আপনার নাম" : "Your full name"}
              maxLength={100}
              required
            />
          </div>
          <div>
            <Label htmlFor="lms-email" className={cn(language === "bn" && "font-bengali")}>
              {language === "bn" ? "ইমেইল" : "Email"}
            </Label>
            <Input
              id="lms-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={language === "bn" ? "আপনার ইমেইল" : "your@email.com"}
              maxLength={255}
              required
            />
          </div>
          <div>
            <Label htmlFor="lms-phone" className={cn(language === "bn" && "font-bengali")}>
              {language === "bn" ? "ফোন নম্বর" : "Phone Number"}
            </Label>
            <Input
              id="lms-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={language === "bn" ? "আপনার ফোন নম্বর" : "Your phone number"}
              maxLength={20}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isRegistering}>
            {isRegistering ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : null}
            <span className={cn(language === "bn" && "font-bengali")}>
              {language === "bn" ? "শুরু করুন" : "Start Learning"}
            </span>
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
