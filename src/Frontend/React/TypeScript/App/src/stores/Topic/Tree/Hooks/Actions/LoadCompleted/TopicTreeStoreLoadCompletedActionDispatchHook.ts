import { type Dispatch, useEffect, useRef } from 'react';
import {
  type TopicTreeStoreLoadCompletedActionCallback,
  type TopicTreeStoreLoadCompletedActionDispatch,
  type TopicTreeStoreLoadCompletedActionOptions,
  type TopicTreeStoreLoadCompletedActionPayload,
} from '../../../../../../app/Stores';
import { StoreDispatchType } from '../../../../../../common';
import { TopicTreeStoreActionType } from '../../../TopicTreeStoreActionType';
import { type TopicTreeStoreActionUnion } from '../../../TopicTreeStoreActionUnion';
import { useTopicTreeStoreDispatchContext } from '../../../TopicTreeStoreContext';

interface RunOptions {
  readonly callback?: TopicTreeStoreLoadCompletedActionCallback;
  readonly dispatch: Dispatch<TopicTreeStoreActionUnion>;
  readonly payload: TopicTreeStoreLoadCompletedActionPayload;
  readonly sliceName: string;
}

export function runLoadCompletedAction ({
  callback,
  dispatch,
  payload,
  sliceName
}: RunOptions) {
  dispatch({
    payload,
    sliceName,
    type: TopicTreeStoreActionType.LoadCompleted
  });

  if (callback) {
    callback(payload);
  }
}

export function useLoadCompletedActionDispatch (
  sliceName: string,
  {
    callback,
    dispatchType,
    payloadOfLoadCompletedAction
  }: TopicTreeStoreLoadCompletedActionOptions = {}
): TopicTreeStoreLoadCompletedActionDispatch {
  const dispatch = useTopicTreeStoreDispatchContext();

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

  function run (payload: TopicTreeStoreLoadCompletedActionPayload) {
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
