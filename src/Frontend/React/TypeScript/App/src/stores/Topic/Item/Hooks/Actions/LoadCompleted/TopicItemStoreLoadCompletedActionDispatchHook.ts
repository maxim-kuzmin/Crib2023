import { type Dispatch, useEffect, useRef } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type TopicItemStoreLoadCompletedActionCallback,
  type TopicItemStoreLoadCompletedActionDispatch,
  type TopicItemStoreLoadCompletedActionOptions,
  type TopicItemStoreLoadCompletedActionPayload,
} from '../../../../../../features';
import { TopicItemStoreActionType } from '../../../TopicItemStoreActionType';
import { type TopicItemStoreActionUnion } from '../../../TopicItemStoreActionUnion';
import { useTopicItemStoreDispatch } from '../../../TopicItemStoreHooks';

interface Options {
  readonly callback?: TopicItemStoreLoadCompletedActionCallback;
  readonly dispatch: Dispatch<TopicItemStoreActionUnion>;
  readonly payload: TopicItemStoreLoadCompletedActionPayload;
  readonly sliceName: string;
}

export function runLoadCompletedAction ({
  callback,
  dispatch,
  payload,
  sliceName
}: Options) {
  dispatch({
    payload,
    sliceName,
    type: TopicItemStoreActionType.LoadCompleted
  });

  if (callback) {
    callback(payload);
  }
}

export function useStoreLoadCompletedActionDispatch (
  sliceName: string,
  {
    callback,
    dispatchType,
    payloadOfLoadCompletedAction
  }: TopicItemStoreLoadCompletedActionOptions = {}
): TopicItemStoreLoadCompletedActionDispatch {
  const dispatch = useTopicItemStoreDispatch();

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfLoadCompletedAction) {
        runLoadCompletedAction({
          callback,
          dispatch,
          payload: payloadOfLoadCompletedAction,
          sliceName
        });
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfLoadCompletedAction) {
          runLoadCompletedAction({
            callback,
            dispatch,
            payload: payloadOfLoadCompletedAction,
            sliceName
          });
        }
      };
    },
    [
      callback,
      dispatch,
      dispatchType,
      payloadOfLoadCompletedAction,
      sliceName
    ]
  );

  function run (payload: TopicItemStoreLoadCompletedActionPayload) {
    runLoadCompletedAction({
      callback,
      dispatch,
      payload,
      sliceName
    });
  }

  return useRef({
    run
  }).current;
}
