import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type TopicItemStoreSaveCompletedActionDispatch,
  type TopicItemStoreSaveCompletedActionOptions,
  type TopicItemStoreSaveCompletedActionPayload,
  type TopicItemStoreSaveCompletedActionResult,
  type TopicItemStoreSliceName,
  createTopicItemStoreSaveCompletedActionPayload,
} from '../../../../../../features';
import { createTopicItemStoreSaveCompletedAction } from '../../../Actions';
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
      sliceName,
    }),
    [resultOfSaveCompletedAction, sliceName]
  );

  const runInner = useCallback(
    (payload: TopicItemStoreSaveCompletedActionPayload) => {
      dispatch(createTopicItemStoreSaveCompletedAction(payload));

      if (callback) {
        callback(payload.actionResult);
      }
    },
    [callback, dispatch]
  );

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate) {
        runInner(payloadOfSaveCompletedAction);
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          runInner(payloadOfSaveCompletedAction);
        }
      };
    },
    [dispatchType, payloadOfSaveCompletedAction, runInner]
  );

  return useMemo<TopicItemStoreSaveCompletedActionDispatch>(
    () => ({
      run: (actionResult: TopicItemStoreSaveCompletedActionResult) => {
        const payloadOfSaveCompletedActionInner = createTopicItemStoreSaveCompletedActionPayload({
          ...payloadOfSaveCompletedAction,
          actionResult
        });

        runInner(payloadOfSaveCompletedActionInner);
      }
    }),
    [payloadOfSaveCompletedAction, runInner]
  );
}
