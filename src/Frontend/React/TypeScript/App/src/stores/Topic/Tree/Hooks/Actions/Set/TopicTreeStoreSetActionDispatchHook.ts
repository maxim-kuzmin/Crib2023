import { type Dispatch, useEffect, useRef } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type TopicTreeStoreSetActionCallback,
  type TopicTreeStoreSetActionDispatch,
  type TopicTreeStoreSetActionOptions,
  type TopicTreeStoreSetActionPayload,
} from '../../../../../../features';
import { TopicTreeStoreActionType } from '../../../TopicTreeStoreActionType';
import { type TopicTreeStoreActionUnion } from '../../../TopicTreeStoreActionUnion';
import { useTopicTreeStoreDispatchContext } from '../../../TopicTreeStoreContext';

interface Options {
  readonly callback?: TopicTreeStoreSetActionCallback;
  readonly dispatch: Dispatch<TopicTreeStoreActionUnion>;
  readonly payload: TopicTreeStoreSetActionPayload;
  readonly sliceName: string;
}

function runSetAction ({
  callback,
  dispatch,
  payload,
  sliceName
}: Options) {
  dispatch({
    payload,
    sliceName,
    type: TopicTreeStoreActionType.Set
  });

  if (callback) {
    callback(payload);
  }
}

export function useStoreSetActionDispatch (
  sliceName: string,
  {
    callback,
    dispatchType,
    payloadOfSetAction
  }: TopicTreeStoreSetActionOptions
): TopicTreeStoreSetActionDispatch {
  const dispatch = useTopicTreeStoreDispatchContext();

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfSetAction) {
        runSetAction({
          callback,
          dispatch,
          payload: payloadOfSetAction,
          sliceName
        });
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfSetAction) {
          runSetAction({
            callback,
            dispatch,
            payload: payloadOfSetAction,
            sliceName
          });
        }
      };
    },
    [
      callback,
      dispatch,
      dispatchType,
      payloadOfSetAction,
      sliceName
    ]
  );

  function run (payload: TopicTreeStoreSetActionPayload) {
    runSetAction({
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
