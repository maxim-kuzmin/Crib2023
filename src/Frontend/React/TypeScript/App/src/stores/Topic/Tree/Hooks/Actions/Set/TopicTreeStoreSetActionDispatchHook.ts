import { useCallback, useEffect, useMemo } from 'react';
import { type StoreActionOptions, StoreDispatchType } from '../../../../../../common';
import {
  type TopicTreeStoreSetActionCallback,
  type TopicTreeStoreSetActionDispatch,
  type TopicTreeStoreSetActionPayload,
  type TopicTreeStoreSetActionResult,
  type TopicTreeStoreSliceName,
  createTopicTreeStoreSetActionPayload,
} from '../../../../../../features';
import { createTopicTreeStoreSetAction } from '../../../Actions';
import { useTopicTreeStoreDispatch } from '../../../TopicTreeStoreHooks';

interface Options extends StoreActionOptions {
  readonly callback?: TopicTreeStoreSetActionCallback;
  readonly resultOfSetAction?: TopicTreeStoreSetActionResult;
}

export function useStoreSetActionDispatch (
  sliceName: TopicTreeStoreSliceName,
  {
    callback,
    dispatchType,
    resultOfSetAction
  }: Options = {}
): TopicTreeStoreSetActionDispatch {
  const dispatch = useTopicTreeStoreDispatch();

  const payloadOfSetAction = useMemo(
    () => createTopicTreeStoreSetActionPayload({ actionResult: resultOfSetAction, sliceName }),
    [resultOfSetAction, sliceName]
  );

  const runInner = useCallback(
    (payload: TopicTreeStoreSetActionPayload) => {
      dispatch(createTopicTreeStoreSetAction(payload));

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

  return useMemo<TopicTreeStoreSetActionDispatch>(
    () => ({
      run: (actionResult: TopicTreeStoreSetActionResult) => {
        const payloadOfSetActionInner = createTopicTreeStoreSetActionPayload({
          ...payloadOfSetAction,
          actionResult
        });

        runInner(payloadOfSetActionInner);
      }
    }),
    [payloadOfSetAction, runInner]
  );
}
