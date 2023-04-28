import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { type LocalizationService, type LocalizationTranslator } from '../../common';
import { type LocalizationTarget } from './LocalizationTarget';
import { LocalizationTranslatorImpl } from './LocalizationTranslatorImpl';
import { LocalizationServiceImpl } from './LocalizationServiceImpl';

export interface LocalizationHooks {
  readonly useService: () => LocalizationService;
  readonly useTranslator: (target: LocalizationTarget) => LocalizationTranslator;
}

export function createLocalizationHooks (): LocalizationHooks {
  function useService (): LocalizationService {
    const { i18n } = useTranslation();

    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();

    return new LocalizationServiceImpl({ i18n, searchParams, setSearchParams, navigate });
  }

  function useTranslator (target: LocalizationTarget): LocalizationTranslator {
    const { i18n, t } = useTranslation(target);

    return new LocalizationTranslatorImpl({
      functionToTranslate: t,
      language: i18n.language
    });
  }

  return { useService, useTranslator };
}
