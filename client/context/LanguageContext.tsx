import React, { createContext, useContext, useState } from "react";

export type Language = "en" | "hi" | "cg";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    title: "Raipur Smart Water Initiative",
    hero_headline: "Report Water Issues",
    hero_instantly: "Instantly.",
    hero_sub: "Help us maintain fair water distribution. Report leaks, shortages, or quality issues directly with real-time AI & IoT tracking.",
    live_status: "Live Network Status",
    ai_pipeline: "AI Pipeline Diagnostics",
    ai_desc: "Analyze pipe corrosion and predict leak risk using AI vision.",
    try_now: "Try Now",
    field_portal: "Field Engineer Portal",
    emergency_sos: "Emergency Water SOS",
    emergency_desc: "Immediate relief for severe contamination or complete supply failure",
    request_tanker: "Request Emergency Tanker",
    track_status: "Track Ticket Status",
    report_issue: "Submit Complaint",
    water_quality: "Water Quality Index",
    zone_status: "Zone Pressure & Distribution",
  },
  hi: {
    title: "रायपुर स्मार्ट जल वितरण पहल",
    hero_headline: "जल समस्या रिपोर्ट करें",
    hero_instantly: "तुरंत प्रभाव से।",
    hero_sub: "निष्पक्ष जल वितरण बनाए रखने में मदद करें। रिसाव, किल्लत या पानी की गुणवत्ता से जुड़ी शिकायतें रियल-टाइम ट्रैकिंग के साथ दर्ज करें।",
    live_status: "लाइव नेटवर्क स्थिति",
    ai_pipeline: "एआई पाइपलाइन निदान",
    ai_desc: "एआई विज़न का उपयोग करके पाइप जंग और रिसाव जोखिम का विश्लेषण करें।",
    try_now: "अभी आज़माएं",
    field_portal: "फील्ड इंजीनियर पोर्टल",
    emergency_sos: "आपातकालीन जल हेल्पलाईन (SOS)",
    emergency_desc: "गंभीर जल प्रदूषण या पानी न आने की स्थिति में तुरंत सहायता",
    request_tanker: "आपातकालीन टैंकर मंगवाएं",
    track_status: "शिकायत की स्थिति जांचें",
    report_issue: "शिकायत दर्ज करें",
    water_quality: "जल गुणवत्ता सूचकांक (WQI)",
    zone_status: "जोन दबाव और वितरण",
  },
  cg: {
    title: "रायपुर सियान पानी योजना",
    hero_headline: "पानी के समस्या दर्ज करव",
    hero_instantly: "झटकुन।",
    hero_sub: "सब्बों बर बराबर पानी पहुँचाए म मदद करव। पानी चुहना, किल्लत या पानी खराबी के शिकायत लाइव ट्रैकिंग संग दर्ज करव।",
    live_status: "लाइव पानी नेटवर्क",
    ai_pipeline: "एआई पाइप जाँच",
    ai_desc: "एआई कैमरा ले पाइप के खराबी अउ चुहना के जानकारी पाव।",
    try_now: "अभी देखव",
    field_portal: "फील्ड इंजीनियर पोर्टल",
    emergency_sos: "आपातकालीन पानी SOS",
    emergency_desc: "अचानक पानी बंद या गंदा पानी आए म तुरंत टैंकर अउ मदद पाव",
    request_tanker: "पानी टैंकर के मांग करव",
    track_status: "शिकायत की स्थिति देखव",
    report_issue: "शिकायत दर्ज करव",
    water_quality: "पानी की गुणवत्ता (WQI)",
    zone_status: "जोन दबाव अउ सप्लाई",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language]?.[key] || translations["en"]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
