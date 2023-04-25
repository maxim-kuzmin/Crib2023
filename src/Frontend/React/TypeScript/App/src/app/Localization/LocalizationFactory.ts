import { useTranslation } from 'react-i18next';
import { type LocalizationHooks } from './LocalizationHooks';
import { type LocalizationService } from './LocalizationService';
import { type LocalizationTarget } from './LocalizationTarget';
import { type LocalizationTranslator } from './LocalizationTranslator';
import { LocalizationTranslatorImpl } from './LocalizationTranslatorImpl';
import { LocalizationServiceImpl } from './LocalizationServiceImpl';
import { useNavigate, useSearchParams } from 'react-router-dom';

export function createLocalizationHooks (): LocalizationHooks {
  function useService (): LocalizationService {
    const { i18n } = useTranslation();

    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();

    return new LocalizationServiceImpl({ i18n, searchParams, setSearchParams, navigate });
  }

  function useTranslator (target: LocalizationTarget): LocalizationTranslator {
    const { t } = useTranslation(target);

    return new LocalizationTranslatorImpl(t);
  }

  return { useService, useTranslator };
}
