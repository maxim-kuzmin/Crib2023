import { useCallback } from 'react';
import {
  type TopicTreeStoreSlice,
  type TopicTreeStoreSetActionInput,
  type TopicTreeStoreSetActionOutput,
  type TopicTreeStoreSetActionPayload,
} from '../../../../../../features';
import { useStoreState } from '../../TopicTreeStoreStateHook';
import { useStoreSetActionDispatch } from './TopicTreeStoreSetActionDispatchHook';

export function useStoreSetActionOutput (
  slice: TopicTreeStoreSlice,
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

  const dispatchOfSetAction = useStoreSetActionDispatch(slice, { callback });

  const { payloadOfSetAction } = useStoreState(slice);

  return {
    dispatchOfSetAction,
    payloadOfSetAction
  };
}
