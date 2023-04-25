import { type LocalizationService } from './LocalizationService';
import { type LocalizationTarget } from './LocalizationTarget';
import { type LocalizationTranslator } from './LocalizationTranslator';

export interface LocalizationHooks {
  readonly useService: () => LocalizationService;
  readonly useTranslator: (target: LocalizationTarget) => LocalizationTranslator;
}
