import { useCallback, useEffect, useMemo } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type AppNotificationStoreSliceName,
  type AppNotificationStoreSetActionDispatch,
  type AppNotificationStoreSetActionOptions,
  type AppNotificationStoreSetActionPayload,
  type AppNotificationStoreSetActionResult,
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

  const run = useCallback(
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
        run(payloadOfSetAction);
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          run(payloadOfSetAction);
        }
      };
    },
    [dispatchType, payloadOfSetAction, run]
  );

  return useMemo<AppNotificationStoreSetActionDispatch>(
    () => ({
      run: (actionResult: AppNotificationStoreSetActionResult) => {
        const payloadOfSetActionInner = createAppNotificationStoreSetActionPayload({
          ...payloadOfSetAction,
          actionResult
        });

        run(payloadOfSetActionInner);
      }
    }),
    [payloadOfSetAction, run]
  );
}
