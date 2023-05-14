import { useCallback } from 'react';
import {
  type TopicTreeStoreSliceName,
  type TopicTreeStoreSetActionInput,
  type TopicTreeStoreSetActionOutput,
  type TopicTreeStoreSetActionPayload,
} from '../../../../../../features';
import { useStoreState } from '../../TopicTreeStoreStateHook';
import { useStoreSetActionDispatch } from './TopicTreeStoreSetActionDispatchHook';

export function useStoreSetActionOutput (
  sliceName: TopicTreeStoreSliceName,
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

  const dispatchOfSetAction = useStoreSetActionDispatch(sliceName, { callback });

  const { payloadOfSetAction } = useStoreState(sliceName);

  return {
    dispatchOfSetAction,
    payloadOfSetAction
  };
}
