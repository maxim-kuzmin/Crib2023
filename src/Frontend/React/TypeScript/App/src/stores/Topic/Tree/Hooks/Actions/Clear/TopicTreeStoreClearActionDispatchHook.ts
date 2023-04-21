import { type Dispatch, useEffect, useRef } from 'react';
import {
  type TopicTreeStoreClearActionCallback,
  type TopicTreeStoreClearActionDispatch,
  type TopicTreeStoreClearActionOptions,
} from '../../../../../../app/Stores';
import { StoreDispatchType } from '../../../../../../common';
import { TopicTreeStoreActionType } from '../../../TopicTreeStoreActionType';
import { type TopicTreeStoreActionUnion } from '../../../TopicTreeStoreActionUnion';
import { useTopicTreeStoreDispatchContext } from '../../../TopicTreeStoreContext';

interface RunOptions {
  readonly callback?: TopicTreeStoreClearActionCallback;
  readonly dispatch: Dispatch<TopicTreeStoreActionUnion>;
  readonly sliceName: string;
}

function runClearAction ({
  callback,
  dispatch,
  sliceName
}: RunOptions) {
  dispatch({
    sliceName,
    type: TopicTreeStoreActionType.Clear
  });

  if (callback) {
    callback();
  }
}

export function useClearActionDispatch (
  sliceName: string,
  {
    callback,
    dispatchType
  }: TopicTreeStoreClearActionOptions = {}
): TopicTreeStoreClearActionDispatch {
  const dispatch = useTopicTreeStoreDispatchContext();

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
