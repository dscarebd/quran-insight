// Hadith book metadata - bundled with app for offline use

export interface HadithBook {
  id: string;
  slug: string;
  name_arabic: string;
  name_english: string;
  name_bengali: string;
  total_hadiths: number;
  icon: string;
  display_order: number;
}

export const hadithBooks: HadithBook[] = [
  {
    id: "43c6036b-a6ff-4805-9973-c61d26fca473",
    slug: "bukhari",
    name_arabic: "صحيح البخاري",
    name_english: "Sahih Bukhari",
    name_bengali: "সহীহ বুখারী",
    total_hadiths: 7563,
    icon: "BookOpen",
    display_order: 1
  },
  {
    id: "df52a72c-0d49-4db2-a7da-772607bebc20",
    slug: "muslim",
    name_arabic: "صحيح مسلم",
    name_english: "Sahih Muslim",
    name_bengali: "সহীহ মুসলিম",
    total_hadiths: 7563,
    icon: "BookOpen",
    display_order: 2
  },
  {
    id: "51c8abb9-837c-448a-9234-b6e756aac18d",
    slug: "abudawud",
    name_arabic: "سنن أبي داود",
    name_english: "Sunan Abu Dawud",
    name_bengali: "সুনানে আবু দাউদ",
    total_hadiths: 5274,
    icon: "BookOpen",
    display_order: 3
  },
  {
    id: "20020615-6704-45e6-882d-14a5243ccbb9",
    slug: "tirmidhi",
    name_arabic: "جامع الترمذي",
    name_english: "Jami at-Tirmidhi",
    name_bengali: "জামে তিরমিযী",
    total_hadiths: 3956,
    icon: "BookOpen",
    display_order: 4
  },
  {
    id: "1eed5cdf-1cba-4c6f-bb7a-98280f534461",
    slug: "nasai",
    name_arabic: "سنن النسائي",
    name_english: "Sunan an-Nasa'i",
    name_bengali: "সুনানে নাসাঈ",
    total_hadiths: 5758,
    icon: "BookOpen",
    display_order: 5
  },
  {
    id: "1185bc7d-5474-4149-8e3b-485a39ff19ac",
    slug: "ibnmajah",
    name_arabic: "سنن ابن ماجه",
    name_english: "Sunan Ibn Majah",
    name_bengali: "সুনানে ইবনে মাজাহ",
    total_hadiths: 4341,
    icon: "BookOpen",
    display_order: 6
  },
  {
    id: "ea050203-1474-40ac-b284-b064cdec3e87",
    slug: "malik",
    name_arabic: "موطأ مالك",
    name_english: "Muwatta Malik",
    name_bengali: "মুওয়াত্তা মালিক",
    total_hadiths: 1858,
    icon: "BookOpen",
    display_order: 7
  },
  {
    id: "c409f280-5c0c-4584-8d07-14b59108176b",
    slug: "nawawi",
    name_arabic: "الأربعون النووية",
    name_english: "Forty Hadith Nawawi",
    name_bengali: "চল্লিশ হাদিস নববী",
    total_hadiths: 42,
    icon: "BookOpen",
    display_order: 8
  },
  {
    id: "e6400573-8a76-401b-af83-dc9c73ba4ff3",
    slug: "qudsi",
    name_arabic: "الأحاديث القدسية",
    name_english: "Forty Hadith Qudsi",
    name_bengali: "চল্লিশ হাদিস কুদসী",
    total_hadiths: 40,
    icon: "BookOpen",
    display_order: 9
  },
  {
    id: "1ccbc4cc-662e-4b87-8276-7a4165461b0a",
    slug: "dehlawi",
    name_arabic: "الأربعون حديث شاه ولي الله دهلوي",
    name_english: "Forty Hadith Shah Waliullah Dehlawi",
    name_bengali: "চল্লিশ হাদিস শাহ ওয়ালী উল্লাহ দেহলভী",
    total_hadiths: 40,
    icon: "BookOpen",
    display_order: 10
  }
];

// Helper to get book by slug
export const getHadithBook = (slug: string): HadithBook | undefined => {
  return hadithBooks.find(book => book.slug === slug);
};

// Gradient colors for each book (matching HadithList.tsx)
export const bookGradients: Record<string, string> = {
  bukhari: "from-emerald-500 to-teal-600",
  muslim: "from-blue-500 to-indigo-600",
  abudawud: "from-violet-500 to-purple-600",
  tirmidhi: "from-amber-500 to-orange-600",
  nasai: "from-rose-500 to-pink-600",
  ibnmajah: "from-cyan-500 to-sky-600",
  malik: "from-lime-500 to-green-600",
  nawawi: "from-fuchsia-500 to-pink-600",
  qudsi: "from-indigo-500 to-violet-600",
  dehlawi: "from-teal-500 to-cyan-600",
};
