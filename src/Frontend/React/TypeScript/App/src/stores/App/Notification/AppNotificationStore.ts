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
  type AppNotificationStoreState
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

interface RunDispatchToClearOptions {
  readonly callback?: ClearActionCallback;
  readonly dispatch: Dispatch<ActionUnion>;
  readonly sliceName: string;
}

function runDispatchToClear ({
  callback,
  dispatch,
  sliceName
}: RunDispatchToClearOptions) {
  dispatch(createClearAction(sliceName));

  if (callback) {
    callback();
  }
}

interface RunDispatchToSetOptions {
  readonly callback?: SetActionCallback;
  readonly dispatch: Dispatch<ActionUnion>;
  readonly payload: SetActionPayload;
  readonly sliceName: string;
}

function runDispatchToSet ({
  callback,
  dispatch,
  payload,
  sliceName
}: RunDispatchToSetOptions) {
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

  useEffect(() => {
    if (dispatchType === StoreDispatchType.MountOrUpdate) {
      runDispatchToClear({ sliceName, dispatch, callback });
    };

    return () => {
      if (dispatchType === StoreDispatchType.Unmount) {
        runDispatchToClear({ sliceName, dispatch, callback });
      }
    };
  }, [sliceName, dispatch, dispatchType, callback]);

  return useRef({
    run: () => {
      runDispatchToClear({ sliceName, dispatch, callback });
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

  const payloadInner = payload ?? null;

  useEffect(() => {
    if (dispatchType === StoreDispatchType.MountOrUpdate) {
      runDispatchToSet({ sliceName, dispatch, callback, payload: payloadInner });
    };

    return () => {
      if (dispatchType === StoreDispatchType.Unmount) {
        runDispatchToSet({ sliceName, dispatch, callback, payload: payloadInner });
      }
    };
  }, [sliceName, dispatch, dispatchType, callback, payloadInner]);

  return useRef({
    run: (payload: SetActionPayload) => {
      runDispatchToSet({ sliceName, dispatch, callback, payload });
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