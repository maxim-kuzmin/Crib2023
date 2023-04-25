import { initReactI18next } from 'react-i18next';
import Localization from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { LocalizationTarget } from './LocalizationTarget';

Localization
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
      loadPath: '/ResourceFiles/{{ns}}.{{lng}}.json',
    },
    ns: [
      LocalizationTarget.ApiResponse,
      LocalizationTarget.ArticleItemStore,
      LocalizationTarget.ArticleItemView,
      LocalizationTarget.ArticleItemEditView,
      LocalizationTarget.ArticleListStore,
      LocalizationTarget.ArticleTableView,
      LocalizationTarget.ConfirmControl,
      LocalizationTarget.TableControl,
      LocalizationTarget.TopicItemStore,
      LocalizationTarget.TopicPathView,
      LocalizationTarget.TopicTreeStore,
    ],
  });
