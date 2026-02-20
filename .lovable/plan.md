

## Fix Prayer Time Accuracy (5-minute Maghrib/Iftar discrepancy)

### Problem
The Maghrib (Iftar) time for Mohanganj, Netrokona shows 5:53 PM but the correct time should be ~5:58 PM -- a 5-minute gap caused by two issues in the calculation algorithm.

### Root Causes

1. **Simplified Equation of Time formula** -- The current code uses a Spencer/NOAA approximation for the Equation of Time that can drift 1-3 minutes from the accurate value. The standard PrayTimes.org algorithm (used by most Islamic prayer time apps) computes Right Ascension directly from the ecliptic longitude, which is more precise.

2. **No Maghrib safety offset** -- Most Bangladesh Islamic calendars and apps add a 2-3 minute buffer after astronomical sunset for Maghrib/Iftar (to account for terrain, atmospheric conditions, and precaution). The current code uses raw astronomical sunset with zero offset.

### Solution

**File to modify:** `src/data/prayerTimes.ts`

1. **Replace the Equation of Time calculation** with the PrayTimes.org Right Ascension-based method:
   - Compute RA = arctan2(cos(e) * sin(L), cos(L)) / 15
   - EqT = mean sun longitude / 15 - RA (with hour-angle normalization)
   - This matches the U.S. Naval Observatory algorithm and is accurate to ~1 arcminute

2. **Add a +3 minute offset to Maghrib** -- Standard practice in Bangladesh (IFB method) to add a small precautionary buffer after astronomical sunset for Maghrib start time. This also fixes Iftar time accuracy.

3. **Propagate the offset** -- The Maghrib offset also shifts the Asr end time (Asr ends at Maghrib) and Isha calculations that depend on sunset.

### Expected Result
- Maghrib/Iftar for Mohanganj, Netrokona will show ~5:58 PM instead of 5:53 PM
- All other prayer times will also be slightly more accurate (~1-2 minute improvement)
- The fix applies globally, improving accuracy for all locations

