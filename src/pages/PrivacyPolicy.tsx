import { Language } from "@/types/language";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PrivacyPolicyProps {
  language: Language;
}

const privacyContent = {
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last Updated: December 30, 2025",
    sections: [
      {
        heading: "Introduction",
        content: "Welcome to Quran Insight. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our application."
      },
      {
        heading: "Information We Collect",
        content: "We collect minimal information necessary to provide our services:\n\n• **Device Information**: Basic device type and operating system for app optimization.\n• **Usage Data**: Anonymous analytics to improve app performance and user experience.\n• **Bookmarks & Preferences**: Your saved bookmarks, reading progress, and app settings are stored locally on your device.\n• **Location Data**: Only used for prayer time calculations, processed locally without being sent to external servers."
      },
      {
        heading: "How We Use Your Information",
        content: "We use the collected information to:\n\n• Provide accurate prayer times based on your location\n• Save your reading progress and bookmarks\n• Improve app performance and fix bugs\n• Enhance user experience through anonymous analytics"
      },
      {
        heading: "Data Storage & Security",
        content: "• Most of your data (bookmarks, preferences, reading progress) is stored locally on your device.\n• We use industry-standard security measures to protect any data transmitted to our servers.\n• We do not sell, trade, or share your personal information with third parties."
      },
      {
        heading: "Third-Party Services",
        content: "Our app may use third-party services for:\n\n• Analytics (anonymous usage statistics)\n• Prayer time calculations\n\nThese services have their own privacy policies governing the use of your information."
      },
      {
        heading: "Your Rights",
        content: "You have the right to:\n\n• Access your personal data stored in the app\n• Delete your local data by clearing app data or uninstalling\n• Opt-out of analytics through device settings\n• Contact us with any privacy concerns"
      },
      {
        heading: "Children's Privacy",
        content: "Our app is suitable for users of all ages. We do not knowingly collect personal information from children under 13 without parental consent."
      },
      {
        heading: "Changes to This Policy",
        content: "We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy in the app with an updated date."
      },
      {
        heading: "Contact Us",
        content: "If you have any questions about this Privacy Policy, please contact us at:\n\nEmail: support@annurdigital.com"
      }
    ]
  },
  bn: {
    title: "গোপনীয়তা নীতি",
    lastUpdated: "সর্বশেষ আপডেট: ৩০ ডিসেম্বর, ২০২৫",
    sections: [
      {
        heading: "ভূমিকা",
        content: "কুরআন ইনসাইটে স্বাগতম। আমরা আপনার গোপনীয়তাকে সম্মান করি এবং আপনার ব্যক্তিগত তথ্য সুরক্ষিত রাখতে প্রতিশ্রুতিবদ্ধ। এই গোপনীয়তা নীতি ব্যাখ্যা করে যে আমরা কীভাবে আপনার তথ্য সংগ্রহ, ব্যবহার এবং সুরক্ষিত করি।"
      },
      {
        heading: "আমরা যে তথ্য সংগ্রহ করি",
        content: "আমরা আমাদের সেবা প্রদানের জন্য ন্যূনতম প্রয়োজনীয় তথ্য সংগ্রহ করি:\n\n• **ডিভাইস তথ্য**: অ্যাপ অপ্টিমাইজেশনের জন্য মৌলিক ডিভাইস প্রকার এবং অপারেটিং সিস্টেম।\n• **ব্যবহার ডেটা**: অ্যাপের কার্যক্ষমতা এবং ব্যবহারকারীর অভিজ্ঞতা উন্নত করতে বেনামী বিশ্লেষণ।\n• **বুকমার্ক ও পছন্দ**: আপনার সংরক্ষিত বুকমার্ক, পড়ার অগ্রগতি এবং অ্যাপ সেটিংস আপনার ডিভাইসে স্থানীয়ভাবে সংরক্ষিত থাকে।\n• **অবস্থান তথ্য**: শুধুমাত্র নামাজের সময় গণনার জন্য ব্যবহৃত, বাহ্যিক সার্ভারে পাঠানো হয় না।"
      },
      {
        heading: "আমরা কীভাবে আপনার তথ্য ব্যবহার করি",
        content: "আমরা সংগৃহীত তথ্য ব্যবহার করি:\n\n• আপনার অবস্থানের উপর ভিত্তি করে সঠিক নামাজের সময় প্রদান করতে\n• আপনার পড়ার অগ্রগতি এবং বুকমার্ক সংরক্ষণ করতে\n• অ্যাপের কার্যক্ষমতা উন্নত করতে এবং বাগ ঠিক করতে\n• বেনামী বিশ্লেষণের মাধ্যমে ব্যবহারকারীর অভিজ্ঞতা উন্নত করতে"
      },
      {
        heading: "ডেটা সংরক্ষণ ও নিরাপত্তা",
        content: "• আপনার বেশিরভাগ ডেটা (বুকমার্ক, পছন্দ, পড়ার অগ্রগতি) আপনার ডিভাইসে স্থানীয়ভাবে সংরক্ষিত থাকে।\n• আমাদের সার্ভারে প্রেরিত যেকোনো ডেটা সুরক্ষিত করতে আমরা শিল্প-মান নিরাপত্তা ব্যবস্থা ব্যবহার করি।\n• আমরা তৃতীয় পক্ষের সাথে আপনার ব্যক্তিগত তথ্য বিক্রি, বাণিজ্য বা শেয়ার করি না।"
      },
      {
        heading: "তৃতীয় পক্ষের সেবা",
        content: "আমাদের অ্যাপ তৃতীয় পক্ষের সেবা ব্যবহার করতে পারে:\n\n• বিশ্লেষণ (বেনামী ব্যবহার পরিসংখ্যান)\n• নামাজের সময় গণনা\n\nএই সেবাগুলির নিজস্ব গোপনীয়তা নীতি রয়েছে যা আপনার তথ্য ব্যবহার নিয়ন্ত্রণ করে।"
      },
      {
        heading: "আপনার অধিকার",
        content: "আপনার অধিকার রয়েছে:\n\n• অ্যাপে সংরক্ষিত আপনার ব্যক্তিগত ডেটা অ্যাক্সেস করা\n• অ্যাপ ডেটা মুছে বা আনইনস্টল করে আপনার স্থানীয় ডেটা মুছে ফেলা\n• ডিভাইস সেটিংসের মাধ্যমে বিশ্লেষণ থেকে অপ্ট-আউট করা\n• যেকোনো গোপনীয়তা উদ্বেগ নিয়ে আমাদের সাথে যোগাযোগ করা"
      },
      {
        heading: "শিশুদের গোপনীয়তা",
        content: "আমাদের অ্যাপ সব বয়সের ব্যবহারকারীদের জন্য উপযুক্ত। আমরা জ্ঞাতসারে পিতামাতার সম্মতি ছাড়া ১৩ বছরের কম বয়সী শিশুদের থেকে ব্যক্তিগত তথ্য সংগ্রহ করি না।"
      },
      {
        heading: "এই নীতিতে পরিবর্তন",
        content: "আমরা সময়ে সময়ে এই গোপনীয়তা নীতি আপডেট করতে পারি। আমরা অ্যাপে আপডেট তারিখ সহ নতুন নীতি পোস্ট করে আপনাকে যেকোনো পরিবর্তন সম্পর্কে অবহিত করব।"
      },
      {
        heading: "যোগাযোগ করুন",
        content: "এই গোপনীয়তা নীতি সম্পর্কে আপনার কোনো প্রশ্ন থাকলে, অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন:\n\nইমেইল: support@annurdigital.com"
      }
    ]
  },
  hi: {
    title: "गोपनीयता नीति",
    lastUpdated: "अंतिम अपडेट: 30 दिसंबर, 2025",
    sections: [
      {
        heading: "परिचय",
        content: "कुरआन इनसाइट में आपका स्वागत है। हम आपकी गोपनीयता का सम्मान करते हैं और आपके व्यक्तिगत डेटा की सुरक्षा के लिए प्रतिबद्ध हैं। यह गोपनीयता नीति बताती है कि जब आप हमारे एप्लिकेशन का उपयोग करते हैं तो हम आपकी जानकारी कैसे एकत्र, उपयोग और सुरक्षित करते हैं।"
      },
      {
        heading: "हम कौन सी जानकारी एकत्र करते हैं",
        content: "हम अपनी सेवाएं प्रदान करने के लिए न्यूनतम आवश्यक जानकारी एकत्र करते हैं:\n\n• **डिवाइस जानकारी**: ऐप अनुकूलन के लिए बुनियादी डिवाइस प्रकार और ऑपरेटिंग सिस्टम।\n• **उपयोग डेटा**: ऐप प्रदर्शन और उपयोगकर्ता अनुभव को बेहतर बनाने के लिए अनाम विश्लेषण।\n• **बुकमार्क और प्राथमिकताएं**: आपके सहेजे गए बुकमार्क, पढ़ने की प्रगति और ऐप सेटिंग्स आपके डिवाइस पर स्थानीय रूप से संग्रहीत हैं।\n• **स्थान डेटा**: केवल नमाज़ के समय की गणना के लिए उपयोग किया जाता है, बाहरी सर्वर पर नहीं भेजा जाता।"
      },
      {
        heading: "हम आपकी जानकारी का उपयोग कैसे करते हैं",
        content: "हम एकत्रित जानकारी का उपयोग करते हैं:\n\n• आपके स्थान के आधार पर सटीक नमाज़ का समय प्रदान करने के लिए\n• आपकी पढ़ने की प्रगति और बुकमार्क सहेजने के लिए\n• ऐप प्रदर्शन में सुधार और बग ठीक करने के लिए\n• अनाम विश्लेषण के माध्यम से उपयोगकर्ता अनुभव को बढ़ाने के लिए"
      },
      {
        heading: "डेटा संग्रहण और सुरक्षा",
        content: "• आपका अधिकांश डेटा (बुकमार्क, प्राथमिकताएं, पढ़ने की प्रगति) आपके डिवाइस पर स्थानीय रूप से संग्रहीत है।\n• हम अपने सर्वर पर प्रेषित किसी भी डेटा की सुरक्षा के लिए उद्योग-मानक सुरक्षा उपायों का उपयोग करते हैं।\n• हम तीसरे पक्ष के साथ आपकी व्यक्तिगत जानकारी को बेचते, व्यापार या साझा नहीं करते हैं।"
      },
      {
        heading: "तृतीय-पक्ष सेवाएं",
        content: "हमारा ऐप तृतीय-पक्ष सेवाओं का उपयोग कर सकता है:\n\n• विश्लेषण (अनाम उपयोग आंकड़े)\n• नमाज़ के समय की गणना\n\nइन सेवाओं की अपनी गोपनीयता नीतियां हैं जो आपकी जानकारी के उपयोग को नियंत्रित करती हैं।"
      },
      {
        heading: "आपके अधिकार",
        content: "आपके पास अधिकार है:\n\n• ऐप में संग्रहीत अपने व्यक्तिगत डेटा तक पहुंचने का\n• ऐप डेटा साफ़ करके या अनइंस्टॉल करके अपना स्थानीय डेटा हटाने का\n• डिवाइस सेटिंग्स के माध्यम से विश्लेषण से ऑप्ट-आउट करने का\n• किसी भी गोपनीयता चिंता के साथ हमसे संपर्क करने का"
      },
      {
        heading: "बच्चों की गोपनीयता",
        content: "हमारा ऐप सभी उम्र के उपयोगकर्ताओं के लिए उपयुक्त है। हम जानबूझकर माता-पिता की सहमति के बिना 13 वर्ष से कम उम्र के बच्चों से व्यक्तिगत जानकारी एकत्र नहीं करते हैं।"
      },
      {
        heading: "इस नीति में परिवर्तन",
        content: "हम समय-समय पर इस गोपनीयता नीति को अपडेट कर सकते हैं। हम ऐप में अपडेट तिथि के साथ नई नीति पोस्ट करके किसी भी बदलाव के बारे में आपको सूचित करेंगे।"
      },
      {
        heading: "हमसे संपर्क करें",
        content: "यदि इस गोपनीयता नीति के बारे में आपके कोई प्रश्न हैं, तो कृपया हमसे संपर्क करें:\n\nईमेल: support@annurdigital.com"
      }
    ]
  }
};

const PrivacyPolicy = ({ language }: PrivacyPolicyProps) => {
  const content = privacyContent[language];

  const renderContent = (text: string) => {
    // Simple markdown-like rendering for bold text
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <ScrollArea className="h-full">
        <div className="container max-w-3xl mx-auto px-4 py-6 pb-24">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {content.title}
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            {content.lastUpdated}
          </p>

          <div className="space-y-8">
            {content.sections.map((section, index) => (
              <section key={index} className="space-y-3">
                <h2 className="text-lg md:text-xl font-semibold text-foreground">
                  {section.heading}
                </h2>
                <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {renderContent(section.content)}
                </div>
              </section>
            ))}
          </div>
        </div>
      </ScrollArea>
  );
};

export default PrivacyPolicy;
