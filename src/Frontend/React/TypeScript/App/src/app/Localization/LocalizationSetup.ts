import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { LocalizationNamespace } from './LocalizationNamespace';

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
      LocalizationNamespace.ApiResponse,
      LocalizationNamespace.ArticleItemStore,
      LocalizationNamespace.ArticleItemView,
      LocalizationNamespace.ArticleItemEditView,
      LocalizationNamespace.ArticleListStore,
      LocalizationNamespace.ArticleTableView,
      LocalizationNamespace.ConfirmControl,
      LocalizationNamespace.TableControl,
      LocalizationNamespace.TopicItemStore,
      LocalizationNamespace.TopicPathView,
      LocalizationNamespace.TopicTreeStore,
    ],
  });
