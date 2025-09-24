import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import enHeader from './locales/en/enHeader.json';
import uaHeader from './locales/ua/uaHeader.json';

i18next.use(initReactI18next).init({
  lng: 'en',
  debug: true,
  fallbackLng: 'en',
  ns: ['header'],
  resources: {
    en: {
      header: enHeader,
    },
    ua: {
      header: uaHeader,
    },
  },
});
