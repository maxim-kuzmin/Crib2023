import { useCallback } from 'react';
import {
  type TopicTreeStoreClearActionInput,
  type TopicTreeStoreClearActionOutput
} from '../../../../../../app/Stores';
import { StoreDispatchType } from '../../../../../../common';
import { useClearActionDispatch } from './TopicTreeStoreClearActionDispatchHook';

export function useClearActionOutput (
  sliceName: string,
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

  const dispatchOfClearAction = useClearActionDispatch(
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
