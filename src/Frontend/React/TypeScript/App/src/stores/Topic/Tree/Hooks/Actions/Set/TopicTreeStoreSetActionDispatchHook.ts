import { type Dispatch, useEffect, useRef } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type TopicTreeStoreSlice,
  type TopicTreeStoreSetActionCallback,
  type TopicTreeStoreSetActionDispatch,
  type TopicTreeStoreSetActionOptions,
  type TopicTreeStoreSetActionPayload,
} from '../../../../../../features';
import { TopicTreeStoreActionType } from '../../../TopicTreeStoreActionType';
import { type TopicTreeStoreActionUnion } from '../../../TopicTreeStoreActionUnion';
import { useTopicTreeStoreDispatch } from '../../../TopicTreeStoreHooks';

interface Options {
  readonly callback?: TopicTreeStoreSetActionCallback;
  readonly dispatch: Dispatch<TopicTreeStoreActionUnion>;
  readonly payload: TopicTreeStoreSetActionPayload;
  readonly slice: string;
}

function runSetAction ({
  callback,
  dispatch,
  payload,
  slice
}: Options) {
  dispatch({
    payload,
    slice,
    type: TopicTreeStoreActionType.Set
  });

  if (callback) {
    callback(payload);
  }
}

export function useStoreSetActionDispatch (
  slice: TopicTreeStoreSlice,
  {
    callback,
    dispatchType,
    payloadOfSetAction
  }: TopicTreeStoreSetActionOptions
): TopicTreeStoreSetActionDispatch {
  const dispatch = useTopicTreeStoreDispatch();

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfSetAction) {
        runSetAction({
          callback,
          dispatch,
          payload: payloadOfSetAction,
          slice
        });
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfSetAction) {
          runSetAction({
            callback,
            dispatch,
            payload: payloadOfSetAction,
            slice
          });
        }
      };
    },
    [
      callback,
      dispatch,
      dispatchType,
      payloadOfSetAction,
      slice
    ]
  );

  function run (payload: TopicTreeStoreSetActionPayload) {
    runSetAction({
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
