import { useCallback, useEffect, useMemo } from 'react';
import { type StoreActionOptions, StoreDispatchType } from '../../../../../../common';
import {
  type TopicTreeStoreLoadCompletedActionDispatch,
  type TopicTreeStoreLoadCompletedActionPayload,
  type TopicTreeStoreLoadCompletedActionResult,
  type TopicTreeStoreSliceName,
  createTopicTreeStoreLoadCompletedActionPayload,
} from '../../../../../../features';
import { createTopicTreeStoreLoadCompletedAction } from '../../../Actions';
import { useTopicTreeStoreDispatch } from '../../../TopicTreeStoreHooks';

interface Options extends StoreActionOptions {
  readonly resultOfLoadCompletedAction?: TopicTreeStoreLoadCompletedActionResult;
}

export function useStoreLoadCompletedActionDispatch (
  sliceName: TopicTreeStoreSliceName,
  {
    dispatchType,
    resultOfLoadCompletedAction
  }: Options = {}
): TopicTreeStoreLoadCompletedActionDispatch {
  const dispatch = useTopicTreeStoreDispatch();

  const payloadOfLoadCompletedAction = useMemo(
    () => createTopicTreeStoreLoadCompletedActionPayload({
      actionResult: resultOfLoadCompletedAction,
      sliceName,
    }),
    [resultOfLoadCompletedAction, sliceName]
  );

  const runInner = useCallback(
    (payload: TopicTreeStoreLoadCompletedActionPayload) => {
      dispatch(createTopicTreeStoreLoadCompletedAction(payload));
    },
    [dispatch]
  );

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate) {
        runInner(payloadOfLoadCompletedAction);
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          runInner(payloadOfLoadCompletedAction);
        }
      };
    },
    [dispatchType, payloadOfLoadCompletedAction, runInner]
  );

  return useMemo<TopicTreeStoreLoadCompletedActionDispatch>(
    () => ({
      run: (actionResult: TopicTreeStoreLoadCompletedActionResult) => {
        const payloadOfLoadCompletedActionInner = createTopicTreeStoreLoadCompletedActionPayload({
          ...payloadOfLoadCompletedAction,
          actionResult
        });

        runInner(payloadOfLoadCompletedActionInner);
      }
    }),
    [payloadOfLoadCompletedAction, runInner]
  );
}
