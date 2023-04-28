import { useMemo } from 'react';
import app, { LocalizationTarget } from '../../../app';
import { type ApiResponseResource } from './ApiResponseResource';

export interface ApiResponseHooks {
  readonly useResource: () => ApiResponseResource;
}

export function createApiResponseHooks (): ApiResponseHooks {
  function useResource (): ApiResponseResource {
    const translator = app.hooks.Localization.useTranslator(LocalizationTarget.ApiResponse);

    const tErrorMessageForDefault = translator.translate('@@ErrorMessageForDefault');
    const tErrorMessageForHttp400 = translator.translate('@@ErrorMessageForHttp400');
    const tErrorMessageForHttp404 = translator.translate('@@ErrorMessageForHttp404');
    const tErrorMessageForHttp500 = translator.translate('@@ErrorMessageForHttp500');

    const { language } = translator;

    return useMemo(
      () => {
        const result: ApiResponseResource = {
          getErrorMessageForDefault: () => tErrorMessageForDefault,
          getErrorMessageForHttp400: () => tErrorMessageForHttp400,
          getErrorMessageForHttp404: () => tErrorMessageForHttp404,
          getErrorMessageForHttp500: () => tErrorMessageForHttp500,
          language
        };

        return result;
      },
      [
        tErrorMessageForDefault,
        tErrorMessageForHttp400,
        tErrorMessageForHttp404,
        tErrorMessageForHttp500,
        language
      ]
    );
  }

  return { useResource };
}
