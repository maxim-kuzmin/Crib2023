import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { type LocalizationHooks } from './LocalizationHooks';
import { type LocalizationService, type LocalizationTranslator } from '../../common';
import { type LocalizationTarget } from './LocalizationTarget';
import { LocalizationTranslatorImpl } from './LocalizationTranslatorImpl';
import { LocalizationServiceImpl } from './LocalizationServiceImpl';

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
