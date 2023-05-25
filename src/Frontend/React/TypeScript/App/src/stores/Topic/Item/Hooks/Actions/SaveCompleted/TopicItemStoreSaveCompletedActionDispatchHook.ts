import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type TopicItemStoreSliceName,
  type TopicItemStoreSaveCompletedActionDispatch,
  type TopicItemStoreSaveCompletedActionOptions,
  type TopicItemStoreSaveCompletedActionPayload,
  type TopicItemStoreSaveCompletedActionResult,
  createTopicItemStoreSaveCompletedActionPayload,
} from '../../../../../../features';
import { TopicItemStoreActionType } from '../../../TopicItemStoreActionType';
import { useTopicItemStoreDispatch } from '../../../TopicItemStoreHooks';

export function useStoreSaveCompletedActionDispatch (
  sliceName: TopicItemStoreSliceName,
  {
    callback,
    dispatchType,
    resultOfSaveCompletedAction
  }: TopicItemStoreSaveCompletedActionOptions = {}
): TopicItemStoreSaveCompletedActionDispatch {
  const dispatch = useTopicItemStoreDispatch();

  const payloadOfSaveCompletedAction = useMemo(
    () => createTopicItemStoreSaveCompletedActionPayload({
      actionResult: resultOfSaveCompletedAction,
    }),
    [resultOfSaveCompletedAction]
  );

  const run = useCallback(
    (payload: TopicItemStoreSaveCompletedActionPayload) => {
      dispatch({
        payload,
        sliceName,
        type: TopicItemStoreActionType.SaveCompleted
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
        run(payloadOfSaveCompletedAction);
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          run(payloadOfSaveCompletedAction);
        }
      };
    },
    [dispatchType, payloadOfSaveCompletedAction, run]
  );

  return useMemo<TopicItemStoreSaveCompletedActionDispatch>(
    () => ({
      run: (actionResult: TopicItemStoreSaveCompletedActionResult) => {
        const payloadOfSaveCompletedActionInner = createTopicItemStoreSaveCompletedActionPayload({
          ...payloadOfSaveCompletedAction,
          actionResult
        });

        run(payloadOfSaveCompletedActionInner);
      }
    }),
    [payloadOfSaveCompletedAction, run]
  );
}
