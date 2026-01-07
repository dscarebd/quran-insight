export interface Reciter {
  id: string;
  nameEnglish: string;
  nameBengali: string;
  nameArabic: string;
  folder: string;
  style: string;
  styleBengali: string;
  quality: string;
}

export const reciters: Reciter[] = [
  {
    id: "alafasy",
    nameEnglish: "Mishary Rashid Alafasy",
    nameBengali: "মিশারি রাশিদ আল-আফাসি",
    nameArabic: "مشاري راشد العفاسي",
    folder: "Alafasy_128kbps",
    style: "Melodious",
    styleBengali: "সুমধুর",
    quality: "128kbps"
  },
  {
    id: "abdulbasit-murattal",
    nameEnglish: "Abdul Basit (Murattal)",
    nameBengali: "আব্দুল বাসিত (মুরাত্তাল)",
    nameArabic: "عبد الباسط عبد الصمد",
    folder: "Abdul_Basit_Murattal_192kbps",
    style: "Classic Murattal",
    styleBengali: "ক্লাসিক মুরাত্তাল",
    quality: "192kbps"
  },
  {
    id: "sudais",
    nameEnglish: "Abdurrahmaan As-Sudais",
    nameBengali: "আব্দুর রহমান আস-সুদাইস",
    nameArabic: "عبدالرحمن السديس",
    folder: "Abdurrahmaan_As-Sudais_192kbps",
    style: "Emotional",
    styleBengali: "আবেগপূর্ণ",
    quality: "192kbps"
  },
  {
    id: "husary",
    nameEnglish: "Mahmoud Khalil Al-Husary",
    nameBengali: "মাহমুদ খলিল আল-হুসারি",
    nameArabic: "محمود خليل الحصري",
    folder: "Husary_128kbps",
    style: "Learning-focused",
    styleBengali: "শিক্ষামূলক",
    quality: "128kbps"
  },
  {
    id: "muaiqly",
    nameEnglish: "Maher Al Muaiqly",
    nameBengali: "মাহের আল-মুয়াইকলি",
    nameArabic: "ماهر المعيقلي",
    folder: "MaherAlMuaiqly128kbps",
    style: "Modern",
    styleBengali: "আধুনিক",
    quality: "128kbps"
  },
  {
    id: "shaatree",
    nameEnglish: "Abu Bakr Ash-Shaatree",
    nameBengali: "আবু বকর আশ-শাতরী",
    nameArabic: "أبو بكر الشاطري",
    folder: "Abu_Bakr_Ash-Shaatree_128kbps",
    style: "Mecca Imam",
    styleBengali: "মক্কার ইমাম",
    quality: "128kbps"
  },
  {
    id: "minshawi-murattal",
    nameEnglish: "Mohamed Siddiq Al-Minshawi",
    nameBengali: "মোহাম্মদ সিদ্দিক আল-মিনশাউই",
    nameArabic: "محمد صديق المنشاوي",
    folder: "Minshawy_Murattal_128kbps",
    style: "Murattal",
    styleBengali: "মুরাত্তাল",
    quality: "128kbps"
  },
  {
    id: "ajamy",
    nameEnglish: "Ahmed Al Ajamy",
    nameBengali: "আহমেদ আল আজমি",
    nameArabic: "أحمد العجمي",
    folder: "ahmed_ibn_ali_al_ajamy_128kbps",
    style: "Clear",
    styleBengali: "স্পষ্ট",
    quality: "128kbps"
  },
  {
    id: "qatami",
    nameEnglish: "Nasser Al-Qatami",
    nameBengali: "নাসের আল-কাতামি",
    nameArabic: "ناصر القطامي",
    folder: "Nasser_Alqatami_128kbps",
    style: "Emotional",
    styleBengali: "আবেগপূর্ণ",
    quality: "128kbps"
  },
  {
    id: "dussary",
    nameEnglish: "Yasser Al-Dosari",
    nameBengali: "ইয়াসির আল-দোসারি",
    nameArabic: "ياسر الدوسري",
    folder: "Yasser_Ad-Dussary_128kbps",
    style: "Beautiful",
    styleBengali: "সুন্দর",
    quality: "128kbps"
  },
  {
    id: "rifai",
    nameEnglish: "Hani Ar-Rifai",
    nameBengali: "হানি আর-রিফাই",
    nameArabic: "هاني الرفاعي",
    folder: "Hani_Rifai_192kbps",
    style: "Melodious",
    styleBengali: "সুমধুর",
    quality: "192kbps"
  }
];

export const getReciterById = (id: string): Reciter | undefined => {
  return reciters.find(r => r.id === id);
};

export const DEFAULT_RECITER_ID = "alafasy";
