import { useCallback, useEffect, useMemo } from 'react';
import { type StoreActionOptions, StoreDispatchType } from '../../../../../../common';
import {
  type TopicItemStoreClearActionDispatch,
  type TopicItemStoreSliceName,
  createTopicItemStoreClearActionPayload,
  type TopicItemStoreClearActionCallback,
} from '../../../../../../features';
import { createTopicItemStoreClearAction } from '../../../Actions';
import { useTopicItemStoreDispatch } from '../../../TopicItemStoreHooks';

interface Options extends StoreActionOptions {
  readonly callback?: TopicItemStoreClearActionCallback;
}

export function useStoreClearActionDispatch (
  sliceName: TopicItemStoreSliceName,
  {
    callback,
    dispatchType
  }: Options = {}
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
