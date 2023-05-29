import { useCallback, useEffect, useMemo } from 'react';
import { type StoreActionOptions, StoreDispatchType } from '../../../../../../common';
import {
  type TopicItemStoreSaveCompletedActionCallback,
  type TopicItemStoreSaveCompletedActionDispatch,
  type TopicItemStoreSaveCompletedActionPayload,
  type TopicItemStoreSaveCompletedActionResult,
  type TopicItemStoreSliceName,
  createTopicItemStoreSaveCompletedActionPayload,
} from '../../../../../../features';
import { createTopicItemStoreSaveCompletedAction } from '../../../Actions';
import { useTopicItemStoreDispatch } from '../../../TopicItemStoreHooks';

interface Options extends StoreActionOptions {
  readonly callback?: TopicItemStoreSaveCompletedActionCallback;
  readonly resultOfSaveCompletedAction?: TopicItemStoreSaveCompletedActionResult;
}

export function useStoreSaveCompletedActionDispatch (
  sliceName: TopicItemStoreSliceName,
  {
    callback,
    dispatchType,
    resultOfSaveCompletedAction
  }: Options = {}
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
