import { useCallback, useEffect, useMemo } from 'react';
import { type StoreActionOptions, StoreDispatchType } from '../../../../../../common';
import {
  type TopicItemStoreClearActionDispatch,
  type TopicItemStoreSliceName,
  createTopicItemStoreClearActionPayload,
} from '../../../../../../features';
import { createTopicItemStoreClearAction } from '../../../Actions';
import { useTopicItemStoreDispatch } from '../../../TopicItemStoreHooks';

export function useStoreClearActionDispatch (
  sliceName: TopicItemStoreSliceName,
  {
    dispatchType
  }: StoreActionOptions = {}
): TopicItemStoreClearActionDispatch {
  const dispatch = useTopicItemStoreDispatch();

  const payloadOfClearAction = useMemo(
    () => createTopicItemStoreClearActionPayload({ sliceName }),
    [sliceName]
  );

  const runInner = useCallback(
    () => {
      dispatch(createTopicItemStoreClearAction(payloadOfClearAction));
    },
    [dispatch, payloadOfClearAction]
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
