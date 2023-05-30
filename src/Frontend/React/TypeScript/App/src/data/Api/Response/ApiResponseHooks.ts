import { useMemo } from 'react';
import { useAppInstance } from '../../../app';
import { type ApiResponseResource } from './ApiResponseResource';

export interface ApiResponseHooks {
  readonly useResource: () => ApiResponseResource;
}

interface Options {
  readonly pathOfApiResponseResource: string;
}

export function createApiResponseHooks ({
  pathOfApiResponseResource,
}: Options): ApiResponseHooks {
  function useResource (): ApiResponseResource {
    const { hooks } = useAppInstance();

    const translator = hooks.Features.App.Localization.useTranslator(pathOfApiResponseResource);

    const tErrorMessageForDefault = translator.translate('@@ErrorMessageForDefault');
    const tErrorMessageForHttp400 = translator.translate('@@ErrorMessageForHttp400');
    const tErrorMessageForHttp404 = translator.translate('@@ErrorMessageForHttp404');
    const tErrorMessageForHttp500 = translator.translate('@@ErrorMessageForHttp500');

    const { language } = translator;

    return useMemo<ApiResponseResource>(
      () => ({
        getErrorMessageForDefault: () => tErrorMessageForDefault,
        getErrorMessageForHttp400: () => tErrorMessageForHttp400,
        getErrorMessageForHttp404: () => tErrorMessageForHttp404,
        getErrorMessageForHttp500: () => tErrorMessageForHttp500,
        language
      }),
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
