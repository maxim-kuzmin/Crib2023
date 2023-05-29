import { useCallback, useEffect, useMemo } from 'react';
import { type StoreActionOptions, StoreDispatchType } from '../../../../../../common';
import {
  type TopicItemStoreSetActionDispatch,
  type TopicItemStoreSetActionPayload,
  type TopicItemStoreSetActionResult,
  type TopicItemStoreSliceName,
  createTopicItemStoreSetActionPayload,
} from '../../../../../../features';
import { createTopicItemStoreSetAction } from '../../../Actions';
import { useTopicItemStoreDispatch } from '../../../TopicItemStoreHooks';

interface Options extends StoreActionOptions {
  readonly resultOfSetAction?: TopicItemStoreSetActionResult;
}

export function useStoreSetActionDispatch (
  sliceName: TopicItemStoreSliceName,
  {
    dispatchType,
    resultOfSetAction
  }: Options = {}
): TopicItemStoreSetActionDispatch {
  const dispatch = useTopicItemStoreDispatch();

  const payloadOfSetAction = useMemo(
    () => createTopicItemStoreSetActionPayload({ actionResult: resultOfSetAction, sliceName }),
    [resultOfSetAction, sliceName]
  );

  const runInner = useCallback(
    (payload: TopicItemStoreSetActionPayload) => {
      dispatch(createTopicItemStoreSetAction(payload));
    },
    [dispatch]
  );

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate) {
        runInner(payloadOfSetAction);
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          runInner(payloadOfSetAction);
        }
      };
    },
    [dispatchType, payloadOfSetAction, runInner]
  );

  return useMemo<TopicItemStoreSetActionDispatch>(
    () => ({
      run: (actionResult: TopicItemStoreSetActionResult) => {
        const payloadOfSetActionInner = createTopicItemStoreSetActionPayload({
          ...payloadOfSetAction,
          actionResult
        });

        runInner(payloadOfSetActionInner);
      }
    }),
    [payloadOfSetAction, runInner]
  );
}
