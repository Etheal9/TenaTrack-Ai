import { useLanguage } from '../contexts/LanguageContext';
import enTranslations from '../locales/en.json';
import esTranslations from '../locales/es.json';
import frTranslations from '../locales/fr.json';

const translations = {
  en: enTranslations,
  es: esTranslations,
  fr: frTranslations
};

export const useTranslations = () => {
  const { language } = useLanguage();
  
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        console.warn(`Translation missing for key: ${key} in language: ${language}`);
        return key;
      }
    }
    
    return value;
  };

  return { t };
};