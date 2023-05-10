import { type Dispatch, useEffect, useRef } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
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
  readonly storeKey: string;
}

function runClearAction ({
  callback,
  dispatch,
  storeKey
}: Options) {
  dispatch({
    storeKey,
    type: AppNotificationStoreActionType.Clear
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
  }: AppNotificationStoreClearActionOptions = {}
): AppNotificationStoreClearActionDispatch {
  const dispatch = useAppNotificationStoreDispatch();

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
