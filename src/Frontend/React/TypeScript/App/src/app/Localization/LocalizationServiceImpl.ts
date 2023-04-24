import { type TFunction } from 'i18next';
import { type LocalizationService } from './LocalizationService';

export class LocalizationServiceImpl implements LocalizationService {
  constructor (private readonly t: TFunction) { }

  getValue (name: string): string {
    return this.t(name);
  }
}
