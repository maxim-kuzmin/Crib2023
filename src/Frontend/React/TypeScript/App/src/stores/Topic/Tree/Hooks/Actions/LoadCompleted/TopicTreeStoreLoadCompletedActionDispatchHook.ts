import { type Dispatch, useEffect, useRef } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type TopicTreeStoreSlice,
  type TopicTreeStoreLoadCompletedActionCallback,
  type TopicTreeStoreLoadCompletedActionDispatch,
  type TopicTreeStoreLoadCompletedActionOptions,
  type TopicTreeStoreLoadCompletedActionPayload,
} from '../../../../../../features';
import { TopicTreeStoreActionType } from '../../../TopicTreeStoreActionType';
import { type TopicTreeStoreActionUnion } from '../../../TopicTreeStoreActionUnion';
import { useTopicTreeStoreDispatch } from '../../../TopicTreeStoreHooks';

interface Options {
  readonly callback?: TopicTreeStoreLoadCompletedActionCallback;
  readonly dispatch: Dispatch<TopicTreeStoreActionUnion>;
  readonly payload: TopicTreeStoreLoadCompletedActionPayload;
  readonly slice: string;
}

export function runLoadCompletedAction ({
  callback,
  dispatch,
  payload,
  slice
}: Options) {
  dispatch({
    payload,
    slice,
    type: TopicTreeStoreActionType.LoadCompleted
  });

  if (callback) {
    callback(payload);
  }
}

export function useStoreLoadCompletedActionDispatch (
  slice: TopicTreeStoreSlice,
  {
    callback,
    dispatchType,
    payloadOfLoadCompletedAction
  }: TopicTreeStoreLoadCompletedActionOptions = {}
): TopicTreeStoreLoadCompletedActionDispatch {
  const dispatch = useTopicTreeStoreDispatch();

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfLoadCompletedAction) {
        runLoadCompletedAction({
          callback,
          dispatch,
          payload: payloadOfLoadCompletedAction,
          slice
        });
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfLoadCompletedAction) {
          runLoadCompletedAction({
            callback,
            dispatch,
            payload: payloadOfLoadCompletedAction,
            slice
          });
        }
      };
    },
    [
      callback,
      dispatch,
      dispatchType,
      payloadOfLoadCompletedAction,
      slice
    ]
  );

  function run (payload: TopicTreeStoreLoadCompletedActionPayload) {
    runLoadCompletedAction({
      callback,
      dispatch,
      payload,
      slice
    });
  }

  return useRef({
    run
  }).current;
}
