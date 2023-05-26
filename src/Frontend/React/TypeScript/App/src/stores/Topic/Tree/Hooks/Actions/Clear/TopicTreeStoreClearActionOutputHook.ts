import { useCallback } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type TopicTreeStoreClearActionInput,
  type TopicTreeStoreClearActionOutput,
  type TopicTreeStoreSliceName,
} from '../../../../../../features';
import { useStoreClearActionDispatch } from './TopicTreeStoreClearActionDispatchHook';

export function useStoreClearActionOutput (
  sliceName: TopicTreeStoreSliceName,
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
