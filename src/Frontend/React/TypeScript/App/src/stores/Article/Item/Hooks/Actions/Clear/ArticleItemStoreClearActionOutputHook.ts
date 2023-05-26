import { useCallback } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type ArticleItemStoreClearActionInput,
  type ArticleItemStoreClearActionOutput,
  type ArticleItemStoreSliceName,
} from '../../../../../../features';
import { useStoreClearActionDispatch } from './ArticleItemStoreClearActionDispatchHook';

export function useStoreClearActionOutput (
  sliceName: ArticleItemStoreSliceName,
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
