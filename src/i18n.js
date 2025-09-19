import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en/translation.json';
import ua from './locales/ua/translation.json';

i18next.use(initReactI18next).init({
  lng: 'en',
  debug: true,
  resources: {
    en: {
      translation: en,
    },
    ua: {
      translation: ua,
    },
  },
});
