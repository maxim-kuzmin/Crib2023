import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type TopicItemStoreSliceName,
  type TopicItemStoreClearActionDispatch,
  type TopicItemStoreClearActionOptions,
} from '../../../../../../features';
import { TopicItemStoreActionType } from '../../../TopicItemStoreActionType';
import { useTopicItemStoreDispatch } from '../../../TopicItemStoreHooks';

export function useStoreClearActionDispatch (
  sliceName: TopicItemStoreSliceName,
  {
    callback,
    dispatchType
  }: TopicItemStoreClearActionOptions = {}
): TopicItemStoreClearActionDispatch {
  const dispatch = useTopicItemStoreDispatch();

  const run = useCallback(
    () => {
      dispatch({ sliceName, type: TopicItemStoreActionType.Clear });

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

  return useMemo<TopicItemStoreClearActionDispatch>(() => ({ run }), [run]);
}
