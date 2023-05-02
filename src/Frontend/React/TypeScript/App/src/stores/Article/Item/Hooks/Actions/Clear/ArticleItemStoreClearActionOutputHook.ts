import { useCallback } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type ArticleItemStoreClearActionInput,
  type ArticleItemStoreClearActionOutput
} from '../../../../../../features';
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
