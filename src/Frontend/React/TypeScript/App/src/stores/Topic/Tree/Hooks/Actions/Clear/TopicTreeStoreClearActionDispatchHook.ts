import { useCallback, useEffect, useMemo } from 'react';
import { type StoreActionOptions, StoreDispatchType } from '../../../../../../common';
import {
  type TopicTreeStoreClearActionDispatch,
  type TopicTreeStoreSliceName,
  createTopicTreeStoreClearActionPayload,
} from '../../../../../../features';
import { createTopicTreeStoreClearAction } from '../../../Actions';
import { useTopicTreeStoreDispatch } from '../../../TopicTreeStoreHooks';

export function useStoreClearActionDispatch (
  sliceName: TopicTreeStoreSliceName,
  {
    dispatchType
  }: StoreActionOptions = {}
): TopicTreeStoreClearActionDispatch {
  const dispatch = useTopicTreeStoreDispatch();

  const payloadOfClearAction = useMemo(
    () => createTopicTreeStoreClearActionPayload({ sliceName }),
    [sliceName]
  );

  const runInner = useCallback(
    () => {
      dispatch(createTopicTreeStoreClearAction(payloadOfClearAction));
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

  return useMemo<TopicTreeStoreClearActionDispatch>(
    () => ({ run: runInner }),
    [runInner]
  );
}
