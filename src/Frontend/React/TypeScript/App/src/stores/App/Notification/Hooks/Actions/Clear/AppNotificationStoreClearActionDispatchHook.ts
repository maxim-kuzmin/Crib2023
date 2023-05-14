import { type Dispatch, useEffect, useRef } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type AppNotificationStoreSlice,
  type AppNotificationStoreClearActionCallback,
  type AppNotificationStoreClearActionDispatch,
  type AppNotificationStoreClearActionOptions,
} from '../../../../../../features';
import { AppNotificationStoreActionType } from '../../../AppNotificationStoreActionType';
import { type AppNotificationStoreActionUnion } from '../../../AppNotificationStoreActionUnion';
import { useAppNotificationStoreDispatch } from '../../../AppNotificationStoreHooks';

interface Options {
  readonly callback?: AppNotificationStoreClearActionCallback;
  readonly dispatch: Dispatch<AppNotificationStoreActionUnion>;
  readonly slice: string;
}

function runClearAction ({
  callback,
  dispatch,
  slice
}: Options) {
  dispatch({
    slice,
    type: AppNotificationStoreActionType.Clear
  });

  if (callback) {
    callback();
  }
}

export function useStoreClearActionDispatch (
  slice: AppNotificationStoreSlice,
  {
    callback,
    dispatchType
  }: AppNotificationStoreClearActionOptions = {}
): AppNotificationStoreClearActionDispatch {
  const dispatch = useAppNotificationStoreDispatch();

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
