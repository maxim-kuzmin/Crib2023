import { useMemo } from 'react';
import { getModule, LocalizationTarget } from '../../../app';
import { type ApiResponseHooks } from './ApiResponseHooks';
import { type ApiResponseResource } from './ApiResponseResource';

export function createApiResponseHooks (): ApiResponseHooks {
  function useResource (): ApiResponseResource {
    const hooksOfLocalization = getModule().getLocalizationHooks();

    const localizer = hooksOfLocalization.useTranslator(LocalizationTarget.ApiResponse);

    const tErrorMessageForDefault = localizer.translate('@@ErrorMessageForDefault');
    const tErrorMessageForHttp400 = localizer.translate('@@ErrorMessageForHttp400');
    const tErrorMessageForHttp404 = localizer.translate('@@ErrorMessageForHttp404');
    const tErrorMessageForHttp500 = localizer.translate('@@ErrorMessageForHttp500');

    return useMemo(
      () => {
        const result: ApiResponseResource = {
          getErrorMessageForDefault: () => tErrorMessageForDefault,
          getErrorMessageForHttp400: () => tErrorMessageForHttp400,
          getErrorMessageForHttp404: () => tErrorMessageForHttp404,
          getErrorMessageForHttp500: () => tErrorMessageForHttp500,
        };

        return result;
      },
      [
        tErrorMessageForDefault,
        tErrorMessageForHttp400,
        tErrorMessageForHttp404,
        tErrorMessageForHttp500,
      ]
    );
  }

  return { useResource };
}
