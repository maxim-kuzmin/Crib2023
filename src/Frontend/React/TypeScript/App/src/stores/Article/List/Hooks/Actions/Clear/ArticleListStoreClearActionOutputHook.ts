import { useCallback } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type ArticleListStoreSlice,
  type ArticleListStoreClearActionInput,
  type ArticleListStoreClearActionOutput
} from '../../../../../../features';
import { useStoreClearActionDispatch } from './ArticleListStoreClearActionDispatchHook';

export function useStoreClearActionOutput (
  slice: ArticleListStoreSlice,
  input: ArticleListStoreClearActionInput
): ArticleListStoreClearActionOutput {
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
