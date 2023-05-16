import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { type LocalizationService, type LocalizationTranslator } from '../../../common';
import { createAppLocalizationService } from './AppLocalizationService';
import { createAppLocalizationTranslator } from './AppLocalizationTranslator';

export interface AppLocalizationHooks {
  readonly useService: () => LocalizationService;
  readonly useTranslator: (resourcePath: string) => LocalizationTranslator;
}

export function createAppLocalizationHooks (): AppLocalizationHooks {
  function useService (): LocalizationService {
    const { i18n } = useTranslation();

    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();

    return createAppLocalizationService({ i18n, searchParams, setSearchParams, navigate });
  }

  function useTranslator (resourcePath: string): LocalizationTranslator {
    const { i18n, t } = useTranslation(resourcePath);

    return createAppLocalizationTranslator({
      functionToTranslate: t,
      language: i18n.language
    });
  }

  return { useService, useTranslator };
}
