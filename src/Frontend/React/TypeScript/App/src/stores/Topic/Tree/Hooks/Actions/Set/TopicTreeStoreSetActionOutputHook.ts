import { useCallback } from 'react';
import {
  type TopicTreeStoreSetActionResult,
  type TopicTreeStoreSetActionInput,
  type TopicTreeStoreSetActionOutput,
  type TopicTreeStoreSliceName,
} from '../../../../../../features';
import { useStoreState } from '../../TopicTreeStoreStateHook';
import { useStoreSetActionDispatch } from './TopicTreeStoreSetActionDispatchHook';

export function useStoreSetActionOutput (
  sliceName: TopicTreeStoreSliceName,
  input: TopicTreeStoreSetActionInput
): TopicTreeStoreSetActionOutput {
  const { onActionCompleted } = input;

  const callback = useCallback(
    (data: TopicTreeStoreSetActionResult) => {
      if (onActionCompleted) {
        onActionCompleted(data);
      }
    },
    [onActionCompleted]
  );

  const dispatchOfSetAction = useStoreSetActionDispatch(sliceName, { callback });

  const { resultOfSetAction } = useStoreState(sliceName);

  return {
    dispatchOfSetAction,
    resultOfSetAction,
  };
}
