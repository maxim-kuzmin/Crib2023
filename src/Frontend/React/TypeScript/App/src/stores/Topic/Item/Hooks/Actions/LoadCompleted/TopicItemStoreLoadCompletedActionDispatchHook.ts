import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type TopicItemStoreSliceName,
  type TopicItemStoreLoadCompletedActionDispatch,
  type TopicItemStoreLoadCompletedActionOptions,
  type TopicItemStoreLoadCompletedActionPayload,
  type TopicItemStoreLoadCompletedActionResult,
  createTopicItemStoreLoadCompletedActionPayload,
} from '../../../../../../features';
import { TopicItemStoreActionType } from '../../../TopicItemStoreActionType';
import { useTopicItemStoreDispatch } from '../../../TopicItemStoreHooks';

export function useStoreLoadCompletedActionDispatch (
  sliceName: TopicItemStoreSliceName,
  {
    callback,
    dispatchType,
    resultOfLoadCompletedAction
  }: TopicItemStoreLoadCompletedActionOptions = {}
): TopicItemStoreLoadCompletedActionDispatch {
  const dispatch = useTopicItemStoreDispatch();

  const payloadOfLoadCompletedAction = useMemo(
    () => createTopicItemStoreLoadCompletedActionPayload({
      actionResult: resultOfLoadCompletedAction,
    }),
    [resultOfLoadCompletedAction]
  );

  const run = useCallback(
    (payload: TopicItemStoreLoadCompletedActionPayload) => {
      dispatch({
        payload,
        sliceName,
        type: TopicItemStoreActionType.LoadCompleted
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

  return useMemo<TopicItemStoreLoadCompletedActionDispatch>(
    () => ({
      run: (actionResult: TopicItemStoreLoadCompletedActionResult) => {
        const payloadOfLoadCompletedActionInner = createTopicItemStoreLoadCompletedActionPayload({
          ...payloadOfLoadCompletedAction,
          actionResult
        });

        run(payloadOfLoadCompletedActionInner);
      }
    }),
    [payloadOfLoadCompletedAction, run]
  );
}
