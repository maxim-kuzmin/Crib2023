import { useMemo } from 'react';
import { getModule, LocalizationNamespace } from '../../../app';
import { type ApiResponseHooks } from './ApiResponseHooks';
import { type ApiResponseResource } from './ApiResponseResource';

export function createApiResponseHooks (): ApiResponseHooks {
  function useResource (): ApiResponseResource {
    const hooksOfLocalization = getModule().getLocalizationHooks();

    const localizer = hooksOfLocalization.useLocalizer(LocalizationNamespace.ApiResponse);

    const valueOfErrorMessageForDefault = localizer.getValue('@@ErrorMessageForDefault');
    const valueOfErrorMessageForHttp400 = localizer.getValue('@@ErrorMessageForHttp400');
    const valueOfErrorMessageForHttp404 = localizer.getValue('@@ErrorMessageForHttp404');
    const valueOfErrorMessageForHttp500 = localizer.getValue('@@ErrorMessageForHttp500');

    return useMemo(
      () => {
        const result: ApiResponseResource = {
          getErrorMessageForDefault: () => valueOfErrorMessageForDefault,
          getErrorMessageForHttp400: () => valueOfErrorMessageForHttp400,
          getErrorMessageForHttp404: () => valueOfErrorMessageForHttp404,
          getErrorMessageForHttp500: () => valueOfErrorMessageForHttp500,
        };

        return result;
      },
      [
        valueOfErrorMessageForDefault,
        valueOfErrorMessageForHttp400,
        valueOfErrorMessageForHttp404,
        valueOfErrorMessageForHttp500,
      ]
    );
  }

  return { useResource };
}
