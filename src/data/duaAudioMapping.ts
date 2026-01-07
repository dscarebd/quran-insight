// Maps dua IDs to Hisnul Muslim audio file numbers
// Audio URL: https://archive.org/download/HisnulMuslimAudio_201510/n{number}.mp3

// Mapping for src/data/duas.ts (main dua categories)
export const duaAudioMapping: Record<string, number> = {
  // Daily Life Duas
  "daily-4": 74,    // Before Sleeping - بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا
  "daily-5": 1,     // After Waking Up - الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا
  "daily-6": 4,     // Entering Toilet - اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ
  "daily-7": 5,     // Leaving Toilet - غُفْرَانَكَ
  "daily-8": 14,    // Leaving Home - بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ
  "daily-10": 11,   // Entering Mosque - اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ
  "daily-11": 12,   // Leaving Mosque - اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ
  "daily-13": 113,  // When Afraid - حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ
  "daily-17": 147,  // Travel Start - سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا
  
  // Morning Evening Duas
  "morning-1": 60,  // Morning remembrance - أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ
  "morning-2": 61,  // Ayatul Kursi morning
  "morning-4": 62,  // Sayyidul Istighfar
  
  // Prayer Duas  
  "prayer-1": 22,   // Starting prayer - سُبْحَانَكَ اللَّهُمَّ
  "prayer-4": 76,   // Istikharah - اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ
  
  // Protection Duas
  "protection-1": 60, // Morning protection
  "protection-3": 98, // Evil eye protection
  
  // Sickness Duas
  "sickness-1": 119,  // When sick - أَذْهِبِ الْبَأْسَ
  "sickness-2": 120,  // Visiting sick
  
  // Food Duas
  "food-1": 133,    // Before eating - بِسْمِ اللَّهِ
  "food-2": 134,    // After eating - الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي
  
  // Death Duas
  "death-1": 143,   // Condolence dua
  
  // Travel Duas
  "travel-1": 147,  // Starting journey
  "travel-2": 148,  // Return from travel
};

// Mapping for src/data/dailyDuas.ts (daily dua page)
export const dailyDuaAudioMapping: Record<string, number> = {
  // Salah/Prayer Duas
  "thana-sana": 22,        // Opening dua - سُبْحَانَكَ اللَّهُمَّ
  "ruku-dua": 25,          // Tasbeeh in Ruku
  "sujud-dua": 27,         // Tasbeeh in Sujud
  "tashahhud": 29,         // At-Tahiyyat
  "durood-ibrahim": 30,    // Durood Ibrahim
  "before-salam-dua": 32,  // Dua before salam
  
  // After Salah Duas
  "astaghfirullah": 45,    // Astaghfirullah
  "antas-salam": 46,       // Allahumma Antas-Salam
  "ayatul-kursi": 47,      // Ayatul Kursi
  "subhanallah-33": 48,    // 33 Tasbeehat
  
  // Morning Duas
  "wake-up": 1,            // After waking up
  "morning-dua-1": 60,     // Morning remembrance
  "fajr-tasbeeh": 61,      // After Fajr
  
  // Evening Duas  
  "evening-dua-1": 64,     // Evening remembrance
  "maghrib-tasbeeh": 65,   // After Maghrib
  
  // Sleep Duas
  "sleep-dua-1": 74,       // Before sleeping
  "sleep-dua-2": 75,       // When having nightmare
  
  // Toilet Duas
  "toilet-enter": 4,       // Entering toilet
  "toilet-exit": 5,        // Leaving toilet
  
  // Wudu Duas
  "wudu-start": 6,         // Starting wudu
  "wudu-end": 7,           // After wudu
  
  // Mosque Duas
  "mosque-enter": 11,      // Entering mosque
  "mosque-exit": 12,       // Leaving mosque
  
  // Home Duas
  "home-enter": 13,        // Entering home
  "home-exit": 14,         // Leaving home
  
  // Food Duas
  "food-start": 133,       // Before eating
  "food-end": 134,         // After eating
  "food-guest": 137,       // For the host
  
  // Travel Duas
  "travel-start": 147,     // Starting journey
  "travel-return": 148,    // Return from travel
  "travel-vehicle": 149,   // When riding vehicle
  
  // Market Duas
  "market-enter": 153,     // Entering market
  
  // Anxiety/Stress Duas
  "anxiety-dua": 113,      // When anxious
  "distress-dua": 114,     // When distressed
  
  // Protection Duas
  "protection-evil": 98,   // From evil eye
  "protection-morning": 60, // Morning protection
  
  // Sickness Duas
  "sick-visit": 120,       // Visiting sick person
  "sick-dua": 119,         // When sick
  
  // Rain Duas
  "rain-dua": 139,         // When it rains
  "thunder-dua": 140,      // When thunder
  
  // Istikharah
  "istikharah": 76,        // Istikharah dua
  
  // Qunut
  "qunut-witr": 78,        // Qunut in Witr
  
  // Hajj/Umrah
  "talbiyah": 79,          // Talbiyah
  "safa-marwa": 82,        // At Safa and Marwa
  "arafah": 84,            // Day of Arafah
};

// Helper function to get audio URL
export const getDuaAudioUrl = (audioNumber: number): string => {
  return `https://archive.org/download/HisnulMuslimAudio_201510/n${audioNumber}.mp3`;
};

// Check if dua has audio available (for main duas)
export const hasDuaAudio = (duaId: string): boolean => {
  return duaId in duaAudioMapping;
};

// Check if daily dua has audio available
export const hasDailyDuaAudio = (duaId: string): boolean => {
  return duaId in dailyDuaAudioMapping;
};

// Get audio number for main dua
export const getDuaAudioNumber = (duaId: string): number | null => {
  return duaAudioMapping[duaId] || null;
};

// Get audio number for daily dua
export const getDailyDuaAudioNumber = (duaId: string): number | null => {
  return dailyDuaAudioMapping[duaId] || null;
};
