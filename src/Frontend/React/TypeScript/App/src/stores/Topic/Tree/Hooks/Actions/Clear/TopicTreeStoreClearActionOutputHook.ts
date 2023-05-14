import { useCallback } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type TopicTreeStoreSlice,
  type TopicTreeStoreClearActionInput,
  type TopicTreeStoreClearActionOutput
} from '../../../../../../features';
import { useStoreClearActionDispatch } from './TopicTreeStoreClearActionDispatchHook';

export function useStoreClearActionOutput (
  slice: TopicTreeStoreSlice,
  input: TopicTreeStoreClearActionInput
): TopicTreeStoreClearActionOutput {
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
