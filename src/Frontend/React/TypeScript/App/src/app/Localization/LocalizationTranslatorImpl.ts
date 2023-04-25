import { type TFunction } from 'i18next';
import { type LocalizationTranslator } from './LocalizationTranslator';

export class LocalizationTranslatorImpl implements LocalizationTranslator {
  constructor (private readonly t: TFunction) { }

  translate (name: string): string {
    return this.t(name);
  }
}
