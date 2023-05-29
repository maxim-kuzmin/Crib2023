import { useCallback, useEffect, useMemo } from 'react';
import { type StoreActionOptions, StoreDispatchType } from '../../../../../../common';
import {
  type TopicItemStoreLoadCompletedActionDispatch,
  type TopicItemStoreLoadCompletedActionPayload,
  type TopicItemStoreLoadCompletedActionResult,
  type TopicItemStoreSliceName,
  createTopicItemStoreLoadCompletedActionPayload,
} from '../../../../../../features';
import { createTopicItemStoreLoadCompletedAction } from '../../../Actions';
import { useTopicItemStoreDispatch } from '../../../TopicItemStoreHooks';

interface Options extends StoreActionOptions {
  readonly resultOfLoadCompletedAction?: TopicItemStoreLoadCompletedActionResult;
}

export function useStoreLoadCompletedActionDispatch (
  sliceName: TopicItemStoreSliceName,
  {
    dispatchType,
    resultOfLoadCompletedAction
  }: Options = {}
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
    },
    [dispatch]
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
