import { useCallback, useEffect, useMemo } from 'react';
import { type StoreActionOptions, StoreDispatchType } from '../../../../../../common';
import {
  type AppNotificationStoreSetActionDispatch,
  type AppNotificationStoreSetActionPayload,
  type AppNotificationStoreSetActionResult,
  type AppNotificationStoreSliceName,
  createAppNotificationStoreSetActionPayload,
} from '../../../../../../features';
import { createAppNotificationStoreSetAction } from '../../../Actions';
import { useAppNotificationStoreDispatch } from '../../../AppNotificationStoreHooks';

interface Options extends StoreActionOptions {
  readonly resultOfSetAction?: AppNotificationStoreSetActionResult;
}

export function useStoreSetActionDispatch (
  sliceName: AppNotificationStoreSliceName,
  {
    dispatchType,
    resultOfSetAction
  }: Options = {}
): AppNotificationStoreSetActionDispatch {
  const dispatch = useAppNotificationStoreDispatch();

  const payloadOfSetAction = useMemo(
    () => createAppNotificationStoreSetActionPayload({ actionResult: resultOfSetAction, sliceName }),
    [resultOfSetAction, sliceName]
  );

  const runInner = useCallback(
    (payload: AppNotificationStoreSetActionPayload) => {
      dispatch(createAppNotificationStoreSetAction(payload));
    },
    [dispatch]
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
