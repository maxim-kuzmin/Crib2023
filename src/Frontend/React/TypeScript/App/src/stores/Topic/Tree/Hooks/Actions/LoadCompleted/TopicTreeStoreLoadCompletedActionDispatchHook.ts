import { useCallback, useEffect, useMemo } from 'react';
import { type StoreActionOptions, StoreDispatchType } from '../../../../../../common';
import {
  type TopicTreeStoreLoadCompletedActionCallback,
  type TopicTreeStoreLoadCompletedActionDispatch,
  type TopicTreeStoreLoadCompletedActionPayload,
  type TopicTreeStoreLoadCompletedActionResult,
  type TopicTreeStoreSliceName,
  createTopicTreeStoreLoadCompletedActionPayload,
} from '../../../../../../features';
import { createTopicTreeStoreLoadCompletedAction } from '../../../Actions';
import { useTopicTreeStoreDispatch } from '../../../TopicTreeStoreHooks';

interface Options extends StoreActionOptions {
  readonly callback?: TopicTreeStoreLoadCompletedActionCallback;
  readonly resultOfLoadCompletedAction?: TopicTreeStoreLoadCompletedActionResult;
}

export function useStoreLoadCompletedActionDispatch (
  sliceName: TopicTreeStoreSliceName,
  {
    callback,
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

      const { actionResult } = payload;

      if (callback && !actionResult?.error) {
        callback(actionResult);
      }
    },
    [callback, dispatch]
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
