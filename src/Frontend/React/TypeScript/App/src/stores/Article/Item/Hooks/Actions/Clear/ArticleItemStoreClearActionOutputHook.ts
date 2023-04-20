import { useCallback } from 'react';
import {
  type ArticleItemStoreClearActionInput,
  type ArticleItemStoreClearActionOutput
} from '../../../../../../app/Stores';
import { StoreDispatchType } from '../../../../../../common';
import { useClearActionDispatch } from './ArticleItemStoreClearActionDispatchHook';

// ---Store---> //

type ClearActionInput = ArticleItemStoreClearActionInput;
type ClearActionOutput = ArticleItemStoreClearActionOutput;

// <---Store--- //

export function useClearActionOutput (sliceName: string, input: ClearActionInput): ClearActionOutput {
  const { onActionCompleted } = input;

  const callback = useCallback(() => {
      if (onActionCompleted) {
        onActionCompleted();
      }
    },
    [onActionCompleted]
  );

  const dispatchOfClearAction = useClearActionDispatch(
    sliceName,
    {
      callback,
      dispatchType: StoreDispatchType.Unmount
    }
  );

  return { dispatchOfClearAction };
}
