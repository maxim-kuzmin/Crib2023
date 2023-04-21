import { useCallback } from 'react';
import {
  type TopicItemStoreSetActionInput,
  type TopicItemStoreSetActionOutput,
  type TopicItemStoreSetActionPayload,
} from '../../../../../../app/Stores';
import { useStoreState } from '../../TopicItemStoreStateHook';
import { useSetActionDispatch } from './TopicItemStoreSetActionDispatchHook';

export function useSetActionOutput (
  sliceName: string,
  input: TopicItemStoreSetActionInput
): TopicItemStoreSetActionOutput {
  const { onActionCompleted } = input;

  const callback = useCallback(
    (payload: TopicItemStoreSetActionPayload) => {
      if (onActionCompleted) {
        onActionCompleted(payload);
      }
    },
    [onActionCompleted]
  );

  const dispatchOfSetAction = useSetActionDispatch(sliceName, { callback });

  const { payloadOfSetAction } = useStoreState(sliceName);

  return {
    dispatchOfSetAction,
    payloadOfSetAction
  };
}
