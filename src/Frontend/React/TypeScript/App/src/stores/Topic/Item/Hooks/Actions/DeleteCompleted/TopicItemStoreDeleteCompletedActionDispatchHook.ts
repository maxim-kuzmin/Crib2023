import { type Dispatch, useEffect, useRef } from 'react';
import {
  type TopicItemStoreDeleteCompletedActionCallback,
  type TopicItemStoreDeleteCompletedActionDispatch,
  type TopicItemStoreDeleteCompletedActionOptions,
  type TopicItemStoreDeleteCompletedActionPayload,
} from '../../../../../../app/Stores';
import { StoreDispatchType } from '../../../../../../common';
import { TopicItemStoreActionType } from '../../../TopicItemStoreActionType';
import { type TopicItemStoreActionUnion } from '../../../TopicItemStoreActionUnion';
import { useTopicItemStoreDispatchContext } from '../../../TopicItemStoreContext';

interface RunOptions {
  readonly callback?: TopicItemStoreDeleteCompletedActionCallback;
  readonly dispatch: Dispatch<TopicItemStoreActionUnion>;
  readonly payload: TopicItemStoreDeleteCompletedActionPayload;
  readonly sliceName: string;
}

export function runDeleteCompletedAction ({
  callback,
  dispatch,
  payload,
  sliceName
}: RunOptions) {
  dispatch({
    payload,
    sliceName,
    type: TopicItemStoreActionType.DeleteCompleted
  });

  if (callback) {
    callback(payload);
  }
}

export function useStoreDeleteCompletedActionDispatch (
  sliceName: string,
  {
    callback,
    dispatchType,
    payloadOfDeleteCompletedAction
  }: TopicItemStoreDeleteCompletedActionOptions = {}
): TopicItemStoreDeleteCompletedActionDispatch {
  const dispatch = useTopicItemStoreDispatchContext();

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfDeleteCompletedAction) {
        runDeleteCompletedAction({
          callback,
          dispatch,
          payload: payloadOfDeleteCompletedAction,
          sliceName,
      });
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfDeleteCompletedAction) {
          runDeleteCompletedAction({
            callback,
            dispatch,
            payload: payloadOfDeleteCompletedAction,
            sliceName,
          });
        }
      };
    },
    [
      callback,
      dispatch,
      dispatchType,
      payloadOfDeleteCompletedAction,
      sliceName
    ]
  );

  function run (payload: TopicItemStoreDeleteCompletedActionPayload) {
    runDeleteCompletedAction({
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
