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
  readonly sliceName: string;
}

function runClearAction ({
  callback,
  dispatch,
  sliceName
}: Options) {
  dispatch({
    sliceName,
    type: TopicItemStoreActionType.Clear
  });

  if (callback) {
    callback();
  }
}

export function useStoreClearActionDispatch (
  sliceName: string,
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
          sliceName
        });
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          runClearAction({
            callback,
            dispatch,
            sliceName
          });
        }
      };
    },
    [
      callback,
      dispatch,
      dispatchType,
      sliceName
    ]
  );

  function run () {
    runClearAction({
      callback,
      dispatch,
      sliceName
    });
  }

  return useRef({
    run
  }).current;
}
