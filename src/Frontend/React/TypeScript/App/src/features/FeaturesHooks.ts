import { createStoresHooks } from '../stores';
import {
  type LocalizationHooks,
  type StoresHooks,
  createLocalizationHooks,
} from '.';

export interface FeaturesHooks {
  readonly Localization: LocalizationHooks;
  readonly Stores: StoresHooks;
}

class Implementation implements FeaturesHooks {
  readonly Localization: LocalizationHooks;
  readonly Stores: StoresHooks;

  constructor () {
    this.Localization = createLocalizationHooks();
    this.Stores = createStoresHooks();
  }
}

export function createFeaturesHooks (): FeaturesHooks {
  return new Implementation();
}
