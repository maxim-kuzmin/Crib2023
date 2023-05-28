import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type TopicItemStoreClearActionDispatch,
  type TopicItemStoreClearActionOptions,
  type TopicItemStoreSliceName,
  createTopicItemStoreClearActionPayload,
} from '../../../../../../features';
import { createTopicItemStoreClearAction } from '../../../Actions';
import { useTopicItemStoreDispatch } from '../../../TopicItemStoreHooks';

export function useStoreClearActionDispatch (
  sliceName: TopicItemStoreSliceName,
  {
    callback,
    dispatchType
  }: TopicItemStoreClearActionOptions = {}
): TopicItemStoreClearActionDispatch {
  const dispatch = useTopicItemStoreDispatch();

  const payloadOfClearAction = useMemo(
    () => createTopicItemStoreClearActionPayload({ sliceName }),
    [sliceName]
  );

  const runInner = useCallback(
    () => {
      dispatch(createTopicItemStoreClearAction(payloadOfClearAction));

      if (callback) {
        callback();
      }
    },
    [callback, dispatch, payloadOfClearAction]
  );

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate) {
        runInner();
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          runInner();
        }
      };
    },
    [dispatchType, runInner]
  );

  return useMemo<TopicItemStoreClearActionDispatch>(
    () => ({ run: runInner }),
    [runInner]
  );
}
