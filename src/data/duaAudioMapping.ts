// Maps dua IDs to Hisnul Muslim audio file numbers
// Audio URL: https://archive.org/download/HisnulMuslimAudio_201510/n{number}.mp3
// Hisnul Muslim has ~250+ audio files numbered from n1.mp3 to n255+.mp3

// Mapping for src/data/duas.ts (main dua categories)
// Total mapped: ~65 duas from main categories
export const duaAudioMapping: Record<string, number> = {
  // ============ Daily Life Duas ============
  "daily-1": 186,   // Anger Control - أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ
  "daily-2": 177,   // Before Eating - بِسْمِ اللَّهِ
  "daily-3": 178,   // After Eating - الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي
  "daily-4": 105,   // Before Sleeping - بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا
  "daily-5": 1,     // After Waking Up - الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا
  "daily-6": 9,     // Entering Toilet - اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ
  "daily-7": 10,    // Leaving Toilet - غُفْرَانَكَ
  "daily-8": 18,    // Leaving Home - بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ
  "daily-9": 17,    // Entering Home - بِسْمِ اللَّهِ وَلَجْنَا
  "daily-10": 15,   // Entering Mosque - اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ
  "daily-11": 16,   // Leaving Mosque - اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ
  "daily-13": 132,  // When Afraid - حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ
  "daily-14": 120,  // Anxiety Relief - اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ
  "daily-15": 156,  // During Rain - اللَّهُمَّ صَيِّبًا نَافِعًا
  "daily-16": 157,  // After Rain - مُطِرْنَا بِفَضْلِ اللَّهِ وَرَحْمَتِهِ
  "daily-17": 213,  // Travel Start - سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا
  "daily-18": 218,  // Return from Travel - آيِبُونَ تَائِبُونَ عَابِدُونَ
  "daily-19": 121,  // Debt Relief - اللَّهُمَّ اكْفِنِي بِحَلَالِكَ
  "daily-20": 122,  // Distress - لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ
  "daily-22": 81,   // Protection from Evil - اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا خَلَقْتَ
  "daily-26": 93,   // Night Protection - أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ
  "daily-27": 77,   // Health and Wellness - اللَّهُمَّ عَافِنِي فِي بَدَنِي
  "daily-28": 76,   // Gratitude - اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ
  "daily-40": 69,   // Morning Protection - أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ
  "daily-41": 70,   // Evening Protection - أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ
  "daily-42": 100,  // Protection from Hellfire - اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ
  "daily-45": 44,   // Light in Heart - اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا
  "daily-46": 93,   // Protection from Evil Eye - أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ
  "daily-47": 123,  // Relief from Worry - اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا

  // ============ Morning Evening Duas ============
  "morning-1": 69,  // Morning remembrance - أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ
  "morning-2": 82,  // Ayatul Kursi morning (part of morning adhkar)
  "morning-3": 83,  // Surahs (Al-Ikhlas, Al-Falaq, An-Nas)
  "morning-4": 75,  // Sayyidul Istighfar

  // ============ Prayer Duas ============
  "prayer-1": 23,   // Starting prayer - سُبْحَانَكَ اللَّهُمَّ
  "prayer-2": 36,   // Tashahhud - التَّحِيَّاتُ لِلَّهِ
  "prayer-3": 38,   // Durood Ibrahim
  "prayer-4": 140,  // Istikharah - اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ

  // ============ Protection Duas ============
  "protection-1": 81, // General protection - اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا خَلَقْتَ
  "protection-3": 93, // Evil eye protection

  // ============ Sickness Duas ============
  "sickness-1": 141,  // When sick - أَذْهِبِ الْبَأْسَ
  "sickness-2": 143,  // Visiting sick

  // ============ Food Duas ============
  "food-1": 177,    // Before eating - بِسْمِ اللَّهِ
  "food-2": 178,    // After eating - الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي
  "food-3": 181,    // When breaking fast
  "food-4": 182,    // Dua for host

  // ============ Death/Funeral Duas ============
  "death-1": 161,   // Condolence dua
  "death-2": 162,   // Janaza dua

  // ============ Travel Duas ============
  "travel-1": 213,  // Starting journey
  "travel-2": 218,  // Return from travel
};

// Mapping for src/data/dailyDuas.ts (daily dua page)
// Total mapped: ~45 duas from daily dua categories
export const dailyDuaAudioMapping: Record<string, number> = {
  // ============ Salah/Prayer Duas ============
  "thana-sana": 23,        // Opening dua - سُبْحَانَكَ اللَّهُمَّ
  "ruku-dua": 26,          // Tasbeeh in Ruku - سُبْحَانَ رَبِّيَ الْعَظِيمِ
  "ruku-rise-dua": 27,     // Rising from Ruku - سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ
  "sujud-dua": 29,         // Tasbeeh in Sujud - سُبْحَانَ رَبِّيَ الْأَعْلَىٰ
  "sujud-extra-dua": 30,   // Extra Dua in Sujud - سُبْحَانَكَ اللَّهُمَّ رَبَّنَا
  "between-sujud-dua": 31, // Between Sujud - رَبِّ اغْفِرْ لِي
  "tashahhud": 36,         // At-Tahiyyat
  "durood-ibrahim": 38,    // Durood Ibrahim
  "before-salam-dua": 39,  // Dua before salam - اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ

  // ============ After Salah Duas ============
  "astaghfirullah": 57,    // Astaghfirullah
  "antas-salam": 58,       // Allahumma Antas-Salam
  "ayatul-kursi": 59,      // Ayatul Kursi after salah
  "tasbeeh-33": 60,        // 33 Tasbeehat - SubhanAllah, Alhamdulillah, Allahu Akbar
  "la-ilaha-illallah": 61, // La ilaha illallah wahdahu
  "la-hawla": 62,          // La hawla wala quwwata

  // ============ Eid Duas ============
  "eid-takbeer": 167,      // Eid Takbeer
  "qurbani-dua": 170,      // Qurbani dua - بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ

  // ============ Janaza/Funeral Duas ============
  "janaza-adult-male": 161, // Adult janaza dua
  "janaza-child": 163,      // Child janaza dua
  "visiting-grave": 164,    // Visiting grave - السَّلَامُ عَلَيْكُمْ أَهْلَ الدِّيَارِ
  "lowering-into-grave": 165, // Lowering into grave - بِسْمِ اللَّهِ وَعَلَىٰ مِلَّةِ رَسُولِ اللَّهِ

  // ============ Daily Life Duas ============
  "before-sleep": 105,     // Before sleeping - اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا
  "after-waking": 1,       // After waking up - الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا
  "before-eating": 177,    // Before eating - بِسْمِ اللَّهِ
  "after-eating": 178,     // After eating - الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي
  "entering-home": 17,     // Entering home - بِسْمِ اللَّهِ وَلَجْنَا
  "leaving-home": 18,      // Leaving home - بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ
  "entering-bathroom": 9,  // Entering bathroom - اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ
  "leaving-bathroom": 10,  // Leaving bathroom - غُفْرَانَكَ

  // ============ Mosque Duas ============
  "entering-mosque": 15,   // Entering mosque - اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ
  "leaving-mosque": 16,    // Leaving mosque - اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ

  // ============ Travel Duas ============
  "starting-journey": 213,      // Starting journey - سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا
  "travel-complete-dua": 214,   // Complete travel dua

  // ============ Wudu Duas ============
  "before-wudu": 6,             // Before wudu - بِسْمِ اللَّهِ
  "after-wudu": 7,              // After wudu - أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ
  "after-wudu-complete": 8,     // Complete dua after wudu
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
