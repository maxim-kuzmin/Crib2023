import { useCallback } from 'react';
import {
  type TopicItemStoreSetActionInput,
  type TopicItemStoreSetActionOutput,
  type TopicItemStoreSetActionPayload,
} from '../../../../../../features';
import { useStoreState } from '../../TopicItemStoreStateHook';
import { useStoreSetActionDispatch } from './TopicItemStoreSetActionDispatchHook';

export function useStoreSetActionOutput (
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

  const dispatchOfSetAction = useStoreSetActionDispatch(sliceName, { callback });

  const { payloadOfSetAction } = useStoreState(sliceName);

  return {
    dispatchOfSetAction,
    payloadOfSetAction
  };
}
