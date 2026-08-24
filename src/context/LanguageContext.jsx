import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext();

const translations = {
  en: {
    chooseLanguage: "Choose Your Language",
    selectLanguage: "Select your preferred language to continue",
    english: "English",
    hindi: "Hindi",
    englishNative: "English",
    hindiNative: "हिंदी",
    continue: "Continue",
    languageNote:
      "Your language preference helps us provide you with the best experience.",
  },

  hi: {
    chooseLanguage: "अपनी भाषा चुनें",
    selectLanguage: "जारी रखने के लिए अपनी पसंदीदा भाषा चुनें",
    english: "अंग्रेज़ी",
    hindi: "हिंदी",
    englishNative: "English",
    hindiNative: "हिंदी",
    continue: "जारी रखें",
    languageNote:
      "आपकी भाषा की पसंद हमें आपको बेहतर अनुभव देने में मदद करती है।",
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("bookagri-language") || "en";
  });

  useEffect(() => {
    localStorage.setItem("bookagri-language", language);
  }, [language]);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}