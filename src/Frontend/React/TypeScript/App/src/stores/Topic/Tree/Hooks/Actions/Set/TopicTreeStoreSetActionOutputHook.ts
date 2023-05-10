import { useCallback } from 'react';
import {
  type TopicTreeStoreSetActionInput,
  type TopicTreeStoreSetActionOutput,
  type TopicTreeStoreSetActionPayload,
} from '../../../../../../features';
import { useStoreState } from '../../TopicTreeStoreStateHook';
import { useStoreSetActionDispatch } from './TopicTreeStoreSetActionDispatchHook';

export function useStoreSetActionOutput (
  owner: string,
  input: TopicTreeStoreSetActionInput
): TopicTreeStoreSetActionOutput {
  const { onActionCompleted } = input;

  const callback = useCallback(
    (payload: TopicTreeStoreSetActionPayload) => {
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
