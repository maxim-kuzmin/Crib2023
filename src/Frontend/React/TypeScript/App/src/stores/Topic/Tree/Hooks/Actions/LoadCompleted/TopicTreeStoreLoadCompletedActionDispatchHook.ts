import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type TopicTreeStoreLoadCompletedActionDispatch,
  type TopicTreeStoreLoadCompletedActionOptions,
  type TopicTreeStoreLoadCompletedActionPayload,
  type TopicTreeStoreLoadCompletedActionResult,
  type TopicTreeStoreSliceName,
  createTopicTreeStoreLoadCompletedActionPayload,
} from '../../../../../../features';
import { createTopicTreeStoreLoadCompletedAction } from '../../../Actions';
import { useTopicTreeStoreDispatch } from '../../../TopicTreeStoreHooks';

export function useStoreLoadCompletedActionDispatch (
  sliceName: TopicTreeStoreSliceName,
  {
    callback,
    dispatchType,
    resultOfLoadCompletedAction
  }: TopicTreeStoreLoadCompletedActionOptions = {}
): TopicTreeStoreLoadCompletedActionDispatch {
  const dispatch = useTopicTreeStoreDispatch();

  const payloadOfLoadCompletedAction = useMemo(
    () => createTopicTreeStoreLoadCompletedActionPayload({
      actionResult: resultOfLoadCompletedAction,
      sliceName,
    }),
    [resultOfLoadCompletedAction, sliceName]
  );

  const run = useCallback(
    (payload: TopicTreeStoreLoadCompletedActionPayload) => {
      dispatch(createTopicTreeStoreLoadCompletedAction(payload));

      if (callback) {
        callback(payload.actionResult);
      }
    },
    [callback, dispatch]
  );

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate) {
        run(payloadOfLoadCompletedAction);
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          run(payloadOfLoadCompletedAction);
        }
      };
    },
    [dispatchType, payloadOfLoadCompletedAction, run]
  );

  return useMemo<TopicTreeStoreLoadCompletedActionDispatch>(
    () => ({
      run: (actionResult: TopicTreeStoreLoadCompletedActionResult) => {
        const payloadOfLoadCompletedActionInner = createTopicTreeStoreLoadCompletedActionPayload({
          ...payloadOfLoadCompletedAction,
          actionResult
        });

        run(payloadOfLoadCompletedActionInner);
      }
    }),
    [payloadOfLoadCompletedAction, run]
  );
}
