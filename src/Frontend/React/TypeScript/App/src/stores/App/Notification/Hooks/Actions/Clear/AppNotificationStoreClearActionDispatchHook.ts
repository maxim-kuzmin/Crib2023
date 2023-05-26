import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type AppNotificationStoreClearActionDispatch,
  type AppNotificationStoreClearActionOptions,
  type AppNotificationStoreSliceName,
  createAppNotificationStoreClearActionPayload,
} from '../../../../../../features';
import { createAppNotificationStoreClearAction } from '../../../Actions';
import { useAppNotificationStoreDispatch } from '../../../AppNotificationStoreHooks';

export function useStoreClearActionDispatch (
  sliceName: AppNotificationStoreSliceName,
  {
    callback,
    dispatchType
  }: AppNotificationStoreClearActionOptions = {}
): AppNotificationStoreClearActionDispatch {
  const dispatch = useAppNotificationStoreDispatch();

  const payloadOfClearAction = useMemo(
    () => createAppNotificationStoreClearActionPayload({ sliceName }),
    [sliceName]
  );

  const run = useCallback(
    () => {
      dispatch(createAppNotificationStoreClearAction(payloadOfClearAction));

      if (callback) {
        callback();
      }
    },
    [callback, dispatch, payloadOfClearAction]
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
