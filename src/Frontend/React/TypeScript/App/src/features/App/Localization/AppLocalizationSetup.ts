import { initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

export interface AppLocalizationSetup {
  readonly run: () => void;
}

interface Options {
  readonly paths: string[];
}

class Implementation implements AppLocalizationSetup {
  private readonly paths: string[];

  constructor ({
    paths
  }: Options) {
    this.paths = paths;
  }

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
      ns: this.paths,
    });
  }
}

export function createAppLocalizationSetup (options: Options): AppLocalizationSetup {
  return new Implementation(options);
}
