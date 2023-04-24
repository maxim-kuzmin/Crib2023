import { type Dispatch, useEffect, useRef } from 'react';
import {
  type TopicItemStoreSaveCompletedActionCallback,
  type TopicItemStoreSaveCompletedActionDispatch,
  type TopicItemStoreSaveCompletedActionOptions,
  type TopicItemStoreSaveCompletedActionPayload,
} from '../../../../../../app/Stores';
import { StoreDispatchType } from '../../../../../../common';
import { TopicItemStoreActionType } from '../../../TopicItemStoreActionType';
import { type TopicItemStoreActionUnion } from '../../../TopicItemStoreActionUnion';
import { useTopicItemStoreDispatchContext } from '../../../TopicItemStoreContext';

interface RunOptions {
  readonly callback?: TopicItemStoreSaveCompletedActionCallback;
  readonly dispatch: Dispatch<TopicItemStoreActionUnion>;
  readonly payload: TopicItemStoreSaveCompletedActionPayload;
  readonly sliceName: string;
}

export function runSaveCompletedAction ({
  callback,
  dispatch,
  payload,
  sliceName
}: RunOptions) {
  dispatch({
    payload,
    sliceName,
    type: TopicItemStoreActionType.SaveCompleted
  });

  if (callback) {
    callback(payload);
  }
}

export function useStoreSaveCompletedActionDispatch (
  sliceName: string,
  {
    callback,
    dispatchType,
    payloadOfSaveCompletedAction
  }: TopicItemStoreSaveCompletedActionOptions = {}
): TopicItemStoreSaveCompletedActionDispatch {
  const dispatch = useTopicItemStoreDispatchContext();

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfSaveCompletedAction) {
        runSaveCompletedAction({
          callback,
          dispatch,
          payload: payloadOfSaveCompletedAction,
          sliceName
        });
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfSaveCompletedAction) {
          runSaveCompletedAction({
            callback,
            dispatch,
            payload: payloadOfSaveCompletedAction,
            sliceName
          });
        }
      };
    },
    [
      callback,
      dispatch,
      dispatchType,
      payloadOfSaveCompletedAction,
      sliceName
    ]
  );

  function run (payload: TopicItemStoreSaveCompletedActionPayload) {
    runSaveCompletedAction({
      callback,
      dispatch,
      payload,
      sliceName,
    });
  }

  return useRef({
    run
  }).current;
}
