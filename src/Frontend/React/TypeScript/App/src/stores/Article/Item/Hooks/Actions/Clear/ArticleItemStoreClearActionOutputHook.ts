import { useCallback } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type ArticleItemStoreSlice,
  type ArticleItemStoreClearActionInput,
  type ArticleItemStoreClearActionOutput
} from '../../../../../../features';
import { useStoreClearActionDispatch } from './ArticleItemStoreClearActionDispatchHook';

export function useStoreClearActionOutput (
  slice: ArticleItemStoreSlice,
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
    slice,
    {
      callback,
      dispatchType: StoreDispatchType.Unmount
    }
  );

  return {
    dispatchOfClearAction
  };
}
