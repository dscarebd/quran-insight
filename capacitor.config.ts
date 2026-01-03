import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.annur.quraninsight',
  appName: 'Quran Insight',
  webDir: 'dist',
  // Server config removed for offline APK bundle - uses local dist folder
  ios: {
    contentInset: 'automatic',
    backgroundColor: '#10b981',
    allowsLinkPreview: true
  },
  android: {
    backgroundColor: '#00000000'
  },
  plugins: {
    StatusBar: {
      overlaysWebView: true,
      style: 'DARK',
      backgroundColor: '#00000000'
    },
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: false,
      backgroundColor: '#10b981',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      splashFullScreen: true,
      splashImmersive: true,
      showSpinner: false,
      launchFadeOutDuration: 300
    }
  }
};

export default config;
