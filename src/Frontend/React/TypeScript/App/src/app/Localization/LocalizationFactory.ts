import { useTranslation } from 'react-i18next';
import { type LocalizationHooks } from './LocalizationHooks';
import { type LocalizationTarget } from './LocalizationTarget';
import { type LocalizationTranslator } from './LocalizationTranslator';
import { LocalizationTranslatorImpl } from './LocalizationTranslatorImpl';

export function createLocalizationHooks (): LocalizationHooks {
  function useTranslator (target: LocalizationTarget): LocalizationTranslator {
    const { t } = useTranslation(target);

    return new LocalizationTranslatorImpl(t);
  }

  return { useTranslator };
}
