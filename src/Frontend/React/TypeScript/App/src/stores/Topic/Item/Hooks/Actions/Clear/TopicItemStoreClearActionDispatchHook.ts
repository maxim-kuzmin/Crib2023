import { type Dispatch, useEffect, useRef } from 'react';
import {
  type TopicItemStoreClearActionCallback,
  type TopicItemStoreClearActionDispatch,
  type TopicItemStoreClearActionOptions,
} from '../../../../../../app/Stores';
import { StoreDispatchType } from '../../../../../../common';
import { TopicItemStoreActionType } from '../../../TopicItemStoreActionType';
import { type TopicItemStoreActionUnion } from '../../../TopicItemStoreActionUnion';
import { useTopicItemStoreDispatchContext } from '../../../TopicItemStoreContext';

interface RunOptions {
  readonly callback?: TopicItemStoreClearActionCallback;
  readonly dispatch: Dispatch<TopicItemStoreActionUnion>;
  readonly sliceName: string;
}

function runClearAction ({
  callback,
  dispatch,
  sliceName
}: RunOptions) {
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
  const dispatch = useTopicItemStoreDispatchContext();

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
