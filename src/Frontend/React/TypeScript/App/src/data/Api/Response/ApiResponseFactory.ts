import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { LocalizationNamespace } from '../../../app';
import { type ApiResponseHooks } from './ApiResponseHooks';
import { type ApiResponseResource } from './ApiResponseResource';

export function createApiResponseHooks (): ApiResponseHooks {
  function useResource (): ApiResponseResource {
    const { t } = useTranslation(LocalizationNamespace.ApiResponse);

    const tErrorMessageForDefault = t('@@ErrorMessageForDefault');
    const tErrorMessageForHttp400BadRequest = t('@@ErrorMessageForHttp400BadRequest');
    const tErrorMessageForHttp404NotFound = t('@@ErrorMessageForHttp404NotFound');
    const tErrorMessageHttp500InternalServerError = t('@@ErrorMessageForHttp500InternalServerError');

    return useMemo(
      () => {
        const result: ApiResponseResource = {
          getErrorMessageForDefault: () => tErrorMessageForDefault,
          getErrorMessageForHttp400BadRequest: () => tErrorMessageForHttp400BadRequest,
          getErrorMessageForHttp404NotFound: () => tErrorMessageForHttp404NotFound,
          getErrorMessageForHttp500InternalServerError: () => tErrorMessageHttp500InternalServerError,
        };

        return result;
      },
      [
        tErrorMessageForDefault,
        tErrorMessageForHttp400BadRequest,
        tErrorMessageForHttp404NotFound,
        tErrorMessageHttp500InternalServerError,
      ]
    );
  }

  return { useResource };
}
