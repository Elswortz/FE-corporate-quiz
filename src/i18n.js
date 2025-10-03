import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import enHeader from './locales/en/enHeader.json';
import enAuth from './locales/en/enAuth.json';

import uaHeader from './locales/ua/uaHeader.json';
import uaAuth from './locales/ua/uaAuth.json';

i18next.use(initReactI18next).init({
  lng: 'en',
  debug: true,
  fallbackLng: 'en',
  ns: ['header', 'auth'],
  resources: {
    en: {
      header: enHeader,
      auth: enAuth,
    },
    ua: {
      header: uaHeader,
      auth: uaAuth,
    },
  },
});
