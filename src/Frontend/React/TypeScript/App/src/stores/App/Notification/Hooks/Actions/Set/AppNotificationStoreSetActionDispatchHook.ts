import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type AppNotificationStoreSetActionDispatch,
  type AppNotificationStoreSetActionOptions,
  type AppNotificationStoreSetActionPayload,
  type AppNotificationStoreSetActionResult,
  type AppNotificationStoreSliceName,
  createAppNotificationStoreSetActionPayload,
} from '../../../../../../features';
import { createAppNotificationStoreSetAction } from '../../../Actions';
import { useAppNotificationStoreDispatch } from '../../../AppNotificationStoreHooks';

export function useStoreSetActionDispatch (
  sliceName: AppNotificationStoreSliceName,
  {
    callback,
    dispatchType,
    resultOfSetAction
  }: AppNotificationStoreSetActionOptions = {}
): AppNotificationStoreSetActionDispatch {
  const dispatch = useAppNotificationStoreDispatch();

  const payloadOfSetAction = useMemo(
    () => createAppNotificationStoreSetActionPayload({ actionResult: resultOfSetAction, sliceName }),
    [resultOfSetAction, sliceName]
  );

  const runInner = useCallback(
    (payload: AppNotificationStoreSetActionPayload) => {
      dispatch(createAppNotificationStoreSetAction(payload));

      if (callback) {
        callback(payload.actionResult);
      }
    },
    [callback, dispatch]
  );

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate) {
        runInner(payloadOfSetAction);
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          runInner(payloadOfSetAction);
        }
      };
    },
    [dispatchType, payloadOfSetAction, runInner]
  );

  return useMemo<AppNotificationStoreSetActionDispatch>(
    () => ({
      run: (actionResult: AppNotificationStoreSetActionResult) => {
        const payloadOfSetActionInner = createAppNotificationStoreSetActionPayload({
          ...payloadOfSetAction,
          actionResult
        });

        runInner(payloadOfSetActionInner);
      }
    }),
    [payloadOfSetAction, runInner]
  );
}
