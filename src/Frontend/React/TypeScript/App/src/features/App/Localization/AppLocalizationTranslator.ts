import { type TFunction } from 'i18next';
import { type LocalizationTranslator } from '../../../common';

interface Options {
  readonly functionToTranslate: TFunction;
  readonly language: string;
}

class Implementation implements LocalizationTranslator {
  private readonly functionToTranslate: TFunction;
  public readonly language: string;

  constructor ({
    language,
    functionToTranslate
  }: Options) {
    this.functionToTranslate = functionToTranslate;
    this.language = language;
  }

  translate (name: string): string {
    return this.functionToTranslate(name);
  }
}

export function createAppLocalizationTranslator (options: Options): LocalizationTranslator {
  return new Implementation(options);
}
