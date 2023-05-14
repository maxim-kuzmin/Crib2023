import { type Dispatch, useEffect, useRef } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type TopicItemStoreOwner,
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
  readonly owner: string;
}

function runClearAction ({
  callback,
  dispatch,
  owner
}: Options) {
  dispatch({
    owner,
    type: TopicItemStoreActionType.Clear
  });

  if (callback) {
    callback();
  }
}

export function useStoreClearActionDispatch (
  owner: TopicItemStoreOwner,
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
          owner
        });
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          runClearAction({
            callback,
            dispatch,
            owner
          });
        }
      };
    },
    [
      callback,
      dispatch,
      dispatchType,
      owner
    ]
  );

  function run () {
    runClearAction({
      callback,
      dispatch,
      owner
    });
  }

  return useRef({
    run
  }).current;
}
