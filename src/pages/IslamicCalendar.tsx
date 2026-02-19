import { Language } from "@/types/language";
import IslamicCalendarSection from "@/components/IslamicCalendarSection";

interface IslamicCalendarProps {
  language: Language;
}

const IslamicCalendar = ({ language }: IslamicCalendarProps) => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-2xl mx-auto px-4 py-4">
        <IslamicCalendarSection language={language} />
      </div>
    </div>
  );
};

export default IslamicCalendar;
