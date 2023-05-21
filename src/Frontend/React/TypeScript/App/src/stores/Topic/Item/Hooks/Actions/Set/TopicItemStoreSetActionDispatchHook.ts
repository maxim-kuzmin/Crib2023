import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type TopicItemStoreSliceName,
  type TopicItemStoreSetActionDispatch,
  type TopicItemStoreSetActionOptions,
  type TopicItemStoreSetActionPayload,
} from '../../../../../../features';
import { TopicItemStoreActionType } from '../../../TopicItemStoreActionType';
import { useTopicItemStoreDispatch } from '../../../TopicItemStoreHooks';

export function useStoreSetActionDispatch (
  sliceName: TopicItemStoreSliceName,
  {
    callback,
    dispatchType,
    payloadOfSetAction
  }: TopicItemStoreSetActionOptions = {}
): TopicItemStoreSetActionDispatch {
  const dispatch = useTopicItemStoreDispatch();

  const run = useCallback(
    (payload: TopicItemStoreSetActionPayload) => {
      dispatch({ payload, sliceName, type: TopicItemStoreActionType.Set });

      if (callback) {
        callback(payload);
      }
    },
    [callback, dispatch, sliceName]
  );

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfSetAction) {
        run(payloadOfSetAction);
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfSetAction) {
          run(payloadOfSetAction);
        }
      };
    },
    [dispatchType, payloadOfSetAction, run]
  );

  return useMemo<TopicItemStoreSetActionDispatch>(() => ({ run }), [run]);
}
