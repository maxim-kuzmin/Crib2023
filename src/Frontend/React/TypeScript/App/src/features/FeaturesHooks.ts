import { createStoresHooks } from '../stores';
import { type LocalizationHooks, createLocalizationHooks } from './Localization';
import { type StoresHooks } from './Stores';

export interface FeaturesHooks {
  readonly Localization: LocalizationHooks;
  readonly Stores: StoresHooks;
}

export function createFeaturesHooks (): FeaturesHooks {
  const hooksOfLocalization = createLocalizationHooks();
  const hooksOfStores = createStoresHooks();

  return {
    Localization: hooksOfLocalization,
    Stores: hooksOfStores,
  };
}
