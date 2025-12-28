// Bangladesh Administrative Divisions with GPS Coordinates
// 8 Divisions → 64 Districts → 495+ Upazilas

export interface Upazila {
  id: string;
  name_en: string;
  name_bn: string;
  latitude: number;
  longitude: number;
}

export interface District {
  id: string;
  name_en: string;
  name_bn: string;
  upazilas: Upazila[];
}

export interface Division {
  id: string;
  name_en: string;
  name_bn: string;
  districts: District[];
}

export const bangladeshDivisions: Division[] = [
  // ==================== DHAKA DIVISION ====================
  {
    id: "dhaka",
    name_en: "Dhaka",
    name_bn: "ঢাকা",
    districts: [
      {
        id: "dhaka",
        name_en: "Dhaka",
        name_bn: "ঢাকা",
        upazilas: [
          { id: "dhamrai", name_en: "Dhamrai", name_bn: "ধামরাই", latitude: 23.9166, longitude: 90.1333 },
          { id: "dohar", name_en: "Dohar", name_bn: "দোহার", latitude: 23.5833, longitude: 90.1333 },
          { id: "keraniganj", name_en: "Keraniganj", name_bn: "কেরানীগঞ্জ", latitude: 23.6988, longitude: 90.3428 },
          { id: "nawabganj", name_en: "Nawabganj", name_bn: "নবাবগঞ্জ", latitude: 23.7000, longitude: 90.0833 },
          { id: "savar", name_en: "Savar", name_bn: "সাভার", latitude: 23.8583, longitude: 90.2666 },
          { id: "dhaka_north", name_en: "Dhaka North", name_bn: "ঢাকা উত্তর", latitude: 23.8103, longitude: 90.4125 },
          { id: "dhaka_south", name_en: "Dhaka South", name_bn: "ঢাকা দক্ষিণ", latitude: 23.7104, longitude: 90.4074 },
        ]
      },
      {
        id: "faridpur",
        name_en: "Faridpur",
        name_bn: "ফরিদপুর",
        upazilas: [
          { id: "alfadanga", name_en: "Alfadanga", name_bn: "আলফাডাঙ্গা", latitude: 23.2667, longitude: 89.7333 },
          { id: "bhanga", name_en: "Bhanga", name_bn: "ভাঙ্গা", latitude: 23.3833, longitude: 89.9667 },
          { id: "boalmari", name_en: "Boalmari", name_bn: "বোয়ালমারী", latitude: 23.3833, longitude: 89.6833 },
          { id: "charbhadrasan", name_en: "Charbhadrasan", name_bn: "চরভদ্রাসন", latitude: 23.6000, longitude: 89.8000 },
          { id: "faridpur_sadar", name_en: "Faridpur Sadar", name_bn: "ফরিদপুর সদর", latitude: 23.6000, longitude: 89.8500 },
          { id: "madhukhali", name_en: "Madhukhali", name_bn: "মধুখালী", latitude: 23.5000, longitude: 89.6167 },
          { id: "nagarkanda", name_en: "Nagarkanda", name_bn: "নগরকান্দা", latitude: 23.4500, longitude: 89.9000 },
          { id: "sadarpur", name_en: "Sadarpur", name_bn: "সদরপুর", latitude: 23.5000, longitude: 89.9500 },
          { id: "saltha", name_en: "Saltha", name_bn: "সালথা", latitude: 23.3500, longitude: 89.6000 },
        ]
      },
      {
        id: "gazipur",
        name_en: "Gazipur",
        name_bn: "গাজীপুর",
        upazilas: [
          { id: "gazipur_sadar", name_en: "Gazipur Sadar", name_bn: "গাজীপুর সদর", latitude: 23.9999, longitude: 90.4203 },
          { id: "kaliakair", name_en: "Kaliakair", name_bn: "কালিয়াকৈর", latitude: 24.0667, longitude: 90.2167 },
          { id: "kaliganj", name_en: "Kaliganj", name_bn: "কালীগঞ্জ", latitude: 24.0833, longitude: 90.5000 },
          { id: "kapasia", name_en: "Kapasia", name_bn: "কাপাসিয়া", latitude: 24.1167, longitude: 90.5833 },
          { id: "sreepur", name_en: "Sreepur", name_bn: "শ্রীপুর", latitude: 24.2000, longitude: 90.4833 },
        ]
      },
      {
        id: "gopalganj",
        name_en: "Gopalganj",
        name_bn: "গোপালগঞ্জ",
        upazilas: [
          { id: "gopalganj_sadar", name_en: "Gopalganj Sadar", name_bn: "গোপালগঞ্জ সদর", latitude: 23.0050, longitude: 89.8266 },
          { id: "kashiani", name_en: "Kashiani", name_bn: "কাশিয়ানী", latitude: 23.0833, longitude: 89.9333 },
          { id: "kotalipara", name_en: "Kotalipara", name_bn: "কোটালীপাড়া", latitude: 22.9667, longitude: 89.9500 },
          { id: "muksudpur", name_en: "Muksudpur", name_bn: "মুকসুদপুর", latitude: 23.0833, longitude: 89.7500 },
          { id: "tungipara", name_en: "Tungipara", name_bn: "টুঙ্গিপাড়া", latitude: 22.9000, longitude: 89.9000 },
        ]
      },
      {
        id: "kishoreganj",
        name_en: "Kishoreganj",
        name_bn: "কিশোরগঞ্জ",
        upazilas: [
          { id: "austagram", name_en: "Austagram", name_bn: "অষ্টগ্রাম", latitude: 24.3833, longitude: 91.0167 },
          { id: "bajitpur", name_en: "Bajitpur", name_bn: "বাজিতপুর", latitude: 24.2167, longitude: 90.9500 },
          { id: "bhairab", name_en: "Bhairab", name_bn: "ভৈরব", latitude: 24.0500, longitude: 90.9833 },
          { id: "hossainpur", name_en: "Hossainpur", name_bn: "হোসেনপুর", latitude: 24.4500, longitude: 90.7833 },
          { id: "itna", name_en: "Itna", name_bn: "ইটনা", latitude: 24.5500, longitude: 91.0833 },
          { id: "karimganj", name_en: "Karimganj", name_bn: "করিমগঞ্জ", latitude: 24.3833, longitude: 90.7667 },
          { id: "katiadi", name_en: "Katiadi", name_bn: "কটিয়াদী", latitude: 24.1333, longitude: 90.8167 },
          { id: "kishoreganj_sadar", name_en: "Kishoreganj Sadar", name_bn: "কিশোরগঞ্জ সদর", latitude: 24.4333, longitude: 90.7833 },
          { id: "kuliarchar", name_en: "Kuliarchar", name_bn: "কুলিয়ারচর", latitude: 24.0500, longitude: 90.8500 },
          { id: "mithamain", name_en: "Mithamain", name_bn: "মিঠামইন", latitude: 24.5000, longitude: 91.1333 },
          { id: "nikli", name_en: "Nikli", name_bn: "নিকলী", latitude: 24.4167, longitude: 90.9333 },
          { id: "pakundia", name_en: "Pakundia", name_bn: "পাকুন্দিয়া", latitude: 24.3500, longitude: 90.6833 },
          { id: "tarail", name_en: "Tarail", name_bn: "তাড়াইল", latitude: 24.5167, longitude: 90.8500 },
        ]
      },
      {
        id: "madaripur",
        name_en: "Madaripur",
        name_bn: "মাদারীপুর",
        upazilas: [
          { id: "kalkini", name_en: "Kalkini", name_bn: "কালকিনি", latitude: 23.0667, longitude: 90.2167 },
          { id: "madaripur_sadar", name_en: "Madaripur Sadar", name_bn: "মাদারীপুর সদর", latitude: 23.1660, longitude: 90.1871 },
          { id: "rajoir", name_en: "Rajoir", name_bn: "রাজৈর", latitude: 23.2167, longitude: 90.1167 },
          { id: "shibchar", name_en: "Shibchar", name_bn: "শিবচর", latitude: 23.3167, longitude: 90.1667 },
        ]
      },
      {
        id: "manikganj",
        name_en: "Manikganj",
        name_bn: "মানিকগঞ্জ",
        upazilas: [
          { id: "daulatpur", name_en: "Daulatpur", name_bn: "দৌলতপুর", latitude: 23.8667, longitude: 89.9333 },
          { id: "ghior", name_en: "Ghior", name_bn: "ঘিওর", latitude: 23.8833, longitude: 90.0000 },
          { id: "harirampur", name_en: "Harirampur", name_bn: "হরিরামপুর", latitude: 23.7500, longitude: 89.9500 },
          { id: "manikganj_sadar", name_en: "Manikganj Sadar", name_bn: "মানিকগঞ্জ সদর", latitude: 23.8617, longitude: 90.0047 },
          { id: "saturia", name_en: "Saturia", name_bn: "সাটুরিয়া", latitude: 23.8167, longitude: 90.0833 },
          { id: "shivalaya", name_en: "Shivalaya", name_bn: "শিবালয়", latitude: 23.7167, longitude: 89.8833 },
          { id: "singair", name_en: "Singair", name_bn: "সিংগাইর", latitude: 23.8000, longitude: 90.1667 },
        ]
      },
      {
        id: "munshiganj",
        name_en: "Munshiganj",
        name_bn: "মুন্সিগঞ্জ",
        upazilas: [
          { id: "gazaria", name_en: "Gazaria", name_bn: "গজারিয়া", latitude: 23.5500, longitude: 90.5667 },
          { id: "lohajang", name_en: "Lohajang", name_bn: "লোহাজং", latitude: 23.4167, longitude: 90.3667 },
          { id: "munshiganj_sadar", name_en: "Munshiganj Sadar", name_bn: "মুন্সিগঞ্জ সদর", latitude: 23.5422, longitude: 90.5305 },
          { id: "sirajdikhan", name_en: "Sirajdikhan", name_bn: "সিরাজদিখান", latitude: 23.4833, longitude: 90.4000 },
          { id: "sreenagar", name_en: "Sreenagar", name_bn: "শ্রীনগর", latitude: 23.3833, longitude: 90.2833 },
          { id: "tongibari", name_en: "Tongibari", name_bn: "টঙ্গীবাড়ী", latitude: 23.4833, longitude: 90.5333 },
        ]
      },
      {
        id: "narayanganj",
        name_en: "Narayanganj",
        name_bn: "নারায়ণগঞ্জ",
        upazilas: [
          { id: "araihazar", name_en: "Araihazar", name_bn: "আড়াইহাজার", latitude: 23.7667, longitude: 90.6500 },
          { id: "bandar", name_en: "Bandar", name_bn: "বন্দর", latitude: 23.6167, longitude: 90.5500 },
          { id: "narayanganj_sadar", name_en: "Narayanganj Sadar", name_bn: "নারায়ণগঞ্জ সদর", latitude: 23.6238, longitude: 90.5000 },
          { id: "rupganj", name_en: "Rupganj", name_bn: "রূপগঞ্জ", latitude: 23.8000, longitude: 90.5333 },
          { id: "sonargaon", name_en: "Sonargaon", name_bn: "সোনারগাঁও", latitude: 23.7333, longitude: 90.6167 },
        ]
      },
      {
        id: "narsingdi",
        name_en: "Narsingdi",
        name_bn: "নরসিংদী",
        upazilas: [
          { id: "belabo", name_en: "Belabo", name_bn: "বেলাবো", latitude: 24.0833, longitude: 90.7167 },
          { id: "monohardi", name_en: "Monohardi", name_bn: "মনোহরদী", latitude: 24.1667, longitude: 90.6667 },
          { id: "narsingdi_sadar", name_en: "Narsingdi Sadar", name_bn: "নরসিংদী সদর", latitude: 23.9322, longitude: 90.7150 },
          { id: "palash", name_en: "Palash", name_bn: "পলাশ", latitude: 24.0333, longitude: 90.6167 },
          { id: "raipura", name_en: "Raipura", name_bn: "রায়পুরা", latitude: 23.9833, longitude: 90.7500 },
          { id: "shibpur", name_en: "Shibpur", name_bn: "শিবপুর", latitude: 24.0000, longitude: 90.8000 },
        ]
      },
      {
        id: "rajbari",
        name_en: "Rajbari",
        name_bn: "রাজবাড়ী",
        upazilas: [
          { id: "baliakandi", name_en: "Baliakandi", name_bn: "বালিয়াকান্দি", latitude: 23.4500, longitude: 89.5667 },
          { id: "goalandaghat", name_en: "Goalandaghat", name_bn: "গোয়ালন্দঘাট", latitude: 23.7333, longitude: 89.5333 },
          { id: "kalukhali", name_en: "Kalukhali", name_bn: "কালুখালী", latitude: 23.5500, longitude: 89.4833 },
          { id: "pangsha", name_en: "Pangsha", name_bn: "পাংশা", latitude: 23.5000, longitude: 89.4333 },
          { id: "rajbari_sadar", name_en: "Rajbari Sadar", name_bn: "রাজবাড়ী সদর", latitude: 23.7500, longitude: 89.6500 },
        ]
      },
      {
        id: "shariatpur",
        name_en: "Shariatpur",
        name_bn: "শরীয়তপুর",
        upazilas: [
          { id: "bhedarganj", name_en: "Bhedarganj", name_bn: "ভেদরগঞ্জ", latitude: 23.1833, longitude: 90.4500 },
          { id: "damudya", name_en: "Damudya", name_bn: "ডামুড্যা", latitude: 23.2500, longitude: 90.3167 },
          { id: "gosairhat", name_en: "Gosairhat", name_bn: "গোসাইরহাট", latitude: 23.0500, longitude: 90.2500 },
          { id: "naria", name_en: "Naria", name_bn: "নড়িয়া", latitude: 23.2500, longitude: 90.4500 },
          { id: "shariatpur_sadar", name_en: "Shariatpur Sadar", name_bn: "শরীয়তপুর সদর", latitude: 23.2420, longitude: 90.4346 },
          { id: "janjira", name_en: "Janjira", name_bn: "জাজিরা", latitude: 23.2833, longitude: 90.3000 },
        ]
      },
      {
        id: "tangail",
        name_en: "Tangail",
        name_bn: "টাঙ্গাইল",
        upazilas: [
          { id: "basail", name_en: "Basail", name_bn: "বাসাইল", latitude: 24.2500, longitude: 89.9500 },
          { id: "bhuapur", name_en: "Bhuapur", name_bn: "ভূঞাপুর", latitude: 24.4667, longitude: 89.9167 },
          { id: "delduar", name_en: "Delduar", name_bn: "দেলদুয়ার", latitude: 24.2167, longitude: 89.8167 },
          { id: "dhanbari", name_en: "Dhanbari", name_bn: "ধনবাড়ী", latitude: 24.6500, longitude: 89.9000 },
          { id: "ghatail", name_en: "Ghatail", name_bn: "ঘাটাইল", latitude: 24.4000, longitude: 90.0500 },
          { id: "gopalpur", name_en: "Gopalpur", name_bn: "গোপালপুর", latitude: 24.5500, longitude: 89.9000 },
          { id: "kalihati", name_en: "Kalihati", name_bn: "কালিহাতী", latitude: 24.3667, longitude: 89.9333 },
          { id: "madhupur", name_en: "Madhupur", name_bn: "মধুপুর", latitude: 24.7500, longitude: 90.0167 },
          { id: "mirzapur", name_en: "Mirzapur", name_bn: "মির্জাপুর", latitude: 24.1500, longitude: 90.0833 },
          { id: "nagarpur", name_en: "Nagarpur", name_bn: "নাগরপুর", latitude: 24.0833, longitude: 89.8500 },
          { id: "sakhipur", name_en: "Sakhipur", name_bn: "সখিপুর", latitude: 24.3167, longitude: 90.2000 },
          { id: "tangail_sadar", name_en: "Tangail Sadar", name_bn: "টাঙ্গাইল সদর", latitude: 24.2513, longitude: 89.9160 },
        ]
      },
    ]
  },
  // ==================== CHATTOGRAM DIVISION ====================
  {
    id: "chattogram",
    name_en: "Chattogram",
    name_bn: "চট্টগ্রাম",
    districts: [
      {
        id: "bandarban",
        name_en: "Bandarban",
        name_bn: "বান্দরবান",
        upazilas: [
          { id: "alikadam", name_en: "Alikadam", name_bn: "আলীকদম", latitude: 21.6667, longitude: 92.3000 },
          { id: "bandarban_sadar", name_en: "Bandarban Sadar", name_bn: "বান্দরবান সদর", latitude: 22.1953, longitude: 92.2184 },
          { id: "lama", name_en: "Lama", name_bn: "লামা", latitude: 21.7833, longitude: 92.2000 },
          { id: "naikhongchhari", name_en: "Naikhongchhari", name_bn: "নাইক্ষ্যংছড়ি", latitude: 21.5333, longitude: 92.3167 },
          { id: "rowangchhari", name_en: "Rowangchhari", name_bn: "রোয়াংছড়ি", latitude: 22.3667, longitude: 92.2000 },
          { id: "ruma", name_en: "Ruma", name_bn: "রুমা", latitude: 22.1000, longitude: 92.4167 },
          { id: "thanchi", name_en: "Thanchi", name_bn: "থানচি", latitude: 21.8500, longitude: 92.4667 },
        ]
      },
      {
        id: "brahmanbaria",
        name_en: "Brahmanbaria",
        name_bn: "ব্রাহ্মণবাড়িয়া",
        upazilas: [
          { id: "akhaura", name_en: "Akhaura", name_bn: "আখাউড়া", latitude: 23.8833, longitude: 91.2833 },
          { id: "ashuganj", name_en: "Ashuganj", name_bn: "আশুগঞ্জ", latitude: 23.9833, longitude: 90.9833 },
          { id: "bancharampur", name_en: "Bancharampur", name_bn: "বাঞ্ছারামপুর", latitude: 23.9167, longitude: 90.8833 },
          { id: "bijoynagar", name_en: "Bijoynagar", name_bn: "বিজয়নগর", latitude: 23.8667, longitude: 91.2000 },
          { id: "brahmanbaria_sadar", name_en: "Brahmanbaria Sadar", name_bn: "ব্রাহ্মণবাড়িয়া সদর", latitude: 23.9608, longitude: 91.1115 },
          { id: "kasba", name_en: "Kasba", name_bn: "কসবা", latitude: 23.8000, longitude: 91.1333 },
          { id: "nabinagar", name_en: "Nabinagar", name_bn: "নবীনগর", latitude: 23.8000, longitude: 91.0000 },
          { id: "nasirnagar", name_en: "Nasirnagar", name_bn: "নাসিরনগর", latitude: 24.0833, longitude: 91.0833 },
          { id: "sarail", name_en: "Sarail", name_bn: "সরাইল", latitude: 24.0167, longitude: 91.1333 },
        ]
      },
      {
        id: "chandpur",
        name_en: "Chandpur",
        name_bn: "চাঁদপুর",
        upazilas: [
          { id: "chandpur_sadar", name_en: "Chandpur Sadar", name_bn: "চাঁদপুর সদর", latitude: 23.2333, longitude: 90.6667 },
          { id: "faridganj", name_en: "Faridganj", name_bn: "ফরিদগঞ্জ", latitude: 23.1500, longitude: 90.7333 },
          { id: "haimchar", name_en: "Haimchar", name_bn: "হাইমচর", latitude: 23.2000, longitude: 90.5333 },
          { id: "haziganj", name_en: "Haziganj", name_bn: "হাজীগঞ্জ", latitude: 23.4000, longitude: 90.8667 },
          { id: "kachua", name_en: "Kachua", name_bn: "কচুয়া", latitude: 23.3333, longitude: 90.7667 },
          { id: "matlab_dakshin", name_en: "Matlab Dakshin", name_bn: "মতলব দক্ষিণ", latitude: 23.2833, longitude: 90.7333 },
          { id: "matlab_uttar", name_en: "Matlab Uttar", name_bn: "মতলব উত্তর", latitude: 23.3333, longitude: 90.6833 },
          { id: "shahrasti", name_en: "Shahrasti", name_bn: "শাহরাস্তি", latitude: 23.2500, longitude: 90.8833 },
        ]
      },
      {
        id: "chattogram",
        name_en: "Chattogram",
        name_bn: "চট্টগ্রাম",
        upazilas: [
          { id: "anwara", name_en: "Anwara", name_bn: "আনোয়ারা", latitude: 22.2333, longitude: 91.8833 },
          { id: "banshkhali", name_en: "Banshkhali", name_bn: "বাঁশখালী", latitude: 22.0000, longitude: 91.9333 },
          { id: "boalkhali", name_en: "Boalkhali", name_bn: "বোয়ালখালী", latitude: 22.3833, longitude: 91.9333 },
          { id: "chandanaish", name_en: "Chandanaish", name_bn: "চন্দনাইশ", latitude: 22.1833, longitude: 92.0167 },
          { id: "chattogram_city", name_en: "Chattogram City", name_bn: "চট্টগ্রাম শহর", latitude: 22.3569, longitude: 91.7832 },
          { id: "fatikchhari", name_en: "Fatikchhari", name_bn: "ফটিকছড়ি", latitude: 22.7000, longitude: 91.7500 },
          { id: "hathazari", name_en: "Hathazari", name_bn: "হাটহাজারী", latitude: 22.5167, longitude: 91.8000 },
          { id: "lohagara", name_en: "Lohagara", name_bn: "লোহাগাড়া", latitude: 22.0833, longitude: 92.0167 },
          { id: "mirsharai", name_en: "Mirsharai", name_bn: "মীরসরাই", latitude: 22.7667, longitude: 91.5833 },
          { id: "patiya", name_en: "Patiya", name_bn: "পটিয়া", latitude: 22.3000, longitude: 91.9833 },
          { id: "rangunia", name_en: "Rangunia", name_bn: "রাঙ্গুনিয়া", latitude: 22.4500, longitude: 92.0833 },
          { id: "raozan", name_en: "Raozan", name_bn: "রাউজান", latitude: 22.5333, longitude: 91.9333 },
          { id: "sandwip", name_en: "Sandwip", name_bn: "সন্দ্বীপ", latitude: 22.5167, longitude: 91.5333 },
          { id: "satkania", name_en: "Satkania", name_bn: "সাতকানিয়া", latitude: 22.1167, longitude: 92.0833 },
          { id: "sitakunda", name_en: "Sitakunda", name_bn: "সীতাকুণ্ড", latitude: 22.6333, longitude: 91.6500 },
        ]
      },
      {
        id: "comilla",
        name_en: "Comilla",
        name_bn: "কুমিল্লা",
        upazilas: [
          { id: "barura", name_en: "Barura", name_bn: "বরুড়া", latitude: 23.3167, longitude: 91.0667 },
          { id: "brahmanpara", name_en: "Brahmanpara", name_bn: "ব্রাহ্মণপাড়া", latitude: 23.6167, longitude: 91.1000 },
          { id: "burichang", name_en: "Burichang", name_bn: "বুড়িচং", latitude: 23.5333, longitude: 91.2000 },
          { id: "chandina", name_en: "Chandina", name_bn: "চান্দিনা", latitude: 23.4333, longitude: 91.1000 },
          { id: "chauddagram", name_en: "Chauddagram", name_bn: "চৌদ্দগ্রাম", latitude: 23.2333, longitude: 91.2667 },
          { id: "comilla_adarsha_sadar", name_en: "Comilla Adarsha Sadar", name_bn: "কুমিল্লা আদর্শ সদর", latitude: 23.4607, longitude: 91.1809 },
          { id: "comilla_sadar_dakshin", name_en: "Comilla Sadar Dakshin", name_bn: "কুমিল্লা সদর দক্ষিণ", latitude: 23.4167, longitude: 91.1500 },
          { id: "daudkandi", name_en: "Daudkandi", name_bn: "দাউদকান্দি", latitude: 23.5333, longitude: 90.8333 },
          { id: "debidwar", name_en: "Debidwar", name_bn: "দেবীদ্বার", latitude: 23.7333, longitude: 91.0333 },
          { id: "homna", name_en: "Homna", name_bn: "হোমনা", latitude: 23.6167, longitude: 90.8000 },
          { id: "laksam", name_en: "Laksam", name_bn: "লাকসাম", latitude: 23.2500, longitude: 91.1333 },
          { id: "meghna", name_en: "Meghna", name_bn: "মেঘনা", latitude: 23.5000, longitude: 90.7667 },
          { id: "monohargonj", name_en: "Monohargonj", name_bn: "মনোহরগঞ্জ", latitude: 23.2833, longitude: 91.1833 },
          { id: "muradnagar", name_en: "Muradnagar", name_bn: "মুরাদনগর", latitude: 23.7000, longitude: 90.9333 },
          { id: "nangalkot", name_en: "Nangalkot", name_bn: "নাঙ্গলকোট", latitude: 23.2000, longitude: 91.1833 },
          { id: "titas", name_en: "Titas", name_bn: "তিতাস", latitude: 23.5833, longitude: 90.8833 },
        ]
      },
      {
        id: "coxs_bazar",
        name_en: "Cox's Bazar",
        name_bn: "কক্সবাজার",
        upazilas: [
          { id: "chakaria", name_en: "Chakaria", name_bn: "চকরিয়া", latitude: 21.7333, longitude: 92.0333 },
          { id: "coxs_bazar_sadar", name_en: "Cox's Bazar Sadar", name_bn: "কক্সবাজার সদর", latitude: 21.4272, longitude: 92.0058 },
          { id: "kutubdia", name_en: "Kutubdia", name_bn: "কুতুবদিয়া", latitude: 21.8333, longitude: 91.8500 },
          { id: "maheshkhali", name_en: "Maheshkhali", name_bn: "মহেশখালী", latitude: 21.5500, longitude: 91.9500 },
          { id: "pekua", name_en: "Pekua", name_bn: "পেকুয়া", latitude: 21.6667, longitude: 92.0000 },
          { id: "ramu", name_en: "Ramu", name_bn: "রামু", latitude: 21.4333, longitude: 92.1000 },
          { id: "teknaf", name_en: "Teknaf", name_bn: "টেকনাফ", latitude: 20.8667, longitude: 92.3000 },
          { id: "ukhia", name_en: "Ukhia", name_bn: "উখিয়া", latitude: 21.2333, longitude: 92.1333 },
        ]
      },
      {
        id: "feni",
        name_en: "Feni",
        name_bn: "ফেনী",
        upazilas: [
          { id: "chhagalnaiya", name_en: "Chhagalnaiya", name_bn: "ছাগলনাইয়া", latitude: 23.0333, longitude: 91.5167 },
          { id: "daganbhuiyan", name_en: "Daganbhuiyan", name_bn: "দাগনভূঁইয়া", latitude: 22.9833, longitude: 91.4333 },
          { id: "feni_sadar", name_en: "Feni Sadar", name_bn: "ফেনী সদর", latitude: 23.0159, longitude: 91.3976 },
          { id: "fulgazi", name_en: "Fulgazi", name_bn: "ফুলগাজী", latitude: 22.9167, longitude: 91.4333 },
          { id: "parshuram", name_en: "Parshuram", name_bn: "পরশুরাম", latitude: 23.0833, longitude: 91.4333 },
          { id: "sonagazi", name_en: "Sonagazi", name_bn: "সোনাগাজী", latitude: 22.8667, longitude: 91.4000 },
        ]
      },
      {
        id: "khagrachhari",
        name_en: "Khagrachhari",
        name_bn: "খাগড়াছড়ি",
        upazilas: [
          { id: "dighinala", name_en: "Dighinala", name_bn: "দিঘীনালা", latitude: 23.3000, longitude: 92.0833 },
          { id: "guimara", name_en: "Guimara", name_bn: "গুইমারা", latitude: 22.9500, longitude: 91.9667 },
          { id: "khagrachhari_sadar", name_en: "Khagrachhari Sadar", name_bn: "খাগড়াছড়ি সদর", latitude: 23.1193, longitude: 91.9847 },
          { id: "lakshmichhari", name_en: "Lakshmichhari", name_bn: "লক্ষীছড়ি", latitude: 22.8000, longitude: 91.9167 },
          { id: "mahalchhari", name_en: "Mahalchhari", name_bn: "মহালছড়ি", latitude: 23.0000, longitude: 92.0167 },
          { id: "manikchhari", name_en: "Manikchhari", name_bn: "মানিকছড়ি", latitude: 22.9667, longitude: 92.0833 },
          { id: "matiranga", name_en: "Matiranga", name_bn: "মাটিরাঙ্গা", latitude: 23.0833, longitude: 91.8667 },
          { id: "panchhari", name_en: "Panchhari", name_bn: "পানছড়ি", latitude: 23.2167, longitude: 92.0667 },
          { id: "ramgarh", name_en: "Ramgarh", name_bn: "রামগড়", latitude: 22.9500, longitude: 91.8333 },
        ]
      },
      {
        id: "lakshmipur",
        name_en: "Lakshmipur",
        name_bn: "লক্ষ্মীপুর",
        upazilas: [
          { id: "kamalnagar", name_en: "Kamalnagar", name_bn: "কমলনগর", latitude: 22.6000, longitude: 90.9833 },
          { id: "lakshmipur_sadar", name_en: "Lakshmipur Sadar", name_bn: "লক্ষ্মীপুর সদর", latitude: 22.9438, longitude: 90.8410 },
          { id: "raipur", name_en: "Raipur", name_bn: "রায়পুর", latitude: 22.7333, longitude: 90.8833 },
          { id: "ramganj", name_en: "Ramganj", name_bn: "রামগঞ্জ", latitude: 22.8833, longitude: 90.7667 },
          { id: "ramgati", name_en: "Ramgati", name_bn: "রামগতি", latitude: 22.6167, longitude: 90.8667 },
        ]
      },
      {
        id: "noakhali",
        name_en: "Noakhali",
        name_bn: "নোয়াখালী",
        upazilas: [
          { id: "begumganj", name_en: "Begumganj", name_bn: "বেগমগঞ্জ", latitude: 22.8667, longitude: 90.9833 },
          { id: "chatkhil", name_en: "Chatkhil", name_bn: "চাটখিল", latitude: 22.9667, longitude: 91.1500 },
          { id: "companiganj", name_en: "Companiganj", name_bn: "কোম্পানীগঞ্জ", latitude: 22.7333, longitude: 91.1333 },
          { id: "hatiya", name_en: "Hatiya", name_bn: "হাতিয়া", latitude: 22.4333, longitude: 91.0667 },
          { id: "kabirhat", name_en: "Kabirhat", name_bn: "কবিরহাট", latitude: 22.8333, longitude: 91.1667 },
          { id: "noakhali_sadar", name_en: "Noakhali Sadar", name_bn: "নোয়াখালী সদর", latitude: 22.8333, longitude: 91.1000 },
          { id: "senbagh", name_en: "Senbagh", name_bn: "সেনবাগ", latitude: 22.9333, longitude: 91.1667 },
          { id: "sonaimuri", name_en: "Sonaimuri", name_bn: "সোনাইমুড়ী", latitude: 22.9833, longitude: 91.0500 },
          { id: "subarnachar", name_en: "Subarnachar", name_bn: "সুবর্ণচর", latitude: 22.6333, longitude: 91.0667 },
        ]
      },
      {
        id: "rangamati",
        name_en: "Rangamati",
        name_bn: "রাঙ্গামাটি",
        upazilas: [
          { id: "baghaichhari", name_en: "Baghaichhari", name_bn: "বাঘাইছড়ি", latitude: 23.4000, longitude: 92.2667 },
          { id: "barkal", name_en: "Barkal", name_bn: "বরকল", latitude: 23.0167, longitude: 92.3167 },
          { id: "belaichhari", name_en: "Belaichhari", name_bn: "বিলাইছড়ি", latitude: 22.6833, longitude: 92.2667 },
          { id: "juraichhari", name_en: "Juraichhari", name_bn: "জুরাইছড়ি", latitude: 22.5667, longitude: 92.1833 },
          { id: "kaptai", name_en: "Kaptai", name_bn: "কাপ্তাই", latitude: 22.5000, longitude: 92.2333 },
          { id: "kawkhali", name_en: "Kawkhali", name_bn: "কাউখালী", latitude: 22.5333, longitude: 92.0667 },
          { id: "langadu", name_en: "Langadu", name_bn: "লংগদু", latitude: 22.9833, longitude: 92.1667 },
          { id: "naniarchar", name_en: "Naniarchar", name_bn: "নানিয়ারচর", latitude: 22.8000, longitude: 92.0833 },
          { id: "rajasthali", name_en: "Rajasthali", name_bn: "রাজস্থলী", latitude: 22.4500, longitude: 92.1500 },
          { id: "rangamati_sadar", name_en: "Rangamati Sadar", name_bn: "রাঙ্গামাটি সদর", latitude: 22.6324, longitude: 92.2183 },
        ]
      },
    ]
  },
  // ==================== RAJSHAHI DIVISION ====================
  {
    id: "rajshahi",
    name_en: "Rajshahi",
    name_bn: "রাজশাহী",
    districts: [
      {
        id: "bogura",
        name_en: "Bogura",
        name_bn: "বগুড়া",
        upazilas: [
          { id: "adamdighi", name_en: "Adamdighi", name_bn: "আদমদীঘি", latitude: 24.7833, longitude: 88.9333 },
          { id: "bogura_sadar", name_en: "Bogura Sadar", name_bn: "বগুড়া সদর", latitude: 24.8500, longitude: 89.3667 },
          { id: "dhunat", name_en: "Dhunat", name_bn: "ধুনট", latitude: 24.6667, longitude: 89.5667 },
          { id: "dhupchanchia", name_en: "Dhupchanchia", name_bn: "দুপচাঁচিয়া", latitude: 24.7167, longitude: 89.1333 },
          { id: "gabtali", name_en: "Gabtali", name_bn: "গাবতলী", latitude: 24.8833, longitude: 89.4667 },
          { id: "kahaloo", name_en: "Kahaloo", name_bn: "কাহালু", latitude: 24.8500, longitude: 89.1500 },
          { id: "nandigram", name_en: "Nandigram", name_bn: "নন্দীগ্রাম", latitude: 24.8000, longitude: 89.0000 },
          { id: "sariakandi", name_en: "Sariakandi", name_bn: "সারিয়াকান্দি", latitude: 24.9333, longitude: 89.6000 },
          { id: "shajahanpur", name_en: "Shajahanpur", name_bn: "শাজাহানপুর", latitude: 24.7833, longitude: 89.0833 },
          { id: "sherpur", name_en: "Sherpur", name_bn: "শেরপুর", latitude: 24.6833, longitude: 89.4000 },
          { id: "shibganj", name_en: "Shibganj", name_bn: "শিবগঞ্জ", latitude: 24.9333, longitude: 89.2833 },
          { id: "sonatala", name_en: "Sonatala", name_bn: "সোনাতলা", latitude: 24.9833, longitude: 89.5333 },
        ]
      },
      {
        id: "chapainawabganj",
        name_en: "Chapainawabganj",
        name_bn: "চাঁপাইনবাবগঞ্জ",
        upazilas: [
          { id: "bholahat", name_en: "Bholahat", name_bn: "ভোলাহাট", latitude: 24.9000, longitude: 88.0833 },
          { id: "chapainawabganj_sadar", name_en: "Chapainawabganj Sadar", name_bn: "চাঁপাইনবাবগঞ্জ সদর", latitude: 24.5965, longitude: 88.2778 },
          { id: "gomastapur", name_en: "Gomastapur", name_bn: "গোমস্তাপুর", latitude: 24.7000, longitude: 88.1333 },
          { id: "nachole", name_en: "Nachole", name_bn: "নাচোল", latitude: 24.7167, longitude: 88.4667 },
          { id: "shibganj_chapai", name_en: "Shibganj", name_bn: "শিবগঞ্জ", latitude: 24.8333, longitude: 88.2333 },
        ]
      },
      {
        id: "joypurhat",
        name_en: "Joypurhat",
        name_bn: "জয়পুরহাট",
        upazilas: [
          { id: "akkelpur", name_en: "Akkelpur", name_bn: "আক্কেলপুর", latitude: 25.0667, longitude: 89.1500 },
          { id: "joypurhat_sadar", name_en: "Joypurhat Sadar", name_bn: "জয়পুরহাট সদর", latitude: 25.0968, longitude: 89.0228 },
          { id: "kalai", name_en: "Kalai", name_bn: "কালাই", latitude: 25.0500, longitude: 89.0667 },
          { id: "khetlal", name_en: "Khetlal", name_bn: "ক্ষেতলাল", latitude: 25.0167, longitude: 88.9667 },
          { id: "panchbibi", name_en: "Panchbibi", name_bn: "পাঁচবিবি", latitude: 25.1667, longitude: 89.0167 },
        ]
      },
      {
        id: "naogaon",
        name_en: "Naogaon",
        name_bn: "নওগাঁ",
        upazilas: [
          { id: "atrai", name_en: "Atrai", name_bn: "আত্রাই", latitude: 24.7333, longitude: 88.9500 },
          { id: "badalgachhi", name_en: "Badalgachhi", name_bn: "বদলগাছী", latitude: 24.8833, longitude: 88.7833 },
          { id: "dhamoirhat", name_en: "Dhamoirhat", name_bn: "ধামইরহাট", latitude: 25.0667, longitude: 88.6833 },
          { id: "manda", name_en: "Manda", name_bn: "মান্দা", latitude: 24.6667, longitude: 88.6500 },
          { id: "mahadebpur", name_en: "Mahadebpur", name_bn: "মহাদেবপুর", latitude: 24.9167, longitude: 88.5667 },
          { id: "naogaon_sadar", name_en: "Naogaon Sadar", name_bn: "নওগাঁ সদর", latitude: 24.7960, longitude: 88.9475 },
          { id: "niamatpur", name_en: "Niamatpur", name_bn: "নিয়ামতপুর", latitude: 24.6000, longitude: 88.5500 },
          { id: "patnitala", name_en: "Patnitala", name_bn: "পত্নীতলা", latitude: 25.1333, longitude: 88.8000 },
          { id: "porsha", name_en: "Porsha", name_bn: "পোরশা", latitude: 25.0333, longitude: 88.5333 },
          { id: "raninagar", name_en: "Raninagar", name_bn: "রাণীনগর", latitude: 24.8167, longitude: 88.7500 },
          { id: "sapahar", name_en: "Sapahar", name_bn: "সাপাহার", latitude: 25.0833, longitude: 88.5833 },
        ]
      },
      {
        id: "natore",
        name_en: "Natore",
        name_bn: "নাটোর",
        upazilas: [
          { id: "bagatipara", name_en: "Bagatipara", name_bn: "বাগাতিপাড়া", latitude: 24.3667, longitude: 89.2333 },
          { id: "baraigram", name_en: "Baraigram", name_bn: "বড়াইগ্রাম", latitude: 24.5333, longitude: 89.2000 },
          { id: "gurudaspur", name_en: "Gurudaspur", name_bn: "গুরুদাসপুর", latitude: 24.6000, longitude: 89.1333 },
          { id: "lalpur", name_en: "Lalpur", name_bn: "লালপুর", latitude: 24.1833, longitude: 88.9500 },
          { id: "natore_sadar", name_en: "Natore Sadar", name_bn: "নাটোর সদর", latitude: 24.4204, longitude: 89.0000 },
          { id: "singra", name_en: "Singra", name_bn: "সিংড়া", latitude: 24.4833, longitude: 89.1333 },
        ]
      },
      {
        id: "nawabganj",
        name_en: "Nawabganj",
        name_bn: "নবাবগঞ্জ",
        upazilas: [
          { id: "bholahat_nb", name_en: "Bholahat", name_bn: "ভোলাহাট", latitude: 24.9000, longitude: 88.0833 },
          { id: "gomastapur_nb", name_en: "Gomastapur", name_bn: "গোমস্তাপুর", latitude: 24.7000, longitude: 88.1333 },
          { id: "nachole_nb", name_en: "Nachole", name_bn: "নাচোল", latitude: 24.7167, longitude: 88.4667 },
          { id: "nawabganj_sadar", name_en: "Nawabganj Sadar", name_bn: "নবাবগঞ্জ সদর", latitude: 24.5965, longitude: 88.2778 },
          { id: "shibganj_nb", name_en: "Shibganj", name_bn: "শিবগঞ্জ", latitude: 24.8333, longitude: 88.2333 },
        ]
      },
      {
        id: "pabna",
        name_en: "Pabna",
        name_bn: "পাবনা",
        upazilas: [
          { id: "atgharia", name_en: "Atgharia", name_bn: "আটঘরিয়া", latitude: 24.0333, longitude: 89.4167 },
          { id: "bera", name_en: "Bera", name_bn: "বেড়া", latitude: 24.0833, longitude: 89.6000 },
          { id: "bhangura", name_en: "Bhangura", name_bn: "ভাঙ্গুড়া", latitude: 24.1667, longitude: 89.4500 },
          { id: "chatmohar", name_en: "Chatmohar", name_bn: "চাটমোহর", latitude: 24.2500, longitude: 89.2833 },
          { id: "faridpur_pabna", name_en: "Faridpur", name_bn: "ফরিদপুর", latitude: 24.3000, longitude: 89.4333 },
          { id: "ishwardi", name_en: "Ishwardi", name_bn: "ঈশ্বরদী", latitude: 24.1333, longitude: 89.0833 },
          { id: "pabna_sadar", name_en: "Pabna Sadar", name_bn: "পাবনা সদর", latitude: 24.0063, longitude: 89.2372 },
          { id: "santhia", name_en: "Santhia", name_bn: "সাঁথিয়া", latitude: 24.2500, longitude: 89.1667 },
          { id: "sujanagar", name_en: "Sujanagar", name_bn: "সুজানগর", latitude: 23.9333, longitude: 89.4667 },
        ]
      },
      {
        id: "rajshahi",
        name_en: "Rajshahi",
        name_bn: "রাজশাহী",
        upazilas: [
          { id: "bagha", name_en: "Bagha", name_bn: "বাঘা", latitude: 24.2667, longitude: 88.7333 },
          { id: "bagmara", name_en: "Bagmara", name_bn: "বাগমারা", latitude: 24.5333, longitude: 88.7833 },
          { id: "charghat", name_en: "Charghat", name_bn: "চারঘাট", latitude: 24.3000, longitude: 88.8333 },
          { id: "durgapur", name_en: "Durgapur", name_bn: "দুর্গাপুর", latitude: 24.4167, longitude: 88.6167 },
          { id: "godagari", name_en: "Godagari", name_bn: "গোদাগাড়ী", latitude: 24.4500, longitude: 88.4333 },
          { id: "mohanpur", name_en: "Mohanpur", name_bn: "মোহনপুর", latitude: 24.5500, longitude: 88.6500 },
          { id: "paba", name_en: "Paba", name_bn: "পবা", latitude: 24.3500, longitude: 88.5833 },
          { id: "puthia", name_en: "Puthia", name_bn: "পুঠিয়া", latitude: 24.3500, longitude: 88.8167 },
          { id: "rajshahi_city", name_en: "Rajshahi City", name_bn: "রাজশাহী শহর", latitude: 24.3745, longitude: 88.6042 },
          { id: "tanore", name_en: "Tanore", name_bn: "তানোর", latitude: 24.6333, longitude: 88.6333 },
        ]
      },
      {
        id: "sirajganj",
        name_en: "Sirajganj",
        name_bn: "সিরাজগঞ্জ",
        upazilas: [
          { id: "belkuchi", name_en: "Belkuchi", name_bn: "বেলকুচি", latitude: 24.2000, longitude: 89.5833 },
          { id: "chauhali", name_en: "Chauhali", name_bn: "চৌহালী", latitude: 24.1500, longitude: 89.7000 },
          { id: "kamarkhanda", name_en: "Kamarkhanda", name_bn: "কামারখন্দ", latitude: 24.2667, longitude: 89.5333 },
          { id: "kazipur", name_en: "Kazipur", name_bn: "কাজীপুর", latitude: 24.6167, longitude: 89.6333 },
          { id: "raiganj", name_en: "Raiganj", name_bn: "রায়গঞ্জ", latitude: 24.3833, longitude: 89.6000 },
          { id: "shahjadpur", name_en: "Shahjadpur", name_bn: "শাহজাদপুর", latitude: 24.1833, longitude: 89.5833 },
          { id: "sirajganj_sadar", name_en: "Sirajganj Sadar", name_bn: "সিরাজগঞ্জ সদর", latitude: 24.4533, longitude: 89.7000 },
          { id: "tarash", name_en: "Tarash", name_bn: "তাড়াশ", latitude: 24.4833, longitude: 89.4833 },
          { id: "ullapara", name_en: "Ullapara", name_bn: "উল্লাপাড়া", latitude: 24.3833, longitude: 89.4833 },
        ]
      },
    ]
  },
  // ==================== KHULNA DIVISION ====================
  {
    id: "khulna",
    name_en: "Khulna",
    name_bn: "খুলনা",
    districts: [
      {
        id: "bagerhat",
        name_en: "Bagerhat",
        name_bn: "বাগেরহাট",
        upazilas: [
          { id: "bagerhat_sadar", name_en: "Bagerhat Sadar", name_bn: "বাগেরহাট সদর", latitude: 22.6510, longitude: 89.7850 },
          { id: "chitalmari", name_en: "Chitalmari", name_bn: "চিতলমারী", latitude: 22.6500, longitude: 89.8500 },
          { id: "fakirhat", name_en: "Fakirhat", name_bn: "ফকিরহাট", latitude: 22.7167, longitude: 89.7000 },
          { id: "kachua", name_en: "Kachua", name_bn: "কচুয়া", latitude: 22.4667, longitude: 89.8167 },
          { id: "mollahat", name_en: "Mollahat", name_bn: "মোল্লাহাট", latitude: 22.7500, longitude: 89.7500 },
          { id: "mongla", name_en: "Mongla", name_bn: "মোংলা", latitude: 22.4667, longitude: 89.6000 },
          { id: "morrelganj", name_en: "Morrelganj", name_bn: "মোড়েলগঞ্জ", latitude: 22.4500, longitude: 89.8667 },
          { id: "rampal", name_en: "Rampal", name_bn: "রামপাল", latitude: 22.5333, longitude: 89.6000 },
          { id: "sarankhola", name_en: "Sarankhola", name_bn: "শরণখোলা", latitude: 22.2833, longitude: 89.8000 },
        ]
      },
      {
        id: "chuadanga",
        name_en: "Chuadanga",
        name_bn: "চুয়াডাঙ্গা",
        upazilas: [
          { id: "alamdanga", name_en: "Alamdanga", name_bn: "আলমডাঙ্গা", latitude: 23.7333, longitude: 88.8667 },
          { id: "chuadanga_sadar", name_en: "Chuadanga Sadar", name_bn: "চুয়াডাঙ্গা সদর", latitude: 23.6561, longitude: 88.8225 },
          { id: "damurhuda", name_en: "Damurhuda", name_bn: "দামুড়হুদা", latitude: 23.6000, longitude: 88.7500 },
          { id: "jibannagar", name_en: "Jibannagar", name_bn: "জীবননগর", latitude: 23.6667, longitude: 88.9167 },
        ]
      },
      {
        id: "jessore",
        name_en: "Jessore",
        name_bn: "যশোর",
        upazilas: [
          { id: "abhaynagar", name_en: "Abhaynagar", name_bn: "অভয়নগর", latitude: 23.0000, longitude: 89.4333 },
          { id: "bagherpara", name_en: "Bagherpara", name_bn: "বাঘারপাড়া", latitude: 23.2833, longitude: 89.3167 },
          { id: "chaugachha", name_en: "Chaugachha", name_bn: "চৌগাছা", latitude: 23.2167, longitude: 89.0667 },
          { id: "jessore_sadar", name_en: "Jessore Sadar", name_bn: "যশোর সদর", latitude: 23.1634, longitude: 89.2128 },
          { id: "jhikargachha", name_en: "Jhikargachha", name_bn: "ঝিকরগাছা", latitude: 23.0500, longitude: 89.1167 },
          { id: "keshabpur", name_en: "Keshabpur", name_bn: "কেশবপুর", latitude: 22.9167, longitude: 89.2500 },
          { id: "manirampur", name_en: "Manirampur", name_bn: "মণিরামপুর", latitude: 22.9500, longitude: 89.3500 },
          { id: "sharsha", name_en: "Sharsha", name_bn: "শার্শা", latitude: 23.1000, longitude: 88.9833 },
        ]
      },
      {
        id: "jhenaidah",
        name_en: "Jhenaidah",
        name_bn: "ঝিনাইদহ",
        upazilas: [
          { id: "harinakunda", name_en: "Harinakunda", name_bn: "হরিণাকুণ্ড", latitude: 23.6667, longitude: 89.0000 },
          { id: "jhenaidah_sadar", name_en: "Jhenaidah Sadar", name_bn: "ঝিনাইদহ সদর", latitude: 23.5449, longitude: 89.1726 },
          { id: "kaliganj_jhe", name_en: "Kaliganj", name_bn: "কালীগঞ্জ", latitude: 23.4333, longitude: 89.3167 },
          { id: "kotchandpur", name_en: "Kotchandpur", name_bn: "কোটচাঁদপুর", latitude: 23.4167, longitude: 88.9833 },
          { id: "maheshpur", name_en: "Maheshpur", name_bn: "মহেশপুর", latitude: 23.3500, longitude: 88.8667 },
          { id: "shailkupa", name_en: "Shailkupa", name_bn: "শৈলকুপা", latitude: 23.6333, longitude: 89.2333 },
        ]
      },
      {
        id: "khulna",
        name_en: "Khulna",
        name_bn: "খুলনা",
        upazilas: [
          { id: "batiaghata", name_en: "Batiaghata", name_bn: "বটিয়াঘাটা", latitude: 22.6833, longitude: 89.4833 },
          { id: "dacope", name_en: "Dacope", name_bn: "দাকোপ", latitude: 22.5500, longitude: 89.5000 },
          { id: "dighalia", name_en: "Dighalia", name_bn: "দিঘলিয়া", latitude: 22.8833, longitude: 89.3833 },
          { id: "dumuria", name_en: "Dumuria", name_bn: "ডুমুরিয়া", latitude: 22.8167, longitude: 89.3167 },
          { id: "khulna_city", name_en: "Khulna City", name_bn: "খুলনা শহর", latitude: 22.8456, longitude: 89.5403 },
          { id: "koyra", name_en: "Koyra", name_bn: "কয়রা", latitude: 22.4333, longitude: 89.3500 },
          { id: "paikgachha", name_en: "Paikgachha", name_bn: "পাইকগাছা", latitude: 22.5500, longitude: 89.4167 },
          { id: "phultala", name_en: "Phultala", name_bn: "ফুলতলা", latitude: 22.9500, longitude: 89.4500 },
          { id: "rupsha", name_en: "Rupsha", name_bn: "রূপসা", latitude: 22.8167, longitude: 89.6000 },
          { id: "terokhada", name_en: "Terokhada", name_bn: "তেরখাদা", latitude: 22.9333, longitude: 89.5333 },
        ]
      },
      {
        id: "kushtia",
        name_en: "Kushtia",
        name_bn: "কুষ্টিয়া",
        upazilas: [
          { id: "bheramara", name_en: "Bheramara", name_bn: "ভেড়ামারা", latitude: 24.0167, longitude: 88.9500 },
          { id: "daulatpur", name_en: "Daulatpur", name_bn: "দৌলতপুর", latitude: 23.9333, longitude: 89.0833 },
          { id: "khoksa", name_en: "Khoksa", name_bn: "খোকসা", latitude: 23.7000, longitude: 89.1333 },
          { id: "kumarkhali", name_en: "Kumarkhali", name_bn: "কুমারখালী", latitude: 23.8667, longitude: 89.2000 },
          { id: "kushtia_sadar", name_en: "Kushtia Sadar", name_bn: "কুষ্টিয়া সদর", latitude: 23.9010, longitude: 89.1200 },
          { id: "mirpur", name_en: "Mirpur", name_bn: "মিরপুর", latitude: 23.8833, longitude: 89.0000 },
        ]
      },
      {
        id: "magura",
        name_en: "Magura",
        name_bn: "মাগুরা",
        upazilas: [
          { id: "magura_sadar", name_en: "Magura Sadar", name_bn: "মাগুরা সদর", latitude: 23.5000, longitude: 89.4167 },
          { id: "mohammadpur", name_en: "Mohammadpur", name_bn: "মোহাম্মদপুর", latitude: 23.5167, longitude: 89.5167 },
          { id: "shalikha", name_en: "Shalikha", name_bn: "শালিখা", latitude: 23.4167, longitude: 89.4000 },
          { id: "sreepur_magura", name_en: "Sreepur", name_bn: "শ্রীপুর", latitude: 23.5833, longitude: 89.4000 },
        ]
      },
      {
        id: "meherpur",
        name_en: "Meherpur",
        name_bn: "মেহেরপুর",
        upazilas: [
          { id: "gangni", name_en: "Gangni", name_bn: "গাংনী", latitude: 23.8000, longitude: 88.7667 },
          { id: "meherpur_sadar", name_en: "Meherpur Sadar", name_bn: "মেহেরপুর সদর", latitude: 23.7621, longitude: 88.6318 },
          { id: "mujibnagar", name_en: "Mujibnagar", name_bn: "মুজিবনগর", latitude: 23.8167, longitude: 88.5333 },
        ]
      },
      {
        id: "narail",
        name_en: "Narail",
        name_bn: "নড়াইল",
        upazilas: [
          { id: "kalia", name_en: "Kalia", name_bn: "কালিয়া", latitude: 23.0000, longitude: 89.5500 },
          { id: "lohagara_narail", name_en: "Lohagara", name_bn: "লোহাগড়া", latitude: 22.9333, longitude: 89.7167 },
          { id: "narail_sadar", name_en: "Narail Sadar", name_bn: "নড়াইল সদর", latitude: 23.1619, longitude: 89.5120 },
        ]
      },
      {
        id: "satkhira",
        name_en: "Satkhira",
        name_bn: "সাতক্ষীরা",
        upazilas: [
          { id: "assasuni", name_en: "Assasuni", name_bn: "আশাশুনি", latitude: 22.5500, longitude: 89.1667 },
          { id: "debhata", name_en: "Debhata", name_bn: "দেবহাটা", latitude: 22.5833, longitude: 89.0500 },
          { id: "kalaroa", name_en: "Kalaroa", name_bn: "কলারোয়া", latitude: 22.8500, longitude: 89.0333 },
          { id: "kaliganj_sat", name_en: "Kaliganj", name_bn: "কালীগঞ্জ", latitude: 22.4667, longitude: 89.0500 },
          { id: "satkhira_sadar", name_en: "Satkhira Sadar", name_bn: "সাতক্ষীরা সদর", latitude: 22.7185, longitude: 89.0705 },
          { id: "shyamnagar", name_en: "Shyamnagar", name_bn: "শ্যামনগর", latitude: 22.3167, longitude: 89.1500 },
          { id: "tala", name_en: "Tala", name_bn: "তালা", latitude: 22.7167, longitude: 89.2167 },
        ]
      },
    ]
  },
  // ==================== BARISHAL DIVISION ====================
  {
    id: "barishal",
    name_en: "Barishal",
    name_bn: "বরিশাল",
    districts: [
      {
        id: "barguna",
        name_en: "Barguna",
        name_bn: "বরগুনা",
        upazilas: [
          { id: "amtali", name_en: "Amtali", name_bn: "আমতলী", latitude: 22.0833, longitude: 90.2500 },
          { id: "bamna", name_en: "Bamna", name_bn: "বামনা", latitude: 22.2000, longitude: 90.0500 },
          { id: "barguna_sadar", name_en: "Barguna Sadar", name_bn: "বরগুনা সদর", latitude: 22.1500, longitude: 90.1250 },
          { id: "betagi", name_en: "Betagi", name_bn: "বেতাগী", latitude: 22.3000, longitude: 90.2000 },
          { id: "patharghata", name_en: "Patharghata", name_bn: "পাথরঘাটা", latitude: 21.9667, longitude: 90.1333 },
          { id: "taltali", name_en: "Taltali", name_bn: "তালতলী", latitude: 21.9167, longitude: 90.2833 },
        ]
      },
      {
        id: "barishal",
        name_en: "Barishal",
        name_bn: "বরিশাল",
        upazilas: [
          { id: "agailjhara", name_en: "Agailjhara", name_bn: "আগৈলঝাড়া", latitude: 22.9667, longitude: 90.1000 },
          { id: "babuganj", name_en: "Babuganj", name_bn: "বাবুগঞ্জ", latitude: 22.7833, longitude: 90.3333 },
          { id: "bakerganj", name_en: "Bakerganj", name_bn: "বাকেরগঞ্জ", latitude: 22.5833, longitude: 90.2667 },
          { id: "banaripara", name_en: "Banaripara", name_bn: "বানারীপাড়া", latitude: 22.8000, longitude: 90.1667 },
          { id: "barishal_sadar", name_en: "Barishal Sadar", name_bn: "বরিশাল সদর", latitude: 22.7010, longitude: 90.3535 },
          { id: "gournadi", name_en: "Gournadi", name_bn: "গৌরনদী", latitude: 22.9833, longitude: 90.2167 },
          { id: "hizla", name_en: "Hizla", name_bn: "হিজলা", latitude: 22.6167, longitude: 90.4667 },
          { id: "mehendiganj", name_en: "Mehendiganj", name_bn: "মেহেন্দিগঞ্জ", latitude: 22.8333, longitude: 90.5000 },
          { id: "muladi", name_en: "Muladi", name_bn: "মুলাদী", latitude: 22.9167, longitude: 90.4000 },
          { id: "wazirpur", name_en: "Wazirpur", name_bn: "উজিরপুর", latitude: 22.8333, longitude: 90.2167 },
        ]
      },
      {
        id: "bhola",
        name_en: "Bhola",
        name_bn: "ভোলা",
        upazilas: [
          { id: "bhola_sadar", name_en: "Bhola Sadar", name_bn: "ভোলা সদর", latitude: 22.6860, longitude: 90.6480 },
          { id: "burhanuddin", name_en: "Burhanuddin", name_bn: "বুরহানউদ্দিন", latitude: 22.4833, longitude: 90.7500 },
          { id: "char_fasson", name_en: "Char Fasson", name_bn: "চরফ্যাশন", latitude: 22.1667, longitude: 90.7667 },
          { id: "daulatkhan", name_en: "Daulatkhan", name_bn: "দৌলতখান", latitude: 22.6000, longitude: 90.7333 },
          { id: "lalmohan", name_en: "Lalmohan", name_bn: "লালমোহন", latitude: 22.3833, longitude: 90.7167 },
          { id: "manpura", name_en: "Manpura", name_bn: "মনপুরা", latitude: 22.0500, longitude: 90.9500 },
          { id: "tazumuddin", name_en: "Tazumuddin", name_bn: "তজুমদ্দিন", latitude: 22.4167, longitude: 90.6333 },
        ]
      },
      {
        id: "jhalokati",
        name_en: "Jhalokati",
        name_bn: "ঝালকাঠি",
        upazilas: [
          { id: "jhalokati_sadar", name_en: "Jhalokati Sadar", name_bn: "ঝালকাঠি সদর", latitude: 22.6410, longitude: 90.1870 },
          { id: "kathalia", name_en: "Kathalia", name_bn: "কাঠালিয়া", latitude: 22.5500, longitude: 90.1833 },
          { id: "nalchity", name_en: "Nalchity", name_bn: "নলছিটি", latitude: 22.6167, longitude: 90.1000 },
          { id: "rajapur", name_en: "Rajapur", name_bn: "রাজাপুর", latitude: 22.5667, longitude: 90.0667 },
        ]
      },
      {
        id: "patuakhali",
        name_en: "Patuakhali",
        name_bn: "পটুয়াখালী",
        upazilas: [
          { id: "bauphal", name_en: "Bauphal", name_bn: "বাউফল", latitude: 22.4000, longitude: 90.5333 },
          { id: "dashmina", name_en: "Dashmina", name_bn: "দশমিনা", latitude: 22.2333, longitude: 90.5500 },
          { id: "dumki", name_en: "Dumki", name_bn: "দুমকী", latitude: 22.4333, longitude: 90.3667 },
          { id: "galachipa", name_en: "Galachipa", name_bn: "গলাচিপা", latitude: 22.1500, longitude: 90.4333 },
          { id: "kalapara", name_en: "Kalapara", name_bn: "কলাপাড়া", latitude: 21.9833, longitude: 90.2500 },
          { id: "mirzaganj", name_en: "Mirzaganj", name_bn: "মির্জাগঞ্জ", latitude: 22.3667, longitude: 90.2500 },
          { id: "patuakhali_sadar", name_en: "Patuakhali Sadar", name_bn: "পটুয়াখালী সদর", latitude: 22.3568, longitude: 90.3298 },
          { id: "rangabali", name_en: "Rangabali", name_bn: "রাঙ্গাবালী", latitude: 22.0333, longitude: 90.5833 },
        ]
      },
      {
        id: "pirojpur",
        name_en: "Pirojpur",
        name_bn: "পিরোজপুর",
        upazilas: [
          { id: "bhandaria", name_en: "Bhandaria", name_bn: "ভাণ্ডারিয়া", latitude: 22.5333, longitude: 89.9833 },
          { id: "kawkhali_pirojpur", name_en: "Kawkhali", name_bn: "কাউখালী", latitude: 22.5167, longitude: 89.9000 },
          { id: "mathbaria", name_en: "Mathbaria", name_bn: "মঠবাড়িয়া", latitude: 22.3000, longitude: 89.9500 },
          { id: "nazirpur", name_en: "Nazirpur", name_bn: "নাজিরপুর", latitude: 22.8500, longitude: 89.9167 },
          { id: "nesarabad", name_en: "Nesarabad (Swarupkathi)", name_bn: "নেছারাবাদ (স্বরূপকাঠি)", latitude: 22.6000, longitude: 90.0500 },
          { id: "pirojpur_sadar", name_en: "Pirojpur Sadar", name_bn: "পিরোজপুর সদর", latitude: 22.5761, longitude: 89.9722 },
          { id: "zianagar", name_en: "Zianagar", name_bn: "জিয়ানগর", latitude: 22.7333, longitude: 89.8833 },
        ]
      },
    ]
  },
  // ==================== SYLHET DIVISION ====================
  {
    id: "sylhet",
    name_en: "Sylhet",
    name_bn: "সিলেট",
    districts: [
      {
        id: "habiganj",
        name_en: "Habiganj",
        name_bn: "হবিগঞ্জ",
        upazilas: [
          { id: "ajmiriganj", name_en: "Ajmiriganj", name_bn: "আজমিরিগঞ্জ", latitude: 24.7000, longitude: 91.4833 },
          { id: "bahubal", name_en: "Bahubal", name_bn: "বাহুবল", latitude: 24.3333, longitude: 91.4167 },
          { id: "baniyachong", name_en: "Baniyachong", name_bn: "বানিয়াচং", latitude: 24.4500, longitude: 91.4833 },
          { id: "chunarughat", name_en: "Chunarughat", name_bn: "চুনারুঘাট", latitude: 24.1667, longitude: 91.5000 },
          { id: "habiganj_sadar", name_en: "Habiganj Sadar", name_bn: "হবিগঞ্জ সদর", latitude: 24.3750, longitude: 91.4150 },
          { id: "lakhai", name_en: "Lakhai", name_bn: "লাখাই", latitude: 24.5500, longitude: 91.2667 },
          { id: "madhabpur", name_en: "Madhabpur", name_bn: "মাধবপুর", latitude: 24.1333, longitude: 91.4000 },
          { id: "nabiganj", name_en: "Nabiganj", name_bn: "নবীগঞ্জ", latitude: 24.6333, longitude: 91.5667 },
          { id: "shayestaganj", name_en: "Shayestaganj", name_bn: "শায়েস্তাগঞ্জ", latitude: 24.2833, longitude: 91.3667 },
        ]
      },
      {
        id: "moulvibazar",
        name_en: "Moulvibazar",
        name_bn: "মৌলভীবাজার",
        upazilas: [
          { id: "barlekha", name_en: "Barlekha", name_bn: "বড়লেখা", latitude: 24.7000, longitude: 92.1500 },
          { id: "juri", name_en: "Juri", name_bn: "জুরী", latitude: 24.5833, longitude: 92.1833 },
          { id: "kamalganj", name_en: "Kamalganj", name_bn: "কমলগঞ্জ", latitude: 24.3333, longitude: 91.8833 },
          { id: "kulaura", name_en: "Kulaura", name_bn: "কুলাউড়া", latitude: 24.5167, longitude: 92.0667 },
          { id: "moulvibazar_sadar", name_en: "Moulvibazar Sadar", name_bn: "মৌলভীবাজার সদর", latitude: 24.4825, longitude: 91.7715 },
          { id: "rajnagar", name_en: "Rajnagar", name_bn: "রাজনগর", latitude: 24.4167, longitude: 91.7167 },
          { id: "sreemangal", name_en: "Sreemangal", name_bn: "শ্রীমঙ্গল", latitude: 24.3167, longitude: 91.7167 },
        ]
      },
      {
        id: "sunamganj",
        name_en: "Sunamganj",
        name_bn: "সুনামগঞ্জ",
        upazilas: [
          { id: "bishwamvarpur", name_en: "Bishwamvarpur", name_bn: "বিশ্বম্ভরপুর", latitude: 25.1500, longitude: 91.2333 },
          { id: "chhatak", name_en: "Chhatak", name_bn: "ছাতক", latitude: 24.9833, longitude: 91.6667 },
          { id: "derai", name_en: "Derai", name_bn: "দিরাই", latitude: 24.6667, longitude: 91.4000 },
          { id: "dharampasha", name_en: "Dharampasha", name_bn: "ধর্মপাশা", latitude: 25.0500, longitude: 91.2167 },
          { id: "dowarabazar", name_en: "Dowarabazar", name_bn: "দোয়ারাবাজার", latitude: 25.0833, longitude: 91.5333 },
          { id: "jagannathpur", name_en: "Jagannathpur", name_bn: "জগন্নাথপুর", latitude: 24.7667, longitude: 91.5500 },
          { id: "jamalganj", name_en: "Jamalganj", name_bn: "জামালগঞ্জ", latitude: 24.9333, longitude: 91.0500 },
          { id: "shalla", name_en: "Shalla", name_bn: "শাল্লা", latitude: 24.6167, longitude: 91.2667 },
          { id: "sunamganj_sadar", name_en: "Sunamganj Sadar", name_bn: "সুনামগঞ্জ সদর", latitude: 25.0655, longitude: 91.3950 },
          { id: "tahirpur", name_en: "Tahirpur", name_bn: "তাহিরপুর", latitude: 25.1000, longitude: 91.1333 },
        ]
      },
      {
        id: "sylhet",
        name_en: "Sylhet",
        name_bn: "সিলেট",
        upazilas: [
          { id: "balaganj", name_en: "Balaganj", name_bn: "বালাগঞ্জ", latitude: 24.6833, longitude: 91.8333 },
          { id: "beanibazar", name_en: "Beanibazar", name_bn: "বিয়ানীবাজার", latitude: 24.8167, longitude: 92.1500 },
          { id: "bishwanath", name_en: "Bishwanath", name_bn: "বিশ্বনাথ", latitude: 24.7500, longitude: 91.7500 },
          { id: "companiganj_sylhet", name_en: "Companiganj", name_bn: "কোম্পানীগঞ্জ", latitude: 25.0500, longitude: 91.8000 },
          { id: "dakshin_surma", name_en: "Dakshin Surma", name_bn: "দক্ষিণ সুরমা", latitude: 24.8333, longitude: 91.8833 },
          { id: "fenchuganj", name_en: "Fenchuganj", name_bn: "ফেঞ্চুগঞ্জ", latitude: 24.7167, longitude: 91.9667 },
          { id: "golapganj", name_en: "Golapganj", name_bn: "গোলাপগঞ্জ", latitude: 24.8000, longitude: 92.0667 },
          { id: "gowainghat", name_en: "Gowainghat", name_bn: "গোয়াইনঘাট", latitude: 25.1167, longitude: 92.0333 },
          { id: "jaintiapur", name_en: "Jaintiapur", name_bn: "জৈন্তাপুর", latitude: 25.0833, longitude: 92.1333 },
          { id: "kanaighat", name_en: "Kanaighat", name_bn: "কানাইঘাট", latitude: 25.0167, longitude: 92.2167 },
          { id: "osmani_nagar", name_en: "Osmani Nagar", name_bn: "ওসমানী নগর", latitude: 24.7333, longitude: 91.9167 },
          { id: "sylhet_sadar", name_en: "Sylhet Sadar", name_bn: "সিলেট সদর", latitude: 24.8949, longitude: 91.8687 },
          { id: "zakiganj", name_en: "Zakiganj", name_bn: "জকিগঞ্জ", latitude: 24.8667, longitude: 92.2000 },
        ]
      },
    ]
  },
  // ==================== RANGPUR DIVISION ====================
  {
    id: "rangpur",
    name_en: "Rangpur",
    name_bn: "রংপুর",
    districts: [
      {
        id: "dinajpur",
        name_en: "Dinajpur",
        name_bn: "দিনাজপুর",
        upazilas: [
          { id: "birampur", name_en: "Birampur", name_bn: "বিরামপুর", latitude: 25.4167, longitude: 88.8500 },
          { id: "birganj", name_en: "Birganj", name_bn: "বীরগঞ্জ", latitude: 25.2667, longitude: 88.6333 },
          { id: "biral", name_en: "Biral", name_bn: "বিরল", latitude: 25.6167, longitude: 88.5667 },
          { id: "bochaganj", name_en: "Bochaganj", name_bn: "বোচাগঞ্জ", latitude: 25.5000, longitude: 88.9833 },
          { id: "chirirbandar", name_en: "Chirirbandar", name_bn: "চিরিরবন্দর", latitude: 25.5333, longitude: 88.7333 },
          { id: "dinajpur_sadar", name_en: "Dinajpur Sadar", name_bn: "দিনাজপুর সদর", latitude: 25.6279, longitude: 88.6332 },
          { id: "fulbari", name_en: "Fulbari", name_bn: "ফুলবাড়ী", latitude: 25.4667, longitude: 88.4833 },
          { id: "ghoraghat", name_en: "Ghoraghat", name_bn: "ঘোড়াঘাট", latitude: 25.2500, longitude: 89.0167 },
          { id: "hakimpur", name_en: "Hakimpur", name_bn: "হাকিমপুর", latitude: 25.3333, longitude: 88.8167 },
          { id: "kaharole", name_en: "Kaharole", name_bn: "কাহারোল", latitude: 25.6500, longitude: 88.6167 },
          { id: "khansama", name_en: "Khansama", name_bn: "খানসামা", latitude: 25.7500, longitude: 88.8667 },
          { id: "nawabganj_dinajpur", name_en: "Nawabganj", name_bn: "নবাবগঞ্জ", latitude: 25.4167, longitude: 89.0333 },
          { id: "parbatipur", name_en: "Parbatipur", name_bn: "পার্বতীপুর", latitude: 25.6667, longitude: 88.9500 },
        ]
      },
      {
        id: "gaibandha",
        name_en: "Gaibandha",
        name_bn: "গাইবান্ধা",
        upazilas: [
          { id: "fulchhari", name_en: "Fulchhari", name_bn: "ফুলছড়ি", latitude: 25.2167, longitude: 89.7667 },
          { id: "gaibandha_sadar", name_en: "Gaibandha Sadar", name_bn: "গাইবান্ধা সদর", latitude: 25.3297, longitude: 89.5280 },
          { id: "gobindaganj", name_en: "Gobindaganj", name_bn: "গোবিন্দগঞ্জ", latitude: 25.2333, longitude: 89.4000 },
          { id: "palashbari", name_en: "Palashbari", name_bn: "পলাশবাড়ী", latitude: 25.4000, longitude: 89.4500 },
          { id: "sadullapur", name_en: "Sadullapur", name_bn: "সাদুল্লাপুর", latitude: 25.2500, longitude: 89.2333 },
          { id: "saghata", name_en: "Saghata", name_bn: "সাঘাটা", latitude: 25.2333, longitude: 89.6667 },
          { id: "sundarganj", name_en: "Sundarganj", name_bn: "সুন্দরগঞ্জ", latitude: 25.4833, longitude: 89.5333 },
        ]
      },
      {
        id: "kurigram",
        name_en: "Kurigram",
        name_bn: "কুড়িগ্রাম",
        upazilas: [
          { id: "bhurungamari", name_en: "Bhurungamari", name_bn: "ভুরুঙ্গামারী", latitude: 26.0000, longitude: 89.2500 },
          { id: "chilmari", name_en: "Chilmari", name_bn: "চিলমারী", latitude: 25.5833, longitude: 89.7333 },
          { id: "kurigram_sadar", name_en: "Kurigram Sadar", name_bn: "কুড়িগ্রাম সদর", latitude: 25.8052, longitude: 89.6363 },
          { id: "nageshwari", name_en: "Nageshwari", name_bn: "নাগেশ্বরী", latitude: 25.9167, longitude: 89.6500 },
          { id: "phulbari", name_en: "Phulbari", name_bn: "ফুলবাড়ী", latitude: 25.8667, longitude: 89.4167 },
          { id: "rajarhat", name_en: "Rajarhat", name_bn: "রাজারহাট", latitude: 25.7333, longitude: 89.4500 },
          { id: "rajibpur", name_en: "Rajibpur", name_bn: "রাজীবপুর", latitude: 25.6333, longitude: 89.6167 },
          { id: "rowmari", name_en: "Rowmari", name_bn: "রৌমারী", latitude: 25.8167, longitude: 89.8167 },
          { id: "ulipur", name_en: "Ulipur", name_bn: "উলিপুর", latitude: 25.7000, longitude: 89.6000 },
        ]
      },
      {
        id: "lalmonirhat",
        name_en: "Lalmonirhat",
        name_bn: "লালমনিরহাট",
        upazilas: [
          { id: "aditmari", name_en: "Aditmari", name_bn: "আদিতমারী", latitude: 26.0167, longitude: 89.4000 },
          { id: "hatibandha", name_en: "Hatibandha", name_bn: "হাতীবান্ধা", latitude: 26.1333, longitude: 89.1833 },
          { id: "kaliganj_lalmonirhat", name_en: "Kaliganj", name_bn: "কালীগঞ্জ", latitude: 25.9500, longitude: 89.4333 },
          { id: "lalmonirhat_sadar", name_en: "Lalmonirhat Sadar", name_bn: "লালমনিরহাট সদর", latitude: 25.9923, longitude: 89.4483 },
          { id: "patgram", name_en: "Patgram", name_bn: "পাটগ্রাম", latitude: 26.1500, longitude: 89.0167 },
        ]
      },
      {
        id: "nilphamari",
        name_en: "Nilphamari",
        name_bn: "নীলফামারী",
        upazilas: [
          { id: "dimla", name_en: "Dimla", name_bn: "ডিমলা", latitude: 26.1333, longitude: 88.9333 },
          { id: "domar", name_en: "Domar", name_bn: "ডোমার", latitude: 25.9667, longitude: 88.8167 },
          { id: "jaldhaka", name_en: "Jaldhaka", name_bn: "জলঢাকা", latitude: 25.9000, longitude: 89.0167 },
          { id: "kishoreganj_nilphamari", name_en: "Kishoreganj", name_bn: "কিশোরগঞ্জ", latitude: 26.0833, longitude: 88.8833 },
          { id: "nilphamari_sadar", name_en: "Nilphamari Sadar", name_bn: "নীলফামারী সদর", latitude: 25.9310, longitude: 88.8560 },
          { id: "saidpur", name_en: "Saidpur", name_bn: "সৈয়দপুর", latitude: 25.7833, longitude: 88.8833 },
        ]
      },
      {
        id: "panchagarh",
        name_en: "Panchagarh",
        name_bn: "পঞ্চগড়",
        upazilas: [
          { id: "atwari", name_en: "Atwari", name_bn: "আটোয়ারী", latitude: 26.2167, longitude: 88.4500 },
          { id: "boda", name_en: "Boda", name_bn: "বোদা", latitude: 26.1833, longitude: 88.5333 },
          { id: "debiganj", name_en: "Debiganj", name_bn: "দেবীগঞ্জ", latitude: 26.0667, longitude: 88.7667 },
          { id: "panchagarh_sadar", name_en: "Panchagarh Sadar", name_bn: "পঞ্চগড় সদর", latitude: 26.3388, longitude: 88.5513 },
          { id: "tetulia", name_en: "Tetulia", name_bn: "তেতুলিয়া", latitude: 26.4500, longitude: 88.3667 },
        ]
      },
      {
        id: "rangpur",
        name_en: "Rangpur",
        name_bn: "রংপুর",
        upazilas: [
          { id: "badarganj", name_en: "Badarganj", name_bn: "বদরগঞ্জ", latitude: 25.6667, longitude: 89.0500 },
          { id: "gangachara", name_en: "Gangachara", name_bn: "গঙ্গাচড়া", latitude: 25.8833, longitude: 89.2500 },
          { id: "kaunia", name_en: "Kaunia", name_bn: "কাউনিয়া", latitude: 25.7667, longitude: 89.3500 },
          { id: "mithapukur", name_en: "Mithapukur", name_bn: "মিঠাপুকুর", latitude: 25.5833, longitude: 89.2333 },
          { id: "pirgachha", name_en: "Pirgachha", name_bn: "পীরগাছা", latitude: 25.6667, longitude: 89.3833 },
          { id: "pirganj_rangpur", name_en: "Pirganj", name_bn: "পীরগঞ্জ", latitude: 25.4000, longitude: 89.0000 },
          { id: "rangpur_sadar", name_en: "Rangpur Sadar", name_bn: "রংপুর সদর", latitude: 25.7558, longitude: 89.2445 },
          { id: "taraganj", name_en: "Taraganj", name_bn: "তারাগঞ্জ", latitude: 25.8333, longitude: 89.0500 },
        ]
      },
      {
        id: "thakurgaon",
        name_en: "Thakurgaon",
        name_bn: "ঠাকুরগাঁও",
        upazilas: [
          { id: "baliadangi", name_en: "Baliadangi", name_bn: "বালিয়াডাঙ্গী", latitude: 25.9500, longitude: 88.3667 },
          { id: "haripur", name_en: "Haripur", name_bn: "হরিপুর", latitude: 26.0333, longitude: 88.3667 },
          { id: "pirganj", name_en: "Pirganj", name_bn: "পীরগঞ্জ", latitude: 25.8500, longitude: 88.3667 },
          { id: "ranisankail", name_en: "Ranisankail", name_bn: "রাণীশংকৈল", latitude: 25.8500, longitude: 88.5833 },
          { id: "thakurgaon_sadar", name_en: "Thakurgaon Sadar", name_bn: "ঠাকুরগাঁও সদর", latitude: 26.0334, longitude: 88.4617 },
        ]
      },
    ]
  },
  // ==================== MYMENSINGH DIVISION ====================
  {
    id: "mymensingh",
    name_en: "Mymensingh",
    name_bn: "ময়মনসিংহ",
    districts: [
      {
        id: "jamalpur",
        name_en: "Jamalpur",
        name_bn: "জামালপুর",
        upazilas: [
          { id: "bakshiganj", name_en: "Bakshiganj", name_bn: "বকশীগঞ্জ", latitude: 25.1667, longitude: 89.9000 },
          { id: "dewanganj", name_en: "Dewanganj", name_bn: "দেওয়ানগঞ্জ", latitude: 25.1833, longitude: 89.8167 },
          { id: "islampur", name_en: "Islampur", name_bn: "ইসলামপুর", latitude: 25.0500, longitude: 89.7500 },
          { id: "jamalpur_sadar", name_en: "Jamalpur Sadar", name_bn: "জামালপুর সদর", latitude: 24.9375, longitude: 89.9372 },
          { id: "madarganj", name_en: "Madarganj", name_bn: "মাদারগঞ্জ", latitude: 24.9167, longitude: 89.7500 },
          { id: "melandaha", name_en: "Melandaha", name_bn: "মেলান্দহ", latitude: 25.0333, longitude: 89.6667 },
          { id: "sarishabari", name_en: "Sarishabari", name_bn: "সরিষাবাড়ী", latitude: 24.7833, longitude: 89.8167 },
        ]
      },
      {
        id: "mymensingh",
        name_en: "Mymensingh",
        name_bn: "ময়মনসিংহ",
        upazilas: [
          { id: "bhaluka", name_en: "Bhaluka", name_bn: "ভালুকা", latitude: 24.3833, longitude: 90.3833 },
          { id: "dhobaura", name_en: "Dhobaura", name_bn: "ধোবাউড়া", latitude: 25.1500, longitude: 90.1833 },
          { id: "fulbaria", name_en: "Fulbaria", name_bn: "ফুলবাড়িয়া", latitude: 24.5500, longitude: 90.0167 },
          { id: "gaffargaon", name_en: "Gaffargaon", name_bn: "গফরগাঁও", latitude: 24.4333, longitude: 90.5667 },
          { id: "gauripur", name_en: "Gauripur", name_bn: "গৌরীপুর", latitude: 24.8167, longitude: 90.2333 },
          { id: "haluaghat", name_en: "Haluaghat", name_bn: "হালুয়াঘাট", latitude: 25.0667, longitude: 90.4167 },
          { id: "ishwarganj", name_en: "Ishwarganj", name_bn: "ঈশ্বরগঞ্জ", latitude: 24.6667, longitude: 90.4000 },
          { id: "muktagachha", name_en: "Muktagachha", name_bn: "মুক্তাগাছা", latitude: 24.7667, longitude: 90.2833 },
          { id: "mymensingh_sadar", name_en: "Mymensingh Sadar", name_bn: "ময়মনসিংহ সদর", latitude: 24.7471, longitude: 90.4203 },
          { id: "nandail", name_en: "Nandail", name_bn: "নান্দাইল", latitude: 24.6500, longitude: 90.7000 },
          { id: "phulpur", name_en: "Phulpur", name_bn: "ফুলপুর", latitude: 25.0333, longitude: 90.3167 },
          { id: "trishal", name_en: "Trishal", name_bn: "ত্রিশাল", latitude: 24.5833, longitude: 90.4000 },
          { id: "tarakanda", name_en: "Tarakanda", name_bn: "তারাকান্দা", latitude: 24.8000, longitude: 90.0500 },
        ]
      },
      {
        id: "netrokona",
        name_en: "Netrokona",
        name_bn: "নেত্রকোণা",
        upazilas: [
          { id: "atpara", name_en: "Atpara", name_bn: "আটপাড়া", latitude: 24.9167, longitude: 90.7167 },
          { id: "barhatta", name_en: "Barhatta", name_bn: "বারহাট্টা", latitude: 24.9500, longitude: 90.8333 },
          { id: "durgapur_netrokona", name_en: "Durgapur", name_bn: "দুর্গাপুর", latitude: 25.1167, longitude: 90.6667 },
          { id: "kalmakanda", name_en: "Kalmakanda", name_bn: "কলমাকান্দা", latitude: 25.0500, longitude: 90.7167 },
          { id: "kendua", name_en: "Kendua", name_bn: "কেন্দুয়া", latitude: 24.6833, longitude: 90.8167 },
          { id: "khaliajuri", name_en: "Khaliajuri", name_bn: "খালিয়াজুরী", latitude: 24.6667, longitude: 91.0667 },
          { id: "madan", name_en: "Madan", name_bn: "মদন", latitude: 24.5833, longitude: 90.9667 },
          { id: "mohanganj", name_en: "Mohanganj", name_bn: "মোহনগঞ্জ", latitude: 24.6833, longitude: 90.9333 },
          { id: "netrokona_sadar", name_en: "Netrokona Sadar", name_bn: "নেত্রকোণা সদর", latitude: 24.8833, longitude: 90.7333 },
          { id: "purbadhala", name_en: "Purbadhala", name_bn: "পূর্বধলা", latitude: 24.7833, longitude: 90.8833 },
        ]
      },
      {
        id: "sherpur",
        name_en: "Sherpur",
        name_bn: "শেরপুর",
        upazilas: [
          { id: "jhenaigati", name_en: "Jhenaigati", name_bn: "ঝিনাইগাতি", latitude: 25.2167, longitude: 90.0167 },
          { id: "nakla", name_en: "Nakla", name_bn: "নকলা", latitude: 24.9333, longitude: 90.0500 },
          { id: "nalitabari", name_en: "Nalitabari", name_bn: "নালিতাবাড়ী", latitude: 25.0833, longitude: 90.1833 },
          { id: "sherpur_sadar", name_en: "Sherpur Sadar", name_bn: "শেরপুর সদর", latitude: 25.0204, longitude: 90.0152 },
          { id: "sreebardi", name_en: "Sreebardi", name_bn: "শ্রীবর্দী", latitude: 25.2000, longitude: 89.9833 },
        ]
      },
    ]
  },
];

// Helper function to get a division by ID
export const getDivisionById = (divisionId: string): Division | undefined => {
  return bangladeshDivisions.find(d => d.id === divisionId);
};

// Helper function to get a district by ID within a division
export const getDistrictById = (divisionId: string, districtId: string): District | undefined => {
  const division = getDivisionById(divisionId);
  return division?.districts.find(d => d.id === districtId);
};

// Helper function to get an upazila by ID within a district
export const getUpazilaById = (divisionId: string, districtId: string, upazilaId: string): Upazila | undefined => {
  const district = getDistrictById(divisionId, districtId);
  return district?.upazilas.find(u => u.id === upazilaId);
};

// Default location (Dhaka City)
export const defaultBangladeshLocation = {
  divisionId: "dhaka",
  districtId: "dhaka",
  upazilaId: "dhaka_north"
};
