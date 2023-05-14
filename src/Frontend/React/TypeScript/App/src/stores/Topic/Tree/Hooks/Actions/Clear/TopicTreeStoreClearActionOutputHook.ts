import { useCallback } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type TopicTreeStoreOwner,
  type TopicTreeStoreClearActionInput,
  type TopicTreeStoreClearActionOutput
} from '../../../../../../features';
import { useStoreClearActionDispatch } from './TopicTreeStoreClearActionDispatchHook';

export function useStoreClearActionOutput (
  owner: TopicTreeStoreOwner,
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
    owner,
    {
      callback,
      dispatchType: StoreDispatchType.Unmount
    }
  );

  return {
    dispatchOfClearAction
  };
}
