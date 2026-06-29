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
import enCompaniesDetails from './en/enCompaniesDetails.json';
import uaCompaniesDetails from './ua/uaCompaniesDetails.json';
import enQuizzes from './en/enQuizzes.json';
import uaQuizzes from './ua/uaQuizzes.json';
import enMembers from './en/enMembers.json';
import uaMembers from './ua/uaMembers.json';
import enInvitations from './en/enInvitations.json';
import uaInvitations from './ua/uaInvitations.json';

i18next.use(initReactI18next).init({
  lng: 'en',
  debug: true,
  fallbackLng: 'en',
  ns: ['header', 'auth', 'about', 'users', 'companies', 'companiesDetails', 'quizzes', 'members', 'invitations'],
  resources: {
    en: {
      header: enHeader,
      auth: enAuth,
      about: enAbout,
      users: enUsers,
      companies: enCompanies,
      companiesDetails: enCompaniesDetails,
      quizzes: enQuizzes,
      members: enMembers,
      invitations: enInvitations,
    },
    ua: {
      header: uaHeader,
      auth: uaAuth,
      about: uaAbout,
      users: uaUsers,
      companies: uaCompanies,
      companiesDetails: uaCompaniesDetails,
      quizzes: uaQuizzes,
      members: uaMembers,
      invitations: uaInvitations,
    },
  },
});
