import { useCallback } from 'react';
import {
  type TopicItemStoreSlice,
  type TopicItemStoreSetActionInput,
  type TopicItemStoreSetActionOutput,
  type TopicItemStoreSetActionPayload,
} from '../../../../../../features';
import { useStoreState } from '../../TopicItemStoreStateHook';
import { useStoreSetActionDispatch } from './TopicItemStoreSetActionDispatchHook';

export function useStoreSetActionOutput (
  slice: TopicItemStoreSlice,
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

  const dispatchOfSetAction = useStoreSetActionDispatch(slice, { callback });

  const { payloadOfSetAction } = useStoreState(slice);

  return {
    dispatchOfSetAction,
    payloadOfSetAction
  };
}
