import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type TopicItemStoreDeleteCompletedActionDispatch,
  type TopicItemStoreDeleteCompletedActionOptions,
  type TopicItemStoreDeleteCompletedActionPayload,
  type TopicItemStoreDeleteCompletedActionResult,
  type TopicItemStoreSliceName,
  createTopicItemStoreDeleteCompletedActionPayload,
} from '../../../../../../features';
import { createTopicItemStoreDeleteCompletedAction } from '../../../Actions';
import { useTopicItemStoreDispatch } from '../../../TopicItemStoreHooks';

export function useStoreDeleteCompletedActionDispatch (
  sliceName: TopicItemStoreSliceName,
  {
    callback,
    dispatchType,
    resultOfDeleteCompletedAction
  }: TopicItemStoreDeleteCompletedActionOptions = {}
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

      if (callback) {
        callback(payload.actionResult);
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
