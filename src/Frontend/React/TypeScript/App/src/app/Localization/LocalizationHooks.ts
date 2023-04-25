import { type LocalizationTarget } from './LocalizationTarget';
import { type LocalizationTranslator } from './LocalizationTranslator';

export interface LocalizationHooks {
  readonly useTranslator: (target: LocalizationTarget) => LocalizationTranslator;
}
