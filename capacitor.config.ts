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
    backgroundColor: '#ffffff',
    // Allows the WebView to extend under the status bar
    allowsLinkPreview: true
  },
  android: {
    backgroundColor: '#00000000' // Transparent for edge-to-edge
  },
  plugins: {
    StatusBar: {
      overlaysWebView: true,
      style: 'DARK',
      backgroundColor: '#00000000' // Transparent (Android only)
    }
  }
};

export default config;
