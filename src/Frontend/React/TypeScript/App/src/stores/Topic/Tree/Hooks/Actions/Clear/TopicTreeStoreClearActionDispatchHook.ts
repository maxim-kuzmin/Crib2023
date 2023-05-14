import { type Dispatch, useEffect, useRef } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type TopicTreeStoreSlice,
  type TopicTreeStoreClearActionCallback,
  type TopicTreeStoreClearActionDispatch,
  type TopicTreeStoreClearActionOptions,
} from '../../../../../../features';
import { TopicTreeStoreActionType } from '../../../TopicTreeStoreActionType';
import { type TopicTreeStoreActionUnion } from '../../../TopicTreeStoreActionUnion';
import { useTopicTreeStoreDispatch } from '../../../TopicTreeStoreHooks';

interface Options {
  readonly callback?: TopicTreeStoreClearActionCallback;
  readonly dispatch: Dispatch<TopicTreeStoreActionUnion>;
  readonly slice: string;
}

function runClearAction ({
  callback,
  dispatch,
  slice
}: Options) {
  dispatch({
    slice,
    type: TopicTreeStoreActionType.Clear
  });

  if (callback) {
    callback();
  }
}

export function useStoreClearActionDispatch (
  slice: TopicTreeStoreSlice,
  {
    callback,
    dispatchType
  }: TopicTreeStoreClearActionOptions = {}
): TopicTreeStoreClearActionDispatch {
  const dispatch = useTopicTreeStoreDispatch();

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate) {
        runClearAction({
          callback,
          dispatch,
          slice
        });
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          runClearAction({
            callback,
            dispatch,
            slice
          });
        }
      };
    },
    [
      callback,
      dispatch,
      dispatchType,
      slice
    ]
  );

  function run () {
    runClearAction({
      callback,
      dispatch,
      slice
    });
  }

  return useRef({
    run
  }).current;
}
