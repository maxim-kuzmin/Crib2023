import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type AppNotificationStoreSliceName,
  type AppNotificationStoreClearActionDispatch,
  type AppNotificationStoreClearActionOptions,
} from '../../../../../../features';
import { AppNotificationStoreActionType } from '../../../AppNotificationStoreActionType';
import { useAppNotificationStoreDispatch } from '../../../AppNotificationStoreHooks';

export function useStoreClearActionDispatch (
  sliceName: AppNotificationStoreSliceName,
  {
    callback,
    dispatchType
  }: AppNotificationStoreClearActionOptions = {}
): AppNotificationStoreClearActionDispatch {
  const dispatch = useAppNotificationStoreDispatch();

  const run = useCallback(
    () => {
      dispatch({ sliceName, type: AppNotificationStoreActionType.Clear });

      if (callback) {
        callback();
      }
    },
    [callback, dispatch, sliceName]
  );

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate) {
        run();
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          run();
        }
      };
    },
    [dispatchType, run]
  );

  return useMemo<AppNotificationStoreClearActionDispatch>(() => ({ run }), [run]);
}
