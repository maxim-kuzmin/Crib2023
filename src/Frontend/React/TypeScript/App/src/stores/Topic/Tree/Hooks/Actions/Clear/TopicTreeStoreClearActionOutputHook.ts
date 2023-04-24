import { useCallback } from 'react';
import {
  type TopicTreeStoreClearActionInput,
  type TopicTreeStoreClearActionOutput
} from '../../../../../../app';
import { StoreDispatchType } from '../../../../../../common';
import { useStoreClearActionDispatch } from './TopicTreeStoreClearActionDispatchHook';

export function useStoreClearActionOutput (
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
