import { useCallback } from 'react';
import {
  type ArticleItemStoreClearActionInput,
  type ArticleItemStoreClearActionOutput
} from '../../../../../../app';
import { StoreDispatchType } from '../../../../../../common';
import { useStoreClearActionDispatch } from './ArticleItemStoreClearActionDispatchHook';

export function useStoreClearActionOutput (
  sliceName: string,
  input: ArticleItemStoreClearActionInput
): ArticleItemStoreClearActionOutput {
  const { onActionCompleted } = input;

  const callback = useCallback(
    () => {
      if (onActionCompleted) {
        onActionCompleted();
      }
    },
    [onActionCompleted]
  );

  const dispatchOfClearAction = useStoreClearActionDispatch(
    sliceName,
    {
      callback,
      dispatchType: StoreDispatchType.Unmount
    }
  );

  return {
    dispatchOfClearAction
  };
}
