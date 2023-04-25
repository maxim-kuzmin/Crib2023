import { type LocalizationService, type LocalizationTranslator } from '../../common';
import { type LocalizationTarget } from './LocalizationTarget';

export interface LocalizationHooks {
  readonly useService: () => LocalizationService;
  readonly useTranslator: (target: LocalizationTarget) => LocalizationTranslator;
}
