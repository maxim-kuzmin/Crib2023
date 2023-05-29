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

  const runInner = useCallback(
    (payload: TopicItemStoreLoadCompletedActionPayload) => {
      dispatch(createTopicItemStoreLoadCompletedAction(payload));

      const { actionResult } = payload;

      if (callback && !actionResult?.error) {
        callback(actionResult);
      }
    },
    [callback, dispatch]
  );

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate) {
        runInner(payloadOfLoadCompletedAction);
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          runInner(payloadOfLoadCompletedAction);
        }
      };
    },
    [dispatchType, payloadOfLoadCompletedAction, runInner]
  );

  return useMemo<TopicItemStoreLoadCompletedActionDispatch>(
    () => ({
      run: (actionResult: TopicItemStoreLoadCompletedActionResult) => {
        const payloadOfLoadCompletedActionInner = createTopicItemStoreLoadCompletedActionPayload({
          ...payloadOfLoadCompletedAction,
          actionResult
        });

        runInner(payloadOfLoadCompletedActionInner);
      }
    }),
    [payloadOfLoadCompletedAction, runInner]
  );
}
