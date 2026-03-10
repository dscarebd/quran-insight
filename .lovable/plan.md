

## Problem

The Kaaba emoji (🕋) is placed inside the needle rotation container, so it rotates together with the needle. It should stay fixed at the Qibla direction independently — the needle and Kaaba icon should point to Qibla, but the icon itself shouldn't spin with the needle's internal rotation.

Looking at the reference image: the compass shows a clean design where the Kaaba icon sits at the tip of the Qibla direction line, and the needle smoothly points toward it. The current code has the 🕋 emoji inside the same `div` that rotates with `needleRotation`, causing it to tilt/rotate unnaturally.

## Plan

**File: `src/components/QiblaCompass.tsx`**

1. **Separate Kaaba icon from needle**: Move the 🕋 emoji out of the needle rotation `div` and into its own independently-rotating container that only rotates by `needleRotation` degrees but counter-rotates the icon text so it always stays upright.

2. **Fix the needle design**: The needle should be a clean line/arrow pointing to Qibla. The Kaaba icon at the tip should remain upright (not tilted) by applying a counter-rotation (`-needleRotation` deg) to the emoji itself.

3. **Smooth transitions**: Add `will-change: transform` and use CSS transitions for smooth compass movement.

Specifically:
- Lines 251-268: Remove 🕋 from the needle SVG div
- After line 268, add a new absolutely-positioned div that rotates by `needleRotation` but contains the 🕋 with a counter-rotation so it stays upright:

```tsx
{/* Kaaba icon - rotates to Qibla but stays upright */}
<div
  className="absolute inset-0 transition-transform duration-300 ease-out pointer-events-none"
  style={{ transform: `rotate(${needleRotation}deg)` }}
>
  <div
    className="absolute flex items-center justify-center"
    style={{ top: 4, left: "50%", transform: `translateX(-50%) rotate(${-needleRotation}deg)` }}
  >
    <span className="text-lg drop-shadow-md">🕋</span>
  </div>
</div>
```

This keeps the Kaaba icon always pointing in the Qibla direction but visually upright (not tilted), matching the reference image behavior.

