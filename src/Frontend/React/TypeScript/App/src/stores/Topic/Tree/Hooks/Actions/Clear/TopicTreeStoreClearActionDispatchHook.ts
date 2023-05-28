import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type TopicTreeStoreClearActionDispatch,
  type TopicTreeStoreClearActionOptions,
  type TopicTreeStoreSliceName,
  createTopicTreeStoreClearActionPayload,
} from '../../../../../../features';
import { createTopicTreeStoreClearAction } from '../../../Actions';
import { useTopicTreeStoreDispatch } from '../../../TopicTreeStoreHooks';

export function useStoreClearActionDispatch (
  sliceName: TopicTreeStoreSliceName,
  {
    callback,
    dispatchType
  }: TopicTreeStoreClearActionOptions = {}
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
