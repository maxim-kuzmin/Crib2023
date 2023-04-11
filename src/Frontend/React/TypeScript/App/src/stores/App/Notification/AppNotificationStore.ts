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

function createClearAction (): ClearAction {
  return {
    type: AppNotificationStoreActionType.Clear
  };
};

function createSetAction (payload: SetActionPayload): SetAction {
  return {
    type: AppNotificationStoreActionType.Set,
    payload
  };
};

function useDispatchContext (): Dispatch<ActionUnion> {
  return useAppNotificationStoreDispatchContext();
}

function useState (): State {
  return useAppNotificationStoreStateContext();
}

// <---Store--- //

function runDispatchToClear (
  dispatch: Dispatch<ActionUnion>,
  callback: ClearActionCallback | null
) {
  dispatch(createClearAction());

  if (callback) {
    callback();
  }
}

function runDispatchToSet (
  dispatch: Dispatch<ActionUnion>,
  callback: SetActionCallback | null,
  payload: SetActionPayload
) {
  dispatch(createSetAction(payload));

  if (callback) {
    callback(payload);
  }
}

function useDispatchToClear ({
  dispatchType,
  callback
}: ClearActionOptions = {}): ClearActionDispatch {
  const dispatch = useDispatchContext();

  const callbackInner = callback ?? null;

  useEffect(() => {
    if (dispatchType === StoreDispatchType.MountOrUpdate) {
      runDispatchToClear(dispatch, callbackInner);
    };

    return () => {
      if (dispatchType === StoreDispatchType.Unmount) {
        runDispatchToClear(dispatch, callbackInner);
      }
    };
  }, [dispatch, dispatchType, callbackInner]);

  return useRef({
    run: () => {
      runDispatchToClear(dispatch, callbackInner);
    }
  }).current;
}

function useDispatchToSet ({
  dispatchType,
  callback,
  payload
}: SetActionOptions = {}): SetActionDispatch {
  const dispatch = useDispatchContext();

  const callbackInner = callback ?? null;

  const payloadInner = payload ?? null;

  useEffect(() => {
    if (dispatchType === StoreDispatchType.MountOrUpdate) {
      runDispatchToSet(dispatch, callbackInner, payloadInner);
    };

    return () => {
      if (dispatchType === StoreDispatchType.Unmount) {
        runDispatchToSet(dispatch, callbackInner, payloadInner);
      }
    };
  }, [dispatch, dispatchType, callbackInner, payloadInner]);

  return useRef({
    run: (payload: SetActionPayload) => {
      runDispatchToSet(dispatch, callbackInner, payload);
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
