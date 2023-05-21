import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type TopicTreeStoreSliceName,
  type TopicTreeStoreClearActionDispatch,
  type TopicTreeStoreClearActionOptions,
} from '../../../../../../features';
import { TopicTreeStoreActionType } from '../../../TopicTreeStoreActionType';
import { useTopicTreeStoreDispatch } from '../../../TopicTreeStoreHooks';

export function useStoreClearActionDispatch (
  sliceName: TopicTreeStoreSliceName,
  {
    callback,
    dispatchType
  }: TopicTreeStoreClearActionOptions = {}
): TopicTreeStoreClearActionDispatch {
  const dispatch = useTopicTreeStoreDispatch();

  const run = useCallback(
    () => {
      dispatch({ sliceName, type: TopicTreeStoreActionType.Clear });

      if (callback) {
        callback();
      }
    },
    [callback, dispatch, sliceName]
  );

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate) {
        run();
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          run();
        }
      };
    },
    [dispatchType, run]
  );

  return useMemo<TopicTreeStoreClearActionDispatch>(() => ({ run }), [run]);
}
