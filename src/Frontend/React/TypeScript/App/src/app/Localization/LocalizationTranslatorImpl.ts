import { type TFunction } from 'i18next';
import { type LocalizationTranslator } from '../../common';

interface Options {
  readonly functionToTranslate: TFunction;
  readonly language: string;
}

export class LocalizationTranslatorImpl implements LocalizationTranslator {
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
