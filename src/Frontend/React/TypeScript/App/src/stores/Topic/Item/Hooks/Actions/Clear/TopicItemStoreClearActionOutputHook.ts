import { useCallback } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type TopicItemStoreClearActionInput,
  type TopicItemStoreClearActionOutput
} from '../../../../../../features';
import { useStoreClearActionDispatch } from './TopicItemStoreClearActionDispatchHook';

export function useStoreClearActionOutput (
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
