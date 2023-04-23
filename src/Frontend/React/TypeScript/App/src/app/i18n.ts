import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    detection: {
      lookupQuerystring: 'lng',
    },
    supportedLngs: ['en', 'ru'],
    fallbackLng: 'ru',
    debug: process.env.NODE_ENV === 'development',
    returnEmptyString: false,
    interpolation: {
      // eslint-disable-next-line max-len
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    backend: {
      loadPath: '/i18n/{{ns}}.{{lng}}.json',
    },
    ns: [
      'controls/Table/TableControl',
      'views/Article/Item/ArticleItemView',
      'views/Article/Item/Edit/ArticleItemEditView',
      'views/Article/Table/ArticleTableView',
      'views/Topic/Path/TopicPathView',
    ],
  });
