import { type Dispatch, useEffect, useRef } from 'react';
import {
  StoreDispatchType,
  type AppNotificationStoreHooks,
  type AppNotificationStoreSetActionPayload,
  type AppNotificationStoreClearActionCallback,
  type AppNotificationStoreClearActionDispatch,
  type AppNotificationStoreClearActionOptions,
  type AppNotificationStoreSetActionCallback,
  type AppNotificationStoreSetActionDispatch,
  type AppNotificationStoreSetActionOptions,
  type AppNotificationStoreActionUnion,
  AppNotificationStoreActionType,
  type AppNotificationStoreClearAction,
  type AppNotificationStoreSetAction,
  useAppNotificationStoreDispatchContext,
  useAppNotificationStoreStateContext,
  type AppNotificationStoreState,
} from '../../../all';

// ---Store---> //

type ActionUnion = AppNotificationStoreActionUnion;

type ClearAction = AppNotificationStoreClearAction;
type ClearActionCallback = AppNotificationStoreClearActionCallback;
type ClearActionDispatch = AppNotificationStoreClearActionDispatch;
type ClearActionOptions = AppNotificationStoreClearActionOptions;

type SetAction = AppNotificationStoreSetAction;
type SetActionCallback = AppNotificationStoreSetActionCallback;
type SetActionDispatch = AppNotificationStoreSetActionDispatch;
type SetActionOptions = AppNotificationStoreSetActionOptions;
type SetActionPayload = AppNotificationStoreSetActionPayload;

type State = AppNotificationStoreState;

function createClearAction (sliceName: string): ClearAction {
  return {
    type: AppNotificationStoreActionType.Clear,
    sliceName
  };
};

function createSetAction (sliceName: string, payload: SetActionPayload): SetAction {
  return {
    type: AppNotificationStoreActionType.Set,
    payload,
    sliceName
  };
};

function useDispatchContext (): Dispatch<ActionUnion> {
  return useAppNotificationStoreDispatchContext();
}

function useState (sliceName: string): State {
  return useAppNotificationStoreStateContext(sliceName);
}

// <---Store--- //

function runDispatchToClear (
  sliceName: string,
  dispatch: Dispatch<ActionUnion>,
  callback: ClearActionCallback | null
) {
  dispatch(createClearAction(sliceName));

  if (callback) {
    callback();
  }
}

function runDispatchToSet (
  sliceName: string,
  dispatch: Dispatch<ActionUnion>,
  callback: SetActionCallback | null,
  payload: SetActionPayload
) {
  dispatch(createSetAction(sliceName, payload));

  if (callback) {
    callback(payload);
  }
}

function useDispatchToClear ({
  callback,
  dispatchType,
  sliceName
}: ClearActionOptions): ClearActionDispatch {
  const dispatch = useDispatchContext();

  const callbackInner = callback ?? null;

  useEffect(() => {
    if (dispatchType === StoreDispatchType.MountOrUpdate) {
      runDispatchToClear(sliceName, dispatch, callbackInner);
    };

    return () => {
      if (dispatchType === StoreDispatchType.Unmount) {
        runDispatchToClear(sliceName, dispatch, callbackInner);
      }
    };
  }, [sliceName, dispatch, dispatchType, callbackInner]);

  return useRef({
    run: () => {
      runDispatchToClear(sliceName, dispatch, callbackInner);
    }
  }).current;
}

function useDispatchToSet ({
  callback,
  dispatchType,
  payload,
  sliceName
}: SetActionOptions): SetActionDispatch {
  const dispatch = useDispatchContext();

  const callbackInner = callback ?? null;

  const payloadInner = payload ?? null;

  useEffect(() => {
    if (dispatchType === StoreDispatchType.MountOrUpdate) {
      runDispatchToSet(sliceName, dispatch, callbackInner, payloadInner);
    };

    return () => {
      if (dispatchType === StoreDispatchType.Unmount) {
        runDispatchToSet(sliceName, dispatch, callbackInner, payloadInner);
      }
    };
  }, [sliceName, dispatch, dispatchType, callbackInner, payloadInner]);

  return useRef({
    run: (payload: SetActionPayload) => {
      runDispatchToSet(sliceName, dispatch, callbackInner, payload);
    }
  }).current;
}

export function createAppNotificationStoreHooks (): AppNotificationStoreHooks {
  return {
    useDispatchToClear,
    useDispatchToSet,
    useState
  };
}
