import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type TopicTreeStoreSliceName,
  type TopicTreeStoreClearActionDispatch,
  type TopicTreeStoreClearActionOptions,
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

  const run = useCallback(
    () => {
      dispatch(createTopicTreeStoreClearAction({ payload: payloadOfClearAction }));

      if (callback) {
        callback();
      }
    },
    [callback, dispatch, payloadOfClearAction]
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
