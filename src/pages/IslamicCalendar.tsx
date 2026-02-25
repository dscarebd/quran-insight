import { Language } from "@/types/language";
import IslamicCalendarSection from "@/components/IslamicCalendarSection";

interface IslamicCalendarProps {
  language: Language;
}

const IslamicCalendar = ({ language }: IslamicCalendarProps) => {
  return (
    <div className="min-h-screen bg-background pb-6">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6">
        <IslamicCalendarSection language={language} />
      </div>
    </div>
  );
};

export default IslamicCalendar;
