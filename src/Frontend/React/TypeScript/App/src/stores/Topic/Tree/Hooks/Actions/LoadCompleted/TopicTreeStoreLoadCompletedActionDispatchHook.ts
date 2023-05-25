import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type TopicTreeStoreSliceName,
  type TopicTreeStoreLoadCompletedActionDispatch,
  type TopicTreeStoreLoadCompletedActionOptions,
  type TopicTreeStoreLoadCompletedActionPayload,
  type TopicTreeStoreLoadCompletedActionResult,
  createTopicTreeStoreLoadCompletedActionPayload,
} from '../../../../../../features';
import { TopicTreeStoreActionType } from '../../../TopicTreeStoreActionType';
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
    }),
    [resultOfLoadCompletedAction]
  );

  const run = useCallback(
    (payload: TopicTreeStoreLoadCompletedActionPayload) => {
      dispatch({
        payload,
        sliceName,
        type: TopicTreeStoreActionType.LoadCompleted
      });

      if (callback) {
        callback(payload.actionResult);
      }
    },
    [callback, dispatch, sliceName]
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
