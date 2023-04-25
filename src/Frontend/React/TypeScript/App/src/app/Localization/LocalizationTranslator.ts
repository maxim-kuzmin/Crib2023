export interface LocalizationTranslator {
  readonly translate: (name: string) => string;
}
