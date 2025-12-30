import { AssetGeneratorOptions } from '@capacitor/assets';

const config: AssetGeneratorOptions = {
  // Project root directory
  projectRoot: '.',
  
  // Android configuration
  android: {
    // Path to Android project
    path: 'android',
    // Generate adaptive icons for Android
    adaptiveIcon: {
      // Foreground layer (your logo)
      foreground: 'assets/icon-foreground.png',
      // Background layer (solid color or image)
      background: 'assets/icon-background.png',
      // Background color for adaptive icon
      backgroundColor: '#10b981'
    }
  },
  
  // iOS configuration
  ios: {
    // Path to iOS project
    path: 'ios'
  },
  
  // Icon configuration
  icon: {
    // Source icon file (1024x1024 recommended)
    sources: ['assets/icon-only.png'],
    // Background color for icons that need it
    backgroundColor: '#10b981'
  },
  
  // Splash screen configuration
  splash: {
    // Light mode splash screen
    sources: ['assets/splash.png'],
    // Dark mode splash screen (optional)
    darkSources: ['assets/splash-dark.png'],
    // Background color for light mode
    backgroundColor: '#10b981',
    // Background color for dark mode
    darkBackgroundColor: '#064e3b'
  }
};

export default config;
