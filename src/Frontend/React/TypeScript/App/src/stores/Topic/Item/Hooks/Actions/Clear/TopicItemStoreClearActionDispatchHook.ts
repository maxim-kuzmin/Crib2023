import { type Dispatch, useEffect, useRef } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type TopicItemStoreSlice,
  type TopicItemStoreClearActionCallback,
  type TopicItemStoreClearActionDispatch,
  type TopicItemStoreClearActionOptions,
} from '../../../../../../features';
import { TopicItemStoreActionType } from '../../../TopicItemStoreActionType';
import { type TopicItemStoreActionUnion } from '../../../TopicItemStoreActionUnion';
import { useTopicItemStoreDispatch } from '../../../TopicItemStoreHooks';

interface Options {
  readonly callback?: TopicItemStoreClearActionCallback;
  readonly dispatch: Dispatch<TopicItemStoreActionUnion>;
  readonly slice: string;
}

function runClearAction ({
  callback,
  dispatch,
  slice
}: Options) {
  dispatch({
    slice,
    type: TopicItemStoreActionType.Clear
  });

  if (callback) {
    callback();
  }
}

export function useStoreClearActionDispatch (
  slice: TopicItemStoreSlice,
  {
    callback,
    dispatchType
  }: TopicItemStoreClearActionOptions = {}
): TopicItemStoreClearActionDispatch {
  const dispatch = useTopicItemStoreDispatch();

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
