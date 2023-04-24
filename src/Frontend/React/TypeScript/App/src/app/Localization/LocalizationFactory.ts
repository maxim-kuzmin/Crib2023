import { useTranslation } from 'react-i18next';
import { type LocalizationHooks } from './LocalizationHooks';
import { type LocalizationNamespace } from './LocalizationNamespace';
import { type LocalizationService } from './LocalizationService';
import { LocalizationServiceImpl } from './LocalizationServiceImpl';

export function createLocalizationHooks (): LocalizationHooks {
  function useLocalizer (namespace: LocalizationNamespace): LocalizationService {
    const { t } = useTranslation(namespace);

    return new LocalizationServiceImpl(t);
  }

  return { useLocalizer };
}
