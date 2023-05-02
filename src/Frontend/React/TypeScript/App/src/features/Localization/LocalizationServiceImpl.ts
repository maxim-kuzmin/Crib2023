import { type i18n } from 'i18next';
import { type NavigateFunction } from 'react-router-dom';
import { type LocalizationService } from '../../common';

interface Options {
  readonly i18n: i18n;
  readonly searchParams: URLSearchParams;
  readonly setSearchParams: (searchParams: URLSearchParams) => void;
  readonly navigate: NavigateFunction;
}

export class LocalizationServiceImpl implements LocalizationService {
  private readonly i18n: i18n;
  private readonly navigate: NavigateFunction;
  private readonly searchParams: URLSearchParams;
  private readonly searchParamForLanguage: string;
  private readonly setSearchParams: (searchParams: URLSearchParams) => void;

  constructor ({
    i18n,
    navigate,
    searchParams,
    setSearchParams,
  }: Options) {
    this.i18n = i18n;
    this.searchParams = searchParams;
    this.setSearchParams = setSearchParams;
    this.navigate = navigate;

    const { lookupQuerystring } = this.i18n.options.detection!;

    this.searchParamForLanguage = lookupQuerystring!;
  }

  getCurrentLanguage (): string {
    return this.i18n.language;
  }

  getSupportedLanguages (): string[] {
    return this.i18n.options.supportedLngs as string[];
  }

  removeLanguageFromSearchParams () {
    if (this.searchParams.has(this.searchParamForLanguage)) {
      this.searchParams.delete(this.searchParamForLanguage);

      this.setSearchParams(this.searchParams);
    }
  }

  setCurrentLanguage (language: string) {
    if (language !== this.getCurrentLanguage()) {
      this.changeLanguage(language);
    }
  }

  private changeLanguage (language: string) {
    this.i18n.changeLanguage(language).then(() => {
      this.navigate(0);
    });
  }
}
