import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type TopicItemStoreSliceName,
  type TopicItemStoreDeleteCompletedActionDispatch,
  type TopicItemStoreDeleteCompletedActionOptions,
  type TopicItemStoreDeleteCompletedActionPayload,
} from '../../../../../../features';
import { TopicItemStoreActionType } from '../../../TopicItemStoreActionType';
import { useTopicItemStoreDispatch } from '../../../TopicItemStoreHooks';

export function useStoreDeleteCompletedActionDispatch (
  sliceName: TopicItemStoreSliceName,
  {
    callback,
    dispatchType,
    payloadOfDeleteCompletedAction
  }: TopicItemStoreDeleteCompletedActionOptions = {}
): TopicItemStoreDeleteCompletedActionDispatch {
  const dispatch = useTopicItemStoreDispatch();

  const run = useCallback(
    (payload: TopicItemStoreDeleteCompletedActionPayload) => {
      dispatch({
        payload,
        sliceName,
        type: TopicItemStoreActionType.DeleteCompleted
      });

      if (callback) {
        callback(payload);
      }
    },
    [callback, dispatch, sliceName]
  );

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfDeleteCompletedAction) {
        run(payloadOfDeleteCompletedAction);
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfDeleteCompletedAction) {
          run(payloadOfDeleteCompletedAction);
        }
      };
    },
    [dispatchType, payloadOfDeleteCompletedAction, run]
  );

  return useMemo<TopicItemStoreDeleteCompletedActionDispatch>(() => ({ run }), [run]);
}
