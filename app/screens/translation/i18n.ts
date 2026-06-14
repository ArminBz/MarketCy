import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en/en.json';
import tr from './tr/tr.json';
import fa from './fa/fa.json';
import uk from './uk/uk.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  returnNull: false,
  resources: {
    en: en,
    tr: tr,
    uk: uk,
    fa: fa,
  },
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
