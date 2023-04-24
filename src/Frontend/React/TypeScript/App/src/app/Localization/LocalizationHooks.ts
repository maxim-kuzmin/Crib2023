import { type LocalizationNamespace } from './LocalizationNamespace';
import { type LocalizationService } from './LocalizationService';

export interface LocalizationHooks {
  readonly useLocalizer: (namespace: LocalizationNamespace) => LocalizationService;
}
