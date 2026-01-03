import { useState, useEffect } from "react";
import { Language } from "@/types/language";

export const useGeoLanguage = () => {
  const [language, setLanguage] = useState<Language>(() => {
    // First check if user has saved preference
    const saved = localStorage.getItem("quran-language");
    if (saved) return saved as Language;
    
    // Check if geo detection was already done
    const geoLang = localStorage.getItem("quran-geo-language");
    if (geoLang) return geoLang as Language;
    
    return "bn"; // Default while loading
  });

  const [isDetecting, setIsDetecting] = useState(false);

  useEffect(() => {
    const detectLocation = async () => {
      // Skip if user has saved preference or geo already checked
      if (localStorage.getItem("quran-language") || 
          localStorage.getItem("quran-geo-checked")) {
        return;
      }

      setIsDetecting(true);
      
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const detectedLang: Language = data.country_code === 'BD' ? 'bn' : 'en';
        
        setLanguage(detectedLang);
        localStorage.setItem("quran-geo-language", detectedLang);
        localStorage.setItem("quran-geo-checked", "true");
      } catch (error) {
        // On error, keep Bengali as default
        localStorage.setItem("quran-geo-checked", "true");
      } finally {
        setIsDetecting(false);
      }
    };

    detectLocation();
  }, []);

  return { language, setLanguage, isDetecting };
};
