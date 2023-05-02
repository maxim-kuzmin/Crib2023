import { createStoresHooks } from '../stores/StoresHooks';
import { type LocalizationHooks } from './Localization';
import { createLocalizationHooks } from './Localization/LocalizationHooks';
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
  }
}
