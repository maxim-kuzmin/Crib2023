import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type TopicItemStoreLoadCompletedActionDispatch,
  type TopicItemStoreLoadCompletedActionOptions,
  type TopicItemStoreLoadCompletedActionPayload,
  type TopicItemStoreLoadCompletedActionResult,
  type TopicItemStoreSliceName,
  createTopicItemStoreLoadCompletedActionPayload,
} from '../../../../../../features';
import { createTopicItemStoreLoadCompletedAction } from '../../../Actions';
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
      sliceName,
    }),
    [resultOfLoadCompletedAction, sliceName]
  );

  const run = useCallback(
    (payload: TopicItemStoreLoadCompletedActionPayload) => {
      dispatch(createTopicItemStoreLoadCompletedAction(payload));

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
