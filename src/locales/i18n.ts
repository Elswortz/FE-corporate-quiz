import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import enHeader from './en/enHeader.json';
import uaHeader from './ua/uaHeader.json';
import enAuth from './en/enAuth.json';
import uaAuth from './ua/uaAuth.json';
import enAbout from './en/enAbout.json';
import uaAbout from './ua/uaAbout.json';
import enUsers from './en/enUsers.json';
import uaUsers from './ua/uaUsers.json';
import enCompanies from './en/enCompanies.json';
import uaCompanies from './ua/uaCompanies.json';

i18next.use(initReactI18next).init({
  lng: 'en',
  debug: true,
  fallbackLng: 'en',
  ns: ['header', 'auth', 'about', 'users', 'companies'],
  resources: {
    en: {
      header: enHeader,
      auth: enAuth,
      about: enAbout,
      users: enUsers,
      companies: enCompanies,
    },
    ua: {
      header: uaHeader,
      auth: uaAuth,
      about: uaAbout,
      users: uaUsers,
      companies: uaCompanies,
    },
  },
});
