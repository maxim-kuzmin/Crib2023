import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { type LocalizationService, type LocalizationTranslator } from '../../common';
import { createLocalizationService } from './LocalizationService';
import { createLocalizationTranslator } from './LocalizationTranslator';

export interface LocalizationHooks {
  readonly useService: () => LocalizationService;
  readonly useTranslator: (resourcePath: string) => LocalizationTranslator;
}

export function createLocalizationHooks (): LocalizationHooks {
  function useService (): LocalizationService {
    const { i18n } = useTranslation();

    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();

    return createLocalizationService({ i18n, searchParams, setSearchParams, navigate });
  }

  function useTranslator (resourcePath: string): LocalizationTranslator {
    const { i18n, t } = useTranslation(resourcePath);

    return createLocalizationTranslator({
      functionToTranslate: t,
      language: i18n.language
    });
  }

  return { useService, useTranslator };
}
