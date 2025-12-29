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
    contentInset: 'automatic'
  },
  android: {
    backgroundColor: '#ffffff'
  }
};

export default config;
