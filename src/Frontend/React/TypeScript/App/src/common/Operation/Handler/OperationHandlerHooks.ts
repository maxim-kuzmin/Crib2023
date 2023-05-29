import { useMemo } from 'react';
import { useAppInstance } from '../../../app';
import { type OperationHandlerResource } from './OperationHandlerResource';

export interface OperationHandlerHooks {
  readonly useResource: () => OperationHandlerResource;
}

interface Options {
  pathOfOperationHandlerResource: string;
}

export function createOperationHandlerHooks ({
  pathOfOperationHandlerResource,
}: Options): OperationHandlerHooks {
  function useResource (): OperationHandlerResource {
    const { hooks } = useAppInstance();

    const translator = hooks.Features.App.Localization.useTranslator(pathOfOperationHandlerResource);

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
