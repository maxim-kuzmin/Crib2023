import { useCallback } from 'react';
import {
  type TopicItemStoreClearActionInput,
  type TopicItemStoreClearActionOutput
} from '../../../../../../app/Stores';
import { StoreDispatchType } from '../../../../../../common';
import { useClearActionDispatch } from './TopicItemStoreClearActionDispatchHook';

export function useClearActionOutput (
  sliceName: string,
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
