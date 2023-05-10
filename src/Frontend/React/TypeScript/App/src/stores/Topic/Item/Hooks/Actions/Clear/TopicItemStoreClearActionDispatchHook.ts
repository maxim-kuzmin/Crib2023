import { type Dispatch, useEffect, useRef } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
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
  readonly storeKey: string;
}

function runClearAction ({
  callback,
  dispatch,
  storeKey
}: Options) {
  dispatch({
    storeKey,
    type: TopicItemStoreActionType.Clear
  });

  if (callback) {
    callback();
  }
}

export function useStoreClearActionDispatch (
  storeKey: string,
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
          storeKey
        });
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          runClearAction({
            callback,
            dispatch,
            storeKey
          });
        }
      };
    },
    [
      callback,
      dispatch,
      dispatchType,
      storeKey
    ]
  );

  function run () {
    runClearAction({
      callback,
      dispatch,
      storeKey
    });
  }

  return useRef({
    run
  }).current;
}
