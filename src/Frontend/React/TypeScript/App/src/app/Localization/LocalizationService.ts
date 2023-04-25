export interface LocalizationService {
  readonly getCurrentLanguage: () => string;
  readonly getSupportedLanguages: () => string[];
  readonly isLanguageFoundBySearchParam: () => boolean;
  readonly removeSearchParamForLanguage: () => void;
  readonly setCurrentLanguage: (language: string) => void;
}
