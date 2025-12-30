import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.annur.quraninsight',
  appName: 'Quran Insight',
  webDir: 'dist',
  server: {
    url: 'https://70af42a0-b8fd-42d5-97f9-2163c60c4b6a.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'automatic',
    backgroundColor: '#10b981', // Primary green color
    allowsLinkPreview: true
  },
  android: {
    backgroundColor: '#00000000' // Transparent for edge-to-edge
  },
  plugins: {
    StatusBar: {
      overlaysWebView: true,
      style: 'DARK',
      backgroundColor: '#00000000'
    },
    SplashScreen: {
      // Splash screen duration before auto-hide (if launchAutoHide is true)
      launchShowDuration: 2000,
      // Manually control when to hide (set to false for manual control)
      launchAutoHide: false,
      // Background color of splash screen
      backgroundColor: '#10b981', // Primary green color matching theme
      // Android specific settings
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      // iOS specific settings
      splashFullScreen: true,
      splashImmersive: true,
      // Animation settings
      showSpinner: false,
      // Fade animation duration
      launchFadeOutDuration: 300
    }
  }
};

export default config;
