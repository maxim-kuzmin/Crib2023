import { initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import {
  getConfirmControlResourcePath,
  getTableControlResourcePath,
} from '../../controls';
import { getApiResponseResourcePath } from '../../data';
import {
  getArticleItemStoreResourcePath,
  getArticleListStoreResourcePath,
  getTopicItemStoreResourcePath,
  getTopicTreeStoreResourcePath,
} from '../../stores';
import {
  getArticleItemViewResourcePath,
  getArticleItemEditViewResourcePath,
  getArticleTableViewResourcePath,
  getTopicPathViewResourcePath,
} from '../../views';

export interface LocalizationSetup {
  readonly run: () => void;
}

class Implementation implements LocalizationSetup {
  run () {
    i18next
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
        getApiResponseResourcePath(),
        getArticleItemStoreResourcePath(),
        getArticleItemViewResourcePath(),
        getArticleItemEditViewResourcePath(),
        getArticleListStoreResourcePath(),
        getArticleTableViewResourcePath(),
        getConfirmControlResourcePath(),
        getTableControlResourcePath(),
        getTopicItemStoreResourcePath(),
        getTopicPathViewResourcePath(),
        getTopicTreeStoreResourcePath(),
      ],
    });
  }
}

export function createLocalizationSetup (): LocalizationSetup {
  return new Implementation();
}
