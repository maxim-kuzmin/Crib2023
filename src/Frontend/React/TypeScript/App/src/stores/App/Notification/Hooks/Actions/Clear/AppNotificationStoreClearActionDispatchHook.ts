import { type Dispatch, useEffect, useRef } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type AppNotificationStoreOwner,
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
  readonly owner: string;
}

function runClearAction ({
  callback,
  dispatch,
  owner
}: Options) {
  dispatch({
    owner,
    type: AppNotificationStoreActionType.Clear
  });

  if (callback) {
    callback();
  }
}

export function useStoreClearActionDispatch (
  owner: AppNotificationStoreOwner,
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
