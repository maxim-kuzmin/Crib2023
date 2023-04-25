export interface LocalizationTranslator {
  readonly language: string;
  readonly translate: (name: string) => string;
}
