import { useCallback } from 'react';
import {
  type TopicTreeStoreSetActionInput,
  type TopicTreeStoreSetActionOutput,
  type TopicTreeStoreSetActionPayload,
} from '../../../../../../app/Stores';
import { useStoreState } from '../../TopicTreeStoreStateHook';
import { useSetActionDispatch } from './TopicTreeStoreSetActionDispatchHook';

export function useSetActionOutput (
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

  const dispatchOfSetAction = useSetActionDispatch(sliceName, { callback });

  const { payloadOfSetAction } = useStoreState(sliceName);

  return {
    dispatchOfSetAction,
    payloadOfSetAction
  };
}
