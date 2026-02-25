import { Capacitor } from '@capacitor/core';

interface GeoPosition {
  latitude: number;
  longitude: number;
}

/**
 * Get current position using Capacitor Geolocation on native,
 * falling back to browser API on web.
 */
export const getCurrentPosition = async (): Promise<GeoPosition> => {
  if (Capacitor.isNativePlatform()) {
    try {
      const { Geolocation } = await import('@capacitor/geolocation');
      
      // Request permission first on native
      const permStatus = await Geolocation.checkPermissions();
      if (permStatus.location !== 'granted') {
        const reqResult = await Geolocation.requestPermissions();
        if (reqResult.location !== 'granted') {
          throw new Error('PERMISSION_DENIED');
        }
      }
      
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      });
      
      return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
    } catch (err: any) {
      // If Capacitor plugin fails, try browser fallback
      if (err?.message === 'PERMISSION_DENIED') throw err;
      console.warn('Capacitor Geolocation failed, trying browser API:', err);
      return browserGeolocation();
    }
  }
  
  return browserGeolocation();
};

const browserGeolocation = (): Promise<GeoPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('NOT_SUPPORTED'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
      (err) => {
        if (err.code === err.PERMISSION_DENIED) reject(new Error('PERMISSION_DENIED'));
        else if (err.code === err.TIMEOUT) reject(new Error('TIMEOUT'));
        else reject(new Error('UNAVAILABLE'));
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    );
  });
};
