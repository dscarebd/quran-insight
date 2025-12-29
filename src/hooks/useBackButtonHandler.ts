import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useBackButtonHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const lastBackPressTime = useRef<number>(0);
  const EXIT_DELAY = 2000; // 2 seconds to double-tap for exit

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      // If on home page, handle exit confirmation
      if (location.pathname === "/") {
        const currentTime = Date.now();
        
        if (currentTime - lastBackPressTime.current < EXIT_DELAY) {
          // Double tap detected - allow exit (do nothing, let browser handle)
          return;
        }
        
        // First tap - prevent exit and show toast
        lastBackPressTime.current = currentTime;
        
        // Push current state back to prevent exit
        window.history.pushState(null, "", window.location.href);
        
        toast.info("Press back again to exit", {
          duration: 2000,
        });
        
        event.preventDefault();
      }
    };

    // Add initial history state to enable back button handling
    window.history.pushState(null, "", window.location.href);
    
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [location.pathname]);
};
