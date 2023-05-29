import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type TopicTreeStoreLoadCompletedActionDispatch,
  type TopicTreeStoreLoadCompletedActionOptions,
  type TopicTreeStoreLoadCompletedActionPayload,
  type TopicTreeStoreLoadCompletedActionResult,
  type TopicTreeStoreSliceName,
  createTopicTreeStoreLoadCompletedActionPayload,
} from '../../../../../../features';
import { createTopicTreeStoreLoadCompletedAction } from '../../../Actions';
import { useTopicTreeStoreDispatch } from '../../../TopicTreeStoreHooks';

export function useStoreLoadCompletedActionDispatch (
  sliceName: TopicTreeStoreSliceName,
  {
    callback,
    dispatchType,
    resultOfLoadCompletedAction
  }: TopicTreeStoreLoadCompletedActionOptions = {}
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
