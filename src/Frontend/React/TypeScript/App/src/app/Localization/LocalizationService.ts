export interface LocalizationService {
  readonly getCurrentLanguage: () => string;
  readonly getSupportedLanguages: () => string[];
  readonly removeLanguageFromSearchParams: () => void;
  readonly setCurrentLanguage: (language: string) => void;
}
