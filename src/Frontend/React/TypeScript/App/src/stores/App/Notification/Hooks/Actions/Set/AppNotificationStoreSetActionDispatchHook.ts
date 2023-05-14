import { type Dispatch, useEffect, useRef } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type AppNotificationStoreSlice,
  type AppNotificationStoreSetActionCallback,
  type AppNotificationStoreSetActionDispatch,
  type AppNotificationStoreSetActionOptions,
  type AppNotificationStoreSetActionPayload,
} from '../../../../../../features';
import { AppNotificationStoreActionType } from '../../../AppNotificationStoreActionType';
import { type AppNotificationStoreActionUnion } from '../../../AppNotificationStoreActionUnion';
import { useAppNotificationStoreDispatch } from '../../../AppNotificationStoreHooks';

interface Options {
  readonly callback?: AppNotificationStoreSetActionCallback;
  readonly dispatch: Dispatch<AppNotificationStoreActionUnion>;
  readonly payload: AppNotificationStoreSetActionPayload;
  readonly slice: string;
}

function runSetAction ({
  callback,
  dispatch,
  payload,
  slice
}: Options) {
  dispatch({
    payload,
    slice,
    type: AppNotificationStoreActionType.Set
  });

  if (callback) {
    callback(payload);
  }
}

export function useStoreSetActionDispatch (
  slice: AppNotificationStoreSlice,
  {
    callback,
    dispatchType,
    payloadOfSetAction
  }: AppNotificationStoreSetActionOptions
): AppNotificationStoreSetActionDispatch {
  const dispatch = useAppNotificationStoreDispatch();

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate && payloadOfSetAction) {
        runSetAction({
          callback,
          dispatch,
          payload: payloadOfSetAction,
          slice
        });
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount && payloadOfSetAction) {
          runSetAction({
            callback,
            dispatch,
            payload: payloadOfSetAction,
            slice
          });
        }
      };
    },
    [
      callback,
      dispatch,
      dispatchType,
      payloadOfSetAction,
      slice
    ]
  );

  function run (payload: AppNotificationStoreSetActionPayload) {
    runSetAction({
      callback,
      dispatch,
      payload,
      slice
    });
  }

  return useRef({
    run
  }).current;
}
