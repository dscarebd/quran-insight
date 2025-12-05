export interface Surah {
  number: number;
  nameArabic: string;
  nameEnglish: string;
  nameBengali: string;
  meaningEnglish: string;
  meaningBengali: string;
  totalVerses: number;
  revelationType: 'Meccan' | 'Medinan';
}

export const surahs: Surah[] = [
  { number: 1, nameArabic: "الفاتحة", nameEnglish: "Al-Faatiha", nameBengali: "আল-ফাতিহা", meaningEnglish: "The Opening", meaningBengali: "শুরু", totalVerses: 7, revelationType: "Meccan" },
  { number: 2, nameArabic: "البقرة", nameEnglish: "Al-Baqara", nameBengali: "আল-বাকারা", meaningEnglish: "The Cow", meaningBengali: "গরু", totalVerses: 286, revelationType: "Medinan" },
  { number: 3, nameArabic: "آل عمران", nameEnglish: "Aal-i-Imraan", nameBengali: "আলে ইমরান", meaningEnglish: "The Family of Imraan", meaningBengali: "ইমরানের পরিবার", totalVerses: 200, revelationType: "Medinan" },
  { number: 4, nameArabic: "النساء", nameEnglish: "An-Nisaa", nameBengali: "আন-নিসা", meaningEnglish: "The Women", meaningBengali: "নারী", totalVerses: 176, revelationType: "Medinan" },
  { number: 5, nameArabic: "المائدة", nameEnglish: "Al-Maaida", nameBengali: "আল-মায়িদা", meaningEnglish: "The Table", meaningBengali: "খাদ্য পরিবেশিত টেবিল", totalVerses: 120, revelationType: "Medinan" },
  { number: 6, nameArabic: "الأنعام", nameEnglish: "Al-An'aam", nameBengali: "আল-আনআম", meaningEnglish: "The Cattle", meaningBengali: "গবাদি পশু", totalVerses: 165, revelationType: "Meccan" },
  { number: 7, nameArabic: "الأعراف", nameEnglish: "Al-A'raaf", nameBengali: "আল-আরাফ", meaningEnglish: "The Heights", meaningBengali: "উচ্চস্থান", totalVerses: 206, revelationType: "Meccan" },
  { number: 8, nameArabic: "الأنفال", nameEnglish: "Al-Anfaal", nameBengali: "আল-আনফাল", meaningEnglish: "The Spoils of War", meaningBengali: "যুদ্ধলব্ধ সম্পদ", totalVerses: 75, revelationType: "Medinan" },
  { number: 9, nameArabic: "التوبة", nameEnglish: "At-Tawba", nameBengali: "আত-তাওবা", meaningEnglish: "The Repentance", meaningBengali: "তাওবা", totalVerses: 129, revelationType: "Medinan" },
  { number: 10, nameArabic: "يونس", nameEnglish: "Yunus", nameBengali: "ইউনুস", meaningEnglish: "Jonah", meaningBengali: "ইউনুস", totalVerses: 109, revelationType: "Meccan" },
  { number: 11, nameArabic: "هود", nameEnglish: "Hud", nameBengali: "হুদ", meaningEnglish: "Hud", meaningBengali: "হুদ", totalVerses: 123, revelationType: "Meccan" },
  { number: 12, nameArabic: "يوسف", nameEnglish: "Yusuf", nameBengali: "ইউসুফ", meaningEnglish: "Joseph", meaningBengali: "ইউসুফ", totalVerses: 111, revelationType: "Meccan" },
  { number: 13, nameArabic: "الرعد", nameEnglish: "Ar-Ra'd", nameBengali: "আর-রাদ", meaningEnglish: "The Thunder", meaningBengali: "বজ্র", totalVerses: 43, revelationType: "Medinan" },
  { number: 14, nameArabic: "إبراهيم", nameEnglish: "Ibrahim", nameBengali: "ইবরাহীম", meaningEnglish: "Abraham", meaningBengali: "ইবরাহীম", totalVerses: 52, revelationType: "Meccan" },
  { number: 15, nameArabic: "الحجر", nameEnglish: "Al-Hijr", nameBengali: "আল-হিজর", meaningEnglish: "The Rocky Tract", meaningBengali: "পাথুরে পাহাড়", totalVerses: 99, revelationType: "Meccan" },
  { number: 16, nameArabic: "النحل", nameEnglish: "An-Nahl", nameBengali: "আন-নাহল", meaningEnglish: "The Bee", meaningBengali: "মৌমাছি", totalVerses: 128, revelationType: "Meccan" },
  { number: 17, nameArabic: "الإسراء", nameEnglish: "Al-Israa", nameBengali: "আল-ইসরা", meaningEnglish: "The Night Journey", meaningBengali: "রাত্রি ভ্রমণ", totalVerses: 111, revelationType: "Meccan" },
  { number: 18, nameArabic: "الكهف", nameEnglish: "Al-Kahf", nameBengali: "আল-কাহফ", meaningEnglish: "The Cave", meaningBengali: "গুহা", totalVerses: 110, revelationType: "Meccan" },
  { number: 19, nameArabic: "مريم", nameEnglish: "Maryam", nameBengali: "মারইয়াম", meaningEnglish: "Mary", meaningBengali: "মারইয়াম", totalVerses: 98, revelationType: "Meccan" },
  { number: 20, nameArabic: "طه", nameEnglish: "Taa-Haa", nameBengali: "ত্ব-হা", meaningEnglish: "Taa-Haa", meaningBengali: "ত্ব-হা", totalVerses: 135, revelationType: "Meccan" },
];

export const dailyVerses = [
  {
    arabic: "يَلْبَسُونَ مِنْ سُنْدُسٍ وَإِسْتَبْرَقٍ مُتَقَابِلِينَ",
    bengali: "তারা পরিধান করবে চিকন ও পুরু রেশমীবস্ত্র, মুখোমুখি হয়ে বসবে।",
    english: "They will wear garments of fine green silk and brocade, facing one another.",
    reference: "Ad-Dukhaan 44:53",
  },
  {
    arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    bengali: "নিশ্চয়ই কষ্টের সাথে স্বস্তি আছে।",
    english: "Indeed, with hardship comes ease.",
    reference: "Ash-Sharh 94:6",
  },
  {
    arabic: "وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ",
    bengali: "আমার তাওফীক একমাত্র আল্লাহর নিকট থেকে।",
    english: "My success is only by Allah.",
    reference: "Hud 11:88",
  },
];
