import { useCallback, useEffect, useMemo } from 'react';
import { type StoreActionOptions, StoreDispatchType } from '../../../../../../common';
import {
  type TopicItemStoreDeleteCompletedActionCallback,
  type TopicItemStoreDeleteCompletedActionDispatch,
  type TopicItemStoreDeleteCompletedActionPayload,
  type TopicItemStoreDeleteCompletedActionResult,
  type TopicItemStoreSliceName,
  createTopicItemStoreDeleteCompletedActionPayload,
} from '../../../../../../features';
import { createTopicItemStoreDeleteCompletedAction } from '../../../Actions';
import { useTopicItemStoreDispatch } from '../../../TopicItemStoreHooks';

interface Options extends StoreActionOptions {
  readonly callback?: TopicItemStoreDeleteCompletedActionCallback;
  readonly resultOfDeleteCompletedAction?: TopicItemStoreDeleteCompletedActionResult;
}

export function useStoreDeleteCompletedActionDispatch (
  sliceName: TopicItemStoreSliceName,
  {
    callback,
    dispatchType,
    resultOfDeleteCompletedAction
  }: Options = {}
): TopicItemStoreDeleteCompletedActionDispatch {
  const dispatch = useTopicItemStoreDispatch();

  const payloadOfDeleteCompletedAction = useMemo(
    () => createTopicItemStoreDeleteCompletedActionPayload({
      actionResult: resultOfDeleteCompletedAction,
      sliceName,
    }),
    [resultOfDeleteCompletedAction, sliceName]
  );

  const runInner = useCallback(
    (payload: TopicItemStoreDeleteCompletedActionPayload) => {
      dispatch(createTopicItemStoreDeleteCompletedAction(payload));

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
        runInner(payloadOfDeleteCompletedAction);
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          runInner(payloadOfDeleteCompletedAction);
        }
      };
    },
    [dispatchType, payloadOfDeleteCompletedAction, runInner]
  );

  return useMemo<TopicItemStoreDeleteCompletedActionDispatch>(
    () => ({
      run: (actionResult: TopicItemStoreDeleteCompletedActionResult) => {
        const payloadOfDeleteCompletedActionInner = createTopicItemStoreDeleteCompletedActionPayload({
          ...payloadOfDeleteCompletedAction,
          actionResult
        });

        runInner(payloadOfDeleteCompletedActionInner);
      }
    }),
    [payloadOfDeleteCompletedAction, runInner]
  );
}
