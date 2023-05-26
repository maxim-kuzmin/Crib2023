import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type TopicItemStoreSliceName,
  type TopicItemStoreDeleteCompletedActionDispatch,
  type TopicItemStoreDeleteCompletedActionOptions,
  type TopicItemStoreDeleteCompletedActionPayload,
  type TopicItemStoreDeleteCompletedActionResult,
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

  const run = useCallback(
    (payload: TopicItemStoreDeleteCompletedActionPayload) => {
      dispatch(createTopicItemStoreDeleteCompletedAction({ payload }));

      if (callback) {
        callback(payload.actionResult);
      }
    },
    [callback, dispatch]
  );

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate) {
        run(payloadOfDeleteCompletedAction);
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          run(payloadOfDeleteCompletedAction);
        }
      };
    },
    [dispatchType, payloadOfDeleteCompletedAction, run]
  );

  return useMemo<TopicItemStoreDeleteCompletedActionDispatch>(
    () => ({
      run: (actionResult: TopicItemStoreDeleteCompletedActionResult) => {
        const payloadOfDeleteCompletedActionInner = createTopicItemStoreDeleteCompletedActionPayload({
          ...payloadOfDeleteCompletedAction,
          actionResult
        });

        run(payloadOfDeleteCompletedActionInner);
      }
    }),
    [payloadOfDeleteCompletedAction, run]
  );
}
