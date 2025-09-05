import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en/en.json';
import tr from './tr/tr.json';
import fa from './fa/fa.json';
import uk from './uk/uk.json';

import Backend from 'i18next-locize-backend';
import LastUsed from 'locize-lastused';
import { locizePlugin } from "locize";

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: en,
    tr: tr,
    uk: uk,
    fa: fa,
  },
  interpolation: {
    escapeValue: false // react already safes from xss
  }
});

// const locizeOptions = {
//   projectId: 'f12ae336-d149-42e5-a6e5-12abf4684574',
//   apiKey: 'd2cb66e2-c970-48f3-a34d-162be0bbe187', // YOU should not expose your apps API key to production!!!
//   referenceLng: 'en',
// };
//
// i18n
//
//
//   .use(Backend)
//   .use(initReactI18next)
//
//   .init({
//     compatibilityJSON: 'v3',
//     debug: true,
//     fallbackLng: 'en',
//     interpolation: {
//       escapeValue: false, // not needed for react as it escapes by default
//
//       // format: (value, format, lng) => { // legacy usage
//       //   if (value instanceof Date) {
//       //     return DateTime.fromJSDate(value).setLocale(lng).toLocaleString(DateTime[format])
//       //   }
//       //   return value;
//       // }
//     },
//     backend: locizeOptions,
//     locizeLastUsed: locizeOptions,
//     saveMissing: true
//   });
//
// // new usage

export default i18n;
