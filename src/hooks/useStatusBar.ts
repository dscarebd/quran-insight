import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';

/**
 * Hook to configure the native status bar on Android/iOS devices.
 * Enables overlay mode so the app renders edge-to-edge behind the status bar.
 */
export const useStatusBar = () => {
  useEffect(() => {
    const configureStatusBar = async () => {
      // Only run on native platforms (Android/iOS)
      if (!Capacitor.isNativePlatform()) {
        return;
      }

      try {
        // Set status bar to overlay the WebView (edge-to-edge display)
        await StatusBar.setOverlaysWebView({ overlay: true });
        
        // Set status bar style based on platform
        // Style.Dark = dark icons (for light backgrounds)
        // Style.Light = light icons (for dark backgrounds)
        await StatusBar.setStyle({ style: Style.Dark });
        
        // Make status bar background transparent on Android
        if (Capacitor.getPlatform() === 'android') {
          await StatusBar.setBackgroundColor({ color: '#00000000' });
        }
      } catch (error) {
        console.warn('StatusBar configuration failed:', error);
      }
    };

    configureStatusBar();
  }, []);
};

/**
 * Utility function to update status bar style dynamically
 * Call this when theme changes (light/dark mode)
 */
export const updateStatusBarStyle = async (isDarkMode: boolean) => {
  if (!Capacitor.isNativePlatform()) {
    return;
  }

  try {
    // Dark mode = light status bar icons
    // Light mode = dark status bar icons
    await StatusBar.setStyle({ 
      style: isDarkMode ? Style.Light : Style.Dark 
    });
  } catch (error) {
    console.warn('StatusBar style update failed:', error);
  }
};
