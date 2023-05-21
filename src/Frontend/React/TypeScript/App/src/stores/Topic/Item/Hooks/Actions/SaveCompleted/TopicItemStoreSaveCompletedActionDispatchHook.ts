import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type TopicItemStoreSliceName,
  type TopicItemStoreSaveCompletedActionDispatch,
  type TopicItemStoreSaveCompletedActionOptions,
  type TopicItemStoreSaveCompletedActionPayload,
} from '../../../../../../features';
import { TopicItemStoreActionType } from '../../../TopicItemStoreActionType';
import { useTopicItemStoreDispatch } from '../../../TopicItemStoreHooks';

export function useStoreSaveCompletedActionDispatch (
  sliceName: TopicItemStoreSliceName,
  {
    callback,
    dispatchType,
    payloadOfSaveCompletedAction
  }: TopicItemStoreSaveCompletedActionOptions = {}
): TopicItemStoreSaveCompletedActionDispatch {
  const dispatch = useTopicItemStoreDispatch();

  const run = useCallback(
    (payload: TopicItemStoreSaveCompletedActionPayload) => {
      dispatch({
        payload,
        sliceName,
        type: TopicItemStoreActionType.SaveCompleted
      });

      if (callback) {
        callback(payload);
      }
    },
    [callback, dispatch, sliceName]
  );

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfSaveCompletedAction) {
        run(payloadOfSaveCompletedAction);
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfSaveCompletedAction) {
          run(payloadOfSaveCompletedAction);
        }
      };
    },
    [dispatchType, payloadOfSaveCompletedAction, run]
  );

  return useMemo<TopicItemStoreSaveCompletedActionDispatch>(() => ({ run }), [run]);
}
