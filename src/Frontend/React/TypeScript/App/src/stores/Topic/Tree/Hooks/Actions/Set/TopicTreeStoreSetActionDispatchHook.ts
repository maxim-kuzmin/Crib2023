import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type TopicTreeStoreSliceName,
  type TopicTreeStoreSetActionDispatch,
  type TopicTreeStoreSetActionOptions,
  type TopicTreeStoreSetActionPayload,
  type TopicTreeStoreSetActionResult,
  createTopicTreeStoreSetActionPayload,
} from '../../../../../../features';
import { createTopicTreeStoreSetAction } from '../../../Actions';
import { useTopicTreeStoreDispatch } from '../../../TopicTreeStoreHooks';

export function useStoreSetActionDispatch (
  sliceName: TopicTreeStoreSliceName,
  {
    callback,
    dispatchType,
    resultOfSetAction
  }: TopicTreeStoreSetActionOptions = {}
): TopicTreeStoreSetActionDispatch {
  const dispatch = useTopicTreeStoreDispatch();

  const payloadOfSetAction = useMemo(
    () => createTopicTreeStoreSetActionPayload({ actionResult: resultOfSetAction, sliceName }),
    [resultOfSetAction, sliceName]
  );

  const run = useCallback(
    (payload: TopicTreeStoreSetActionPayload) => {
      dispatch(createTopicTreeStoreSetAction({ payload }));

      if (callback) {
        callback(payload.actionResult);
      }
    },
    [callback, dispatch]
  );

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate) {
        run(payloadOfSetAction);
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          run(payloadOfSetAction);
        }
      };
    },
    [dispatchType, payloadOfSetAction, run]
  );

  return useMemo<TopicTreeStoreSetActionDispatch>(
    () => ({
      run: (actionResult: TopicTreeStoreSetActionResult) => {
        const payloadOfSetActionInner = createTopicTreeStoreSetActionPayload({
          ...payloadOfSetAction,
          actionResult
        });

        run(payloadOfSetActionInner);
      }
    }),
    [payloadOfSetAction, run]
  );
}
