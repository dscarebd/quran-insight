import { useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useBackButtonHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const lastBackPressTime = useRef<number>(0);
  const historyStackSize = useRef<number>(1);
  const EXIT_DELAY = 2000; // 2 seconds to double-tap for exit

  // Track navigation to build history stack
  useEffect(() => {
    historyStackSize.current++;
  }, [location.pathname]);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const currentTime = Date.now();
      
      // Check if we're at the "root" of our app navigation
      // If historyStackSize is 1 or less, we're at the beginning
      if (historyStackSize.current <= 1 || location.pathname === "/") {
        if (currentTime - lastBackPressTime.current < EXIT_DELAY) {
          // Double tap detected - allow exit
          // Don't prevent, let the browser handle the exit
          return;
        }
        
        // First tap - prevent exit and show toast
        lastBackPressTime.current = currentTime;
        
        // Push state back to prevent exit
        window.history.pushState(null, "", window.location.href);
        
        toast.info("Press back again to exit", {
          duration: 2000,
        });
        
        if (event.preventDefault) {
          event.preventDefault();
        }
        return;
      }
      
      // Not at root - decrement stack size for normal back navigation
      historyStackSize.current = Math.max(0, historyStackSize.current - 1);
    };

    // Push initial state to have something to go back to
    window.history.pushState(null, "", window.location.href);
    
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [location.pathname]);

  // Also handle Capacitor/Android hardware back button if available
  useEffect(() => {
    let backButtonListener: any = null;
    
    const setupCapacitorBackButton = async () => {
      try {
        // Dynamic import to avoid errors if Capacitor is not available
        const { App } = await import("@capacitor/app");
        
        backButtonListener = await App.addListener("backButton", ({ canGoBack }) => {
          const currentTime = Date.now();
          
          if (!canGoBack || location.pathname === "/") {
            if (currentTime - lastBackPressTime.current < EXIT_DELAY) {
              // Double tap - exit app
              App.exitApp();
              return;
            }
            
            // First tap - show warning
            lastBackPressTime.current = currentTime;
            toast.info("Press back again to exit", {
              duration: 2000,
            });
            return;
          }
          
          // Normal back navigation
          navigate(-1);
        });
      } catch (error) {
        // Capacitor not available, ignore
        console.log("Capacitor App plugin not available");
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
