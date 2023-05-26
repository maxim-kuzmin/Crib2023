import { useCallback } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type ArticleListStoreClearActionInput,
  type ArticleListStoreClearActionOutput,
  type ArticleListStoreSliceName,
} from '../../../../../../features';
import { useStoreClearActionDispatch } from './ArticleListStoreClearActionDispatchHook';

export function useStoreClearActionOutput (
  sliceName: ArticleListStoreSliceName,
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
