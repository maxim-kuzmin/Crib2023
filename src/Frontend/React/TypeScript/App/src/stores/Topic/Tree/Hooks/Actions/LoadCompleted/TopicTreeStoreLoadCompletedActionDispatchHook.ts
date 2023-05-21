import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type TopicTreeStoreSliceName,
  type TopicTreeStoreLoadCompletedActionDispatch,
  type TopicTreeStoreLoadCompletedActionOptions,
  type TopicTreeStoreLoadCompletedActionPayload,
} from '../../../../../../features';
import { TopicTreeStoreActionType } from '../../../TopicTreeStoreActionType';
import { useTopicTreeStoreDispatch } from '../../../TopicTreeStoreHooks';

export function useStoreLoadCompletedActionDispatch (
  sliceName: TopicTreeStoreSliceName,
  {
    callback,
    dispatchType,
    payloadOfLoadCompletedAction
  }: TopicTreeStoreLoadCompletedActionOptions = {}
): TopicTreeStoreLoadCompletedActionDispatch {
  const dispatch = useTopicTreeStoreDispatch();

  const run = useCallback(
    (payload: TopicTreeStoreLoadCompletedActionPayload) => {
      dispatch({
        payload,
        sliceName,
        type: TopicTreeStoreActionType.LoadCompleted
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

  return useMemo<TopicTreeStoreLoadCompletedActionDispatch>(() => ({ run }), [run]);
}
