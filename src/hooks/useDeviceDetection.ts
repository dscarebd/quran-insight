import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';

interface DeviceInfo {
  isSamsung: boolean;
  isNative: boolean;
  platform: string;
  statusBarHeight: number;
}

/**
 * Hook to detect device type and provide appropriate safe area offsets.
 * Samsung devices often report env(safe-area-inset-top) as 0 even with status bars,
 * so we need device-specific fallbacks.
 */
export const useDeviceDetection = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isSamsung: false,
    isNative: false,
    platform: 'web',
    statusBarHeight: 24, // Default fallback
  });

  useEffect(() => {
    const detectDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isNative = Capacitor.isNativePlatform();
      const platform = Capacitor.getPlatform();
      
      // Detect Samsung devices
      const isSamsung = userAgent.includes('samsung') || 
                        userAgent.includes('sm-') || // Samsung model numbers start with SM-
                        userAgent.includes('gt-');   // Older Samsung models
      
      // Determine appropriate status bar height based on device
      let statusBarHeight = 24; // Default for most devices
      
      if (isNative && platform === 'android') {
        if (isSamsung) {
          // Samsung devices with Dynamic AMOLED displays often have taller status bars
          // S23 Ultra, S24 Ultra, S25+ typically have ~32-36px status bars
          const isUltraOrPlus = userAgent.includes('ultra') || 
                                userAgent.includes('plus') ||
                                // Common Samsung flagship model patterns
                                /sm-s9[0-9]{2}[up]/i.test(userAgent) || // S24 Ultra/Plus
                                /sm-s91[0-9][up]/i.test(userAgent) ||   // S23 Ultra/Plus
                                /sm-s92[0-9][up]/i.test(userAgent);     // S25 Ultra/Plus
          
          statusBarHeight = isUltraOrPlus ? 36 : 32;
        } else {
          // Other Android devices
          statusBarHeight = 28;
        }
      } else if (isNative && platform === 'ios') {
        // iOS devices with notch/Dynamic Island
        statusBarHeight = 0; // iOS handles safe-area-inset properly
      }
      
      setDeviceInfo({
        isSamsung,
        isNative,
        platform,
        statusBarHeight,
      });
    };

    detectDevice();
  }, []);

  return deviceInfo;
};

/**
 * Get the CSS value for status bar top offset.
 * Uses env(safe-area-inset-top) with a device-specific fallback.
 */
export const getStatusBarOffset = (fallbackHeight: number): string => {
  return `max(env(safe-area-inset-top, 0px), ${fallbackHeight}px)`;
};
