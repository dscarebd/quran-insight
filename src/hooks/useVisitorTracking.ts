import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const VISITOR_ID_KEY = "quran_visitor_id";

const generateVisitorId = (): string => {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${randomPart}`;
};

const getVisitorId = (): string => {
  let visitorId = localStorage.getItem(VISITOR_ID_KEY);
  if (!visitorId) {
    visitorId = generateVisitorId();
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
  }
  return visitorId;
};

export const useVisitorTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const trackPageView = async () => {
      try {
        const visitorId = getVisitorId();
        
        // Use edge function with rate limiting and validation
        await supabase.functions.invoke("track-page-view", {
          body: {
            visitor_id: visitorId,
            page_path: location.pathname,
            user_agent: navigator.userAgent,
            referrer: document.referrer || null,
          },
        });
      } catch (error) {
        // Silently fail - don't disrupt user experience
        console.error("Failed to track page view:", error);
      }
    };

    trackPageView();
  }, [location.pathname]);
};