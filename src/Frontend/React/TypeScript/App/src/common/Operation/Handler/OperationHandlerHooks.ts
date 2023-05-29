import { useMemo } from 'react';
import { useAppInstance } from '../../../app';
import { type OperationHandlerResource, getOperationHandlerResourcePath } from './OperationHandlerResource';

export interface OperationHandlerHooks {
  readonly useResource: () => OperationHandlerResource;
}

export function createOperationHandlerHooks (): OperationHandlerHooks {
  function useResource (): OperationHandlerResource {
    const { hooks } = useAppInstance();

    const translator = hooks.Features.App.Localization.useTranslator(getOperationHandlerResourcePath());

    const tCode = translator.translate('@@Code');
    const tOperation = translator.translate('@@Operation');
    const tStart = translator.translate('@@Start');
    const tSuccess = translator.translate('@@Success');

    const { language } = translator;

    return useMemo(
      () => {
        const result: OperationHandlerResource = {
          getCode: () => tCode,
          getOperation: () => tOperation,
          getStart: () => tStart,
          getSuccess: () => tSuccess,
          language
        }

        return result;
      },
      [
        tCode,
        tOperation,
        tStart,
        tSuccess,
        language
      ]
    );
  }

  return { useResource };
}
