import { useCallback, useEffect, useMemo } from 'react';
import { type StoreActionOptions, StoreDispatchType } from '../../../../../../common';
import {
  type TopicTreeStoreClearActionCallback,
  type TopicTreeStoreClearActionDispatch,
  type TopicTreeStoreSliceName,
  createTopicTreeStoreClearActionPayload,
} from '../../../../../../features';
import { createTopicTreeStoreClearAction } from '../../../Actions';
import { useTopicTreeStoreDispatch } from '../../../TopicTreeStoreHooks';

interface Options extends StoreActionOptions {
  readonly callback?: TopicTreeStoreClearActionCallback;
}

export function useStoreClearActionDispatch (
  sliceName: TopicTreeStoreSliceName,
  {
    callback,
    dispatchType
  }: Options = {}
): TopicTreeStoreClearActionDispatch {
  const dispatch = useTopicTreeStoreDispatch();

  const payloadOfClearAction = useMemo(
    () => createTopicTreeStoreClearActionPayload({ sliceName }),
    [sliceName]
  );

  const runInner = useCallback(
    () => {
      dispatch(createTopicTreeStoreClearAction(payloadOfClearAction));

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

  return useMemo<TopicTreeStoreClearActionDispatch>(
    () => ({ run: runInner }),
    [runInner]
  );
}
