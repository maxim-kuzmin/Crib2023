import { useCallback } from 'react';
import {
  type TopicTreeStoreSetActionInput,
  type TopicTreeStoreSetActionOutput,
  type TopicTreeStoreSetActionPayload,
} from '../../../../../../app';
import { useStoreState } from '../../TopicTreeStoreStateHook';
import { useStoreSetActionDispatch } from './TopicTreeStoreSetActionDispatchHook';

export function useStoreSetActionOutput (
  sliceName: string,
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
