import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const getExitMessage = () => {
  const language = localStorage.getItem("quran-language") || "bn";
  return language === "bn" ? "বের হতে আবার ব্যাক চাপুন" : "Press back again to exit";
};

export const useBackButtonHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const lastBackPressTime = useRef<number>(0);
  const EXIT_DELAY = 2000; // 2 seconds to double-tap for exit
  const isFirstLoad = useRef<boolean>(true);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      // Always prevent default first
      event.preventDefault?.();
      
      const currentTime = Date.now();
      
      // On home page, require double-tap to exit
      if (location.pathname === "/") {
        // Always push state to prevent accidental exit
        window.history.pushState(null, "", window.location.href);
        
        if (currentTime - lastBackPressTime.current < EXIT_DELAY) {
          // Double tap detected - but we already prevented, so just reset
          lastBackPressTime.current = 0;
          // For browser, we can't actually exit, so just show a message or do nothing
          return;
        }
        
        // First tap - show toast
        lastBackPressTime.current = currentTime;
        
        toast.info(getExitMessage(), {
          duration: 2000,
        });
        return;
      }
      
      // On any other page, go directly to home
      window.history.pushState(null, "", window.location.href);
      navigate("/");
    };

    // Push initial state on first load to enable back button handling
    if (isFirstLoad.current) {
      window.history.pushState(null, "", window.location.href);
      isFirstLoad.current = false;
    }
    
    // Also push state when navigating to home to ensure we can catch back press
    if (location.pathname === "/") {
      window.history.pushState(null, "", window.location.href);
    }
    
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [location.pathname]);

  // Handle Capacitor/Android hardware back button
  useEffect(() => {
    let backButtonListener: any = null;
    
    const setupCapacitorBackButton = async () => {
      try {
        const { App } = await import("@capacitor/app");
        
        backButtonListener = await App.addListener("backButton", () => {
          const currentTime = Date.now();
          
          // On home page - require double tap to exit
          if (location.pathname === "/") {
            if (currentTime - lastBackPressTime.current < EXIT_DELAY) {
              // Double tap - exit app
              App.exitApp();
              return;
            }
            
            // First tap - show warning
            lastBackPressTime.current = currentTime;
            toast.info(getExitMessage(), {
              duration: 2000,
            });
            return;
          }
          
          // On any other page, go directly to home
          navigate("/");
        });
      } catch {
        // Capacitor not available, ignore silently
      }
    };

    setupCapacitorBackButton();

    return () => {
      if (backButtonListener) {
        backButtonListener.remove();
      }
    };
  }, [location.pathname, navigate]);
};
