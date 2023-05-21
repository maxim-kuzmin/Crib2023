import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type TopicItemStoreSliceName,
  type TopicItemStoreLoadCompletedActionDispatch,
  type TopicItemStoreLoadCompletedActionOptions,
  type TopicItemStoreLoadCompletedActionPayload,
} from '../../../../../../features';
import { TopicItemStoreActionType } from '../../../TopicItemStoreActionType';
import { useTopicItemStoreDispatch } from '../../../TopicItemStoreHooks';

export function useStoreLoadCompletedActionDispatch (
  sliceName: TopicItemStoreSliceName,
  {
    callback,
    dispatchType,
    payloadOfLoadCompletedAction
  }: TopicItemStoreLoadCompletedActionOptions = {}
): TopicItemStoreLoadCompletedActionDispatch {
  const dispatch = useTopicItemStoreDispatch();

  const run = useCallback(
    (payload: TopicItemStoreLoadCompletedActionPayload) => {
      dispatch({
        payload,
        sliceName,
        type: TopicItemStoreActionType.LoadCompleted
      });

      if (callback) {
        callback(payload);
      }
    },
    [callback, dispatch, sliceName]
  );

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfLoadCompletedAction) {
        run(payloadOfLoadCompletedAction);
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfLoadCompletedAction) {
          run(payloadOfLoadCompletedAction);
        }
      };
    },
    [dispatchType, payloadOfLoadCompletedAction, run]
  );

  return useMemo<TopicItemStoreLoadCompletedActionDispatch>(() => ({ run }), [run]);
}
