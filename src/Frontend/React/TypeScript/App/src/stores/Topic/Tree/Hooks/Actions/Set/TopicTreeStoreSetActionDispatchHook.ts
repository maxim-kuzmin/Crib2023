import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type TopicTreeStoreSliceName,
  type TopicTreeStoreSetActionDispatch,
  type TopicTreeStoreSetActionOptions,
  type TopicTreeStoreSetActionPayload,
} from '../../../../../../features';
import { TopicTreeStoreActionType } from '../../../TopicTreeStoreActionType';
import { useTopicTreeStoreDispatch } from '../../../TopicTreeStoreHooks';

export function useStoreSetActionDispatch (
  sliceName: TopicTreeStoreSliceName,
  {
    callback,
    dispatchType,
    payloadOfSetAction
  }: TopicTreeStoreSetActionOptions = {}
): TopicTreeStoreSetActionDispatch {
  const dispatch = useTopicTreeStoreDispatch();

  const run = useCallback(
    (payload: TopicTreeStoreSetActionPayload) => {
      dispatch({ payload, sliceName, type: TopicTreeStoreActionType.Set });

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

  return useMemo<TopicTreeStoreSetActionDispatch>(() => ({ run }), [run]);
}
