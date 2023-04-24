import { useCallback } from 'react';
import {
  type ArticleListStoreClearActionInput,
  type ArticleListStoreClearActionOutput
} from '../../../../../../app/Stores';
import { StoreDispatchType } from '../../../../../../common';
import { useStoreClearActionDispatch } from './ArticleListStoreClearActionDispatchHook';

export function useStoreClearActionOutput (
  sliceName: string,
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
