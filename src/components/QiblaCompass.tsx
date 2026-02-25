import { useState, useEffect, useCallback } from "react";
import { Compass, Navigation, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Language } from "@/types/language";
import { toast } from "sonner";
import { getCurrentPosition } from "@/utils/geolocation";

interface QiblaCompassProps {
  language: Language;
}

const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

// Calculate Qibla bearing from a given location
const calculateQiblaBearing = (lat: number, lng: number): number => {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const toDeg = (r: number) => (r * 180) / Math.PI;

  const φ1 = toRad(lat);
  const φ2 = toRad(KAABA_LAT);
  const Δλ = toRad(KAABA_LNG - lng);

  const x = Math.sin(Δλ) * Math.cos(φ2);
  const y = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);

  let bearing = toDeg(Math.atan2(x, y));
  return (bearing + 360) % 360;
};

export const QiblaCompass = ({ language }: QiblaCompassProps) => {
  const [qiblaBearing, setQiblaBearing] = useState<number | null>(null);
  const [deviceHeading, setDeviceHeading] = useState<number | null>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [locationName, setLocationName] = useState<string | null>(null);
  const [isRequestingPermission, setIsRequestingPermission] = useState(false);

  // Get user location and calculate Qibla
  useEffect(() => {
    // Try saved location first
    const savedLat = localStorage.getItem("prayer-lat");
    const savedLng = localStorage.getItem("prayer-lng");
    const savedCity = localStorage.getItem("prayer-city");

    if (savedLat && savedLng) {
      const bearing = calculateQiblaBearing(parseFloat(savedLat), parseFloat(savedLng));
      setQiblaBearing(bearing);
      setLocationName(savedCity || null);
    }

    // Also try live geolocation (works on both web and native APK)
    getCurrentPosition().then(({ latitude, longitude }) => {
      const bearing = calculateQiblaBearing(latitude, longitude);
      setQiblaBearing(bearing);
      localStorage.setItem("prayer-lat", String(latitude));
      localStorage.setItem("prayer-lng", String(longitude));
    }).catch(() => {
      // If no saved location either, default to Dhaka
      if (!savedLat) {
        setQiblaBearing(calculateQiblaBearing(23.8103, 90.4125));
        setLocationName("Dhaka");
      }
    });
  }, []);

  // Device orientation for live compass
  const handleOrientation = useCallback((e: DeviceOrientationEvent) => {
    // webkitCompassHeading for iOS, alpha for Android
    const heading = (e as any).webkitCompassHeading ?? (e.alpha != null ? (360 - e.alpha) % 360 : null);
    if (heading != null) {
      setDeviceHeading(heading);
    }
  }, []);

  const requestCompassPermission = async () => {
    setIsRequestingPermission(true);
    try {
      // iOS 13+ requires permission
      if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        if (permission === "granted") {
          window.addEventListener("deviceorientation", handleOrientation, true);
          setHasPermission(true);
        } else {
          toast.error(language === "bn" ? "কম্পাস অনুমতি প্রত্যাখ্যাত" : "Compass permission denied");
        }
      } else {
        // Android / desktop – just listen
        window.addEventListener("deviceorientation", handleOrientation, true);
        setHasPermission(true);
        // Check if we actually get events after a short delay
        setTimeout(() => {
          setDeviceHeading((prev) => {
            if (prev === null) {
              // No events received - likely desktop
              return prev;
            }
            return prev;
          });
        }, 1000);
      }
    } catch {
      toast.error(language === "bn" ? "কম্পাস উপলব্ধ নয়" : "Compass not available");
    }
    setIsRequestingPermission(false);
  };

  useEffect(() => {
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation, true);
    };
  }, [handleOrientation]);

  // The needle rotation: point towards Qibla relative to device heading
  const needleRotation = qiblaBearing != null
    ? deviceHeading != null
      ? qiblaBearing - deviceHeading
      : qiblaBearing
    : 0;

  const compassRotation = deviceHeading != null ? -deviceHeading : 0;

  const bearingText = qiblaBearing != null ? `${Math.round(qiblaBearing)}°` : "--";

  return (
    <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-card p-4 sm:p-6 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 hover:scale-[1.02]">
      {/* Decorative corner */}
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-2xl" />

      {/* Header */}
      <div className="mb-3 sm:mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-primary/10">
            <Compass className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </div>
          <span className={cn("text-sm font-semibold", language === "bn" && "font-bengali")}>
            {language === "bn" ? "কিবলা দিক" : "Qibla Direction"}
          </span>
        </div>
        {locationName && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{locationName}</span>
          </div>
        )}
      </div>

      {/* Compass Visual */}
      <div className="relative mx-auto flex items-center justify-center" style={{ width: 180, height: 180 }}>
        {/* Compass ring with cardinal directions */}
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{ transform: `rotate(${compassRotation}deg)` }}
        >
          {/* Outer ring */}
          <svg viewBox="0 0 180 180" className="w-full h-full">
            <circle cx="90" cy="90" r="85" fill="none" stroke="hsl(var(--border))" strokeWidth="2" />
            <circle cx="90" cy="90" r="75" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="4 4" />
            {/* Tick marks */}
            {Array.from({ length: 72 }).map((_, i) => {
              const angle = i * 5;
              const isMajor = angle % 90 === 0;
              const isMinor = angle % 30 === 0;
              const r1 = isMajor ? 70 : isMinor ? 74 : 78;
              const r2 = 83;
              const rad = (angle * Math.PI) / 180;
              return (
                <line
                  key={i}
                  x1={90 + r1 * Math.sin(rad)}
                  y1={90 - r1 * Math.cos(rad)}
                  x2={90 + r2 * Math.sin(rad)}
                  y2={90 - r2 * Math.cos(rad)}
                  stroke={isMajor ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))"}
                  strokeWidth={isMajor ? 2 : isMinor ? 1 : 0.5}
                  opacity={isMajor ? 1 : isMinor ? 0.6 : 0.3}
                />
              );
            })}
          </svg>
          {/* Cardinal labels */}
          {[
            { label: "N", angle: 0, color: "text-red-500 font-bold" },
            { label: "E", angle: 90, color: "text-muted-foreground" },
            { label: "S", angle: 180, color: "text-muted-foreground" },
            { label: "W", angle: 270, color: "text-muted-foreground" },
          ].map(({ label, angle, color }) => {
            const rad = (angle * Math.PI) / 180;
            const r = 60;
            return (
              <span
                key={label}
                className={cn("absolute text-xs font-semibold", color)}
                style={{
                  left: 90 + r * Math.sin(rad) - 6,
                  top: 90 - r * Math.cos(rad) - 7,
                  width: 12,
                  textAlign: "center",
                }}
              >
                {label}
              </span>
            );
          })}
        </div>

        {/* Qibla needle */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out"
          style={{ transform: `rotate(${needleRotation}deg)` }}
        >
          <svg viewBox="0 0 180 180" className="w-full h-full">
            {/* Needle pointing up (towards Qibla) */}
            <polygon
              points="90,20 84,90 96,90"
              fill="hsl(var(--primary))"
              opacity="0.9"
            />
            <polygon
              points="90,160 84,90 96,90"
              fill="hsl(var(--muted-foreground))"
              opacity="0.3"
            />
            {/* Center dot */}
            <circle cx="90" cy="90" r="5" fill="hsl(var(--primary))" />
            <circle cx="90" cy="90" r="2.5" fill="hsl(var(--primary-foreground))" />
          </svg>
          {/* Kaaba icon at needle tip */}
          <div
            className="absolute flex items-center justify-center"
            style={{ top: 8, left: "50%", transform: "translateX(-50%)" }}
          >
            <span className="text-base">🕋</span>
          </div>
        </div>
      </div>

      {/* Bearing info */}
      <div className="mt-3 text-center">
        <p className={cn("text-lg font-bold text-foreground tabular-nums")}>
          {bearingText}
        </p>
        <p className={cn("text-xs text-muted-foreground", language === "bn" && "font-bengali")}>
          {language === "bn" ? "কিবলা বিয়ারিং" : "Qibla Bearing"}
        </p>
      </div>

      {/* Enable live compass button */}
      {!hasPermission && (
        <button
          onClick={requestCompassPermission}
          disabled={isRequestingPermission}
          className={cn(
            "mx-auto mt-3 flex items-center gap-1.5 rounded-full bg-primary/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground",
            language === "bn" && "font-bengali"
          )}
        >
          <Navigation className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          {language === "bn" ? "লাইভ কম্পাস চালু করুন" : "Enable Live Compass"}
        </button>
      )}

      {hasPermission && deviceHeading != null && (
        <p className={cn("mt-2 text-center text-[10px] text-muted-foreground/60", language === "bn" && "font-bengali")}>
          {language === "bn" ? "ডিভাইসটি কিবলার দিকে ঘোরান" : "Rotate device to face Qibla"}
        </p>
      )}

      {hasPermission && deviceHeading === null && (
        <p className={cn("mt-2 text-center text-[10px] text-muted-foreground/60", language === "bn" && "font-bengali")}>
          {language === "bn" ? "কম্পাস সেন্সর পাওয়া যায়নি" : "Compass sensor not detected"}
        </p>
      )}
    </div>
  );
};
