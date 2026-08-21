import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import commonFr from './locales/fr/common.json';
import homeFr from './locales/fr/home.json';
import eventsFr from './locales/fr/events.json';
import galleryFr from './locales/fr/gallery.json';
import newsFr from './locales/fr/news.json';
import partnersFr from './locales/fr/partners.json';
import membershipFr from './locales/fr/membership.json';
import donationFr from './locales/fr/donation.json';
import legalFr from './locales/fr/legal.json';
import formsFr from './locales/fr/forms.json';

import commonEn from './locales/en/common.json';
import homeEn from './locales/en/home.json';
import eventsEn from './locales/en/events.json';
import galleryEn from './locales/en/gallery.json';
import newsEn from './locales/en/news.json';
import partnersEn from './locales/en/partners.json';
import membershipEn from './locales/en/membership.json';
import donationEn from './locales/en/donation.json';
import legalEn from './locales/en/legal.json';
import formsEn from './locales/en/forms.json';

export const defaultNS = 'common';

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'fr',
    supportedLngs: ['fr', 'en'],
    defaultNS,
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'apcdd-lang',
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
    resources: {
      fr: {
        common: commonFr,
        home: homeFr,
        events: eventsFr,
        gallery: galleryFr,
        news: newsFr,
        partners: partnersFr,
        membership: membershipFr,
        donation: donationFr,
        legal: legalFr,
        forms: formsFr,
      },
      en: {
        common: commonEn,
        home: homeEn,
        events: eventsEn,
        gallery: galleryEn,
        news: newsEn,
        partners: partnersEn,
        membership: membershipEn,
        donation: donationEn,
        legal: legalEn,
        forms: formsEn,
      },
    },
  });

export default i18next;
