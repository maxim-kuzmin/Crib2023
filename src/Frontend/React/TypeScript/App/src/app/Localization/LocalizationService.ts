export interface LocalizationService {
  readonly getCurrentLanguage: () => string;
  readonly getSupportedLanguages: () => string[];
  readonly setCurrentLanguage: (language: string) => void;
}
