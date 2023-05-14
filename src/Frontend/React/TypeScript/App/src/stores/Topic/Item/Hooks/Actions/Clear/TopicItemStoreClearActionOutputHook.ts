import { useCallback } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type TopicItemStoreSlice,
  type TopicItemStoreClearActionInput,
  type TopicItemStoreClearActionOutput
} from '../../../../../../features';
import { useStoreClearActionDispatch } from './TopicItemStoreClearActionDispatchHook';

export function useStoreClearActionOutput (
  slice: TopicItemStoreSlice,
  input: TopicItemStoreClearActionInput
): TopicItemStoreClearActionOutput {
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
