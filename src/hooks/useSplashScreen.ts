import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';

/**
 * Hook to manage the native splash screen on Android/iOS devices.
 * Automatically hides the splash screen once the app is ready.
 */
export const useSplashScreen = () => {
  useEffect(() => {
    const hideSplashScreen = async () => {
      // Only run on native platforms (Android/iOS)
      if (!Capacitor.isNativePlatform()) {
        return;
      }

      try {
        // Hide splash screen with a fade animation
        await SplashScreen.hide({
          fadeOutDuration: 300
        });
      } catch (error) {
        console.warn('SplashScreen hide failed:', error);
      }
    };

    // Small delay to ensure app is fully rendered before hiding splash
    const timer = setTimeout(hideSplashScreen, 500);
    
    return () => clearTimeout(timer);
  }, []);
};

/**
 * Utility function to show splash screen programmatically
 */
export const showSplashScreen = async () => {
  if (!Capacitor.isNativePlatform()) {
    return;
  }

  try {
    await SplashScreen.show({
      autoHide: false,
      fadeInDuration: 300,
      fadeOutDuration: 300,
      showDuration: 2000
    });
  } catch (error) {
    console.warn('SplashScreen show failed:', error);
  }
};

/**
 * Utility function to hide splash screen programmatically
 */
export const hideSplashScreen = async (fadeOutDuration = 300) => {
  if (!Capacitor.isNativePlatform()) {
    return;
  }

  try {
    await SplashScreen.hide({
      fadeOutDuration
    });
  } catch (error) {
    console.warn('SplashScreen hide failed:', error);
  }
};
