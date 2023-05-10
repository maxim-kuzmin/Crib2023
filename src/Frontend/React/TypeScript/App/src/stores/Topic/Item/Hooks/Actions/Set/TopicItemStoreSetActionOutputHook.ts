import { useCallback } from 'react';
import {
  type TopicItemStoreSetActionInput,
  type TopicItemStoreSetActionOutput,
  type TopicItemStoreSetActionPayload,
} from '../../../../../../features';
import { useStoreState } from '../../TopicItemStoreStateHook';
import { useStoreSetActionDispatch } from './TopicItemStoreSetActionDispatchHook';

export function useStoreSetActionOutput (
  owner: string,
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

  const dispatchOfSetAction = useStoreSetActionDispatch(owner, { callback });

  const { payloadOfSetAction } = useStoreState(owner);

  return {
    dispatchOfSetAction,
    payloadOfSetAction
  };
}
