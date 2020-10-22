import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import de from './locales/de.json';
import en from './locales/en.json';



export const defaultLocale = "de";

const options = {
    interpolation: {
      escapeValue: false,
    },
  
    debug: true,
    whitelist: ['de', 'en'],
  
    resources: {
      de: {
        common: de,
      },
      en: {
        common: en,
      },
    },
    detection: {
      order: ["path", "navigator"]
    },
  
    fallbackLng: 'de',
  
    ns: ['common'],
  
    defaultNS: 'common',
  
    react: {
      wait: false,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      nsMode: 'default'
    },
};

const Detector = new LanguageDetector();

i18n
    .use(Detector)
    .use(initReactI18next)
    .init(options)

export default i18n;


