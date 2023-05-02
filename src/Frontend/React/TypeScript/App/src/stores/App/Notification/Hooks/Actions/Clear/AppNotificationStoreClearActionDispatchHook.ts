import { type Dispatch, useEffect, useRef } from 'react';
import { StoreDispatchType } from '../../../../../../common';
import {
  type AppNotificationStoreClearActionCallback,
  type AppNotificationStoreClearActionDispatch,
  type AppNotificationStoreClearActionOptions,
} from '../../../../../../features';
import { AppNotificationStoreActionType } from '../../../AppNotificationStoreActionType';
import { type AppNotificationStoreActionUnion } from '../../../AppNotificationStoreActionUnion';
import { useAppNotificationStoreDispatchContext } from '../../../AppNotificationStoreContext';

interface Options {
  readonly callback?: AppNotificationStoreClearActionCallback;
  readonly dispatch: Dispatch<AppNotificationStoreActionUnion>;
  readonly sliceName: string;
}

function runClearAction ({
  callback,
  dispatch,
  sliceName
}: Options) {
  dispatch({
    sliceName,
    type: AppNotificationStoreActionType.Clear
  });

  if (callback) {
    callback();
  }
}

export function useStoreClearActionDispatch (
  sliceName: string,
  {
    callback,
    dispatchType
  }: AppNotificationStoreClearActionOptions = {}
): AppNotificationStoreClearActionDispatch {
  const dispatch = useAppNotificationStoreDispatchContext();

  useEffect(
    () => {
      if (dispatchType === StoreDispatchType.MountOrUpdate) {
        runClearAction({
          callback,
          dispatch,
          sliceName
        });
      };

      return () => {
        if (dispatchType === StoreDispatchType.Unmount) {
          runClearAction({
            callback,
            dispatch,
            sliceName
          });
        }
      };
    },
    [
      callback,
      dispatch,
      dispatchType,
      sliceName
    ]
  );

  function run () {
    runClearAction({
      callback,
      dispatch,
      sliceName
    });
  }

  return useRef({
    run
  }).current;
}
