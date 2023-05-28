import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type TopicItemStoreSetActionDispatch,
  type TopicItemStoreSetActionOptions,
  type TopicItemStoreSetActionPayload,
  type TopicItemStoreSetActionResult,
  type TopicItemStoreSliceName,
  createTopicItemStoreSetActionPayload,
} from '../../../../../../features';
import { createTopicItemStoreSetAction } from '../../../Actions';
import { useTopicItemStoreDispatch } from '../../../TopicItemStoreHooks';

export function useStoreSetActionDispatch (
  sliceName: TopicItemStoreSliceName,
  {
    callback,
    dispatchType,
    resultOfSetAction
  }: TopicItemStoreSetActionOptions = {}
): TopicItemStoreSetActionDispatch {
  const dispatch = useTopicItemStoreDispatch();

  const payloadOfSetAction = useMemo(
    () => createTopicItemStoreSetActionPayload({ actionResult: resultOfSetAction, sliceName }),
    [resultOfSetAction, sliceName]
  );

  const runInner = useCallback(
    (payload: TopicItemStoreSetActionPayload) => {
      dispatch(createTopicItemStoreSetAction(payload));

      if (callback) {
        callback(payload.actionResult);
      }
    },
    [callback, dispatch]
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
