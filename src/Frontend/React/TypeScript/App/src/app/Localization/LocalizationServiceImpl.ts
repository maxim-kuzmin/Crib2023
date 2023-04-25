import { type i18n } from 'i18next';
import { type LocalizationService } from './LocalizationService';

export class LocalizationServiceImpl implements LocalizationService {
  constructor (
    private readonly i18n: i18n,
    private readonly searchParams: URLSearchParams,
    private readonly setSearchParams: (searchParams: URLSearchParams) => void
  ) {}

  getCurrentLanguage (): string {
    return this.i18n.language;
  }

  getSupportedLanguages (): string[] {
    return this.i18n.options.supportedLngs as string[];
  }

  setCurrentLanguage (language: string) {
    if (language === this.i18n.language) {
      return;
    }

    this.i18n.changeLanguage(language).then(() => {
      const { lookupQuerystring } = this.i18n.options.detection!;

      const languageKey = lookupQuerystring!;

      if (this.searchParams.has(languageKey)) {
        this.searchParams.delete(languageKey);

        this.setSearchParams(this.searchParams);
      }
    });
  }
}
