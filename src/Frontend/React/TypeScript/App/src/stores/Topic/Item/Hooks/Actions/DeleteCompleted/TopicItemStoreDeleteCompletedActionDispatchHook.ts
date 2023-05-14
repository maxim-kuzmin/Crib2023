import { type Dispatch, useEffect, useRef } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type TopicItemStoreSlice,
  type TopicItemStoreDeleteCompletedActionCallback,
  type TopicItemStoreDeleteCompletedActionDispatch,
  type TopicItemStoreDeleteCompletedActionOptions,
  type TopicItemStoreDeleteCompletedActionPayload,
} from '../../../../../../features';
import { TopicItemStoreActionType } from '../../../TopicItemStoreActionType';
import { type TopicItemStoreActionUnion } from '../../../TopicItemStoreActionUnion';
import { useTopicItemStoreDispatch } from '../../../TopicItemStoreHooks';

interface Options {
  readonly callback?: TopicItemStoreDeleteCompletedActionCallback;
  readonly dispatch: Dispatch<TopicItemStoreActionUnion>;
  readonly payload: TopicItemStoreDeleteCompletedActionPayload;
  readonly slice: string;
}

export function runDeleteCompletedAction ({
  callback,
  dispatch,
  payload,
  slice
}: Options) {
  dispatch({
    payload,
    slice,
    type: TopicItemStoreActionType.DeleteCompleted
  });

  if (callback) {
    callback(payload);
  }
}

export function useStoreDeleteCompletedActionDispatch (
  slice: TopicItemStoreSlice,
  {
    callback,
    dispatchType,
    payloadOfDeleteCompletedAction
  }: TopicItemStoreDeleteCompletedActionOptions = {}
): TopicItemStoreDeleteCompletedActionDispatch {
  const dispatch = useTopicItemStoreDispatch();

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfDeleteCompletedAction) {
        runDeleteCompletedAction({
          callback,
          dispatch,
          payload: payloadOfDeleteCompletedAction,
          slice,
      });
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfDeleteCompletedAction) {
          runDeleteCompletedAction({
            callback,
            dispatch,
            payload: payloadOfDeleteCompletedAction,
            slice,
          });
        }
      };
    },
    [
      callback,
      dispatch,
      dispatchType,
      payloadOfDeleteCompletedAction,
      slice
    ]
  );

  function run (payload: TopicItemStoreDeleteCompletedActionPayload) {
    runDeleteCompletedAction({
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
