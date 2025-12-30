import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';

/**
 * Hook to configure the native status bar on Android/iOS devices.
 * Enables overlay mode so the app renders edge-to-edge behind the status bar.
 * Automatically updates status bar style when theme changes.
 */
export const useStatusBar = () => {
  const { resolvedTheme } = useTheme();

  // Initial configuration on mount
  useEffect(() => {
    const configureStatusBar = async () => {
      // Only run on native platforms (Android/iOS)
      if (!Capacitor.isNativePlatform()) {
        return;
      }

      try {
        // Set status bar to overlay the WebView (edge-to-edge display)
        await StatusBar.setOverlaysWebView({ overlay: true });
        
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

  // Update status bar style when theme changes
  useEffect(() => {
    const updateStyle = async () => {
      if (!Capacitor.isNativePlatform()) {
        return;
      }

      try {
        // Dark mode = light status bar icons (white icons on dark background)
        // Light mode = dark status bar icons (black icons on light background)
        const isDarkMode = resolvedTheme === 'dark';
        await StatusBar.setStyle({ 
          style: isDarkMode ? Style.Dark : Style.Light 
        });
      } catch (error) {
        console.warn('StatusBar style update failed:', error);
      }
    };

    // Only update after theme is resolved (not on initial undefined)
    if (resolvedTheme) {
      updateStyle();
    }
  }, [resolvedTheme]);
};

/**
 * Utility function to update status bar style manually if needed
 */
export const updateStatusBarStyle = async (isDarkMode: boolean) => {
  if (!Capacitor.isNativePlatform()) {
    return;
  }

  try {
    await StatusBar.setStyle({ 
      style: isDarkMode ? Style.Dark : Style.Light 
    });
  } catch (error) {
    console.warn('StatusBar style update failed:', error);
  }
};
