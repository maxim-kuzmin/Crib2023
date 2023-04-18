import { type Dispatch, useEffect, useRef } from 'react';
import { type AppNotificationStoreActionUnion } from './AppNotificationStoreActionUnion';
import { type AppNotificationStoreClearAction, type AppNotificationStoreSetAction } from './Actions';
import {
  type AppNotificationStoreClearActionCallback,
  type AppNotificationStoreClearActionDispatch,
  type AppNotificationStoreClearActionOptions,
  type AppNotificationStoreHooks,
  type AppNotificationStoreSetActionCallback,
  type AppNotificationStoreSetActionDispatch,
  type AppNotificationStoreSetActionOptions,
  type AppNotificationStoreSetActionPayload,
  type AppNotificationStoreState
} from '../../../app/Stores';
import { AppNotificationStoreActionType } from './AppNotificationStoreActionType';
import {
  useAppNotificationStoreDispatchContext,
  useAppNotificationStoreStateContext
} from './AppNotificationStoreContext';
import { StoreDispatchType } from '../../../common';

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

type StoreState = AppNotificationStoreState;

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

function useStoreState (sliceName: string): StoreState {
  return useAppNotificationStoreStateContext(sliceName);
}

// <---Store--- //

interface RunClearActionOptions {
  readonly callback?: ClearActionCallback;
  readonly dispatch: Dispatch<ActionUnion>;
  readonly sliceName: string;
}

function runClearAction ({
  callback,
  dispatch,
  sliceName
}: RunClearActionOptions) {
  dispatch(createClearAction(sliceName));

  if (callback) {
    callback();
  }
}

interface RunSetActionOptions {
  readonly callback?: SetActionCallback;
  readonly dispatch: Dispatch<ActionUnion>;
  readonly payload: SetActionPayload;
  readonly sliceName: string;
}

function runSetAction ({
  callback,
  dispatch,
  payload,
  sliceName
}: RunSetActionOptions) {
  dispatch(createSetAction(sliceName, payload));

  if (callback) {
    callback(payload);
  }
}

function useClearActionDispatch (
  sliceName: string,
  {
    callback,
    dispatchType
  }: ClearActionOptions
): ClearActionDispatch {
  const dispatch = useDispatchContext();

  useEffect(() => {
    if (dispatchType === StoreDispatchType.MountOrUpdate) {
      runClearAction({ sliceName, dispatch, callback });
    };

    return () => {
      if (dispatchType === StoreDispatchType.Unmount) {
        runClearAction({ sliceName, dispatch, callback });
      }
    };
  }, [sliceName, dispatch, dispatchType, callback]);

  return useRef({
    run: () => {
      runClearAction({ sliceName, dispatch, callback });
    }
  }).current;
}

function useSetActionDispatch (
  sliceName: string,
  {
    callback,
    dispatchType,
    payload
  }: SetActionOptions
): SetActionDispatch {
  const dispatch = useDispatchContext();

  const payloadInner = payload ?? null;

  useEffect(() => {
    if (dispatchType === StoreDispatchType.MountOrUpdate) {
      runSetAction({ sliceName, dispatch, callback, payload: payloadInner });
    };

    return () => {
      if (dispatchType === StoreDispatchType.Unmount) {
        runSetAction({ sliceName, dispatch, callback, payload: payloadInner });
      }
    };
  }, [sliceName, dispatch, dispatchType, callback, payloadInner]);

  return useRef({
    run: (payload: SetActionPayload) => {
      runSetAction({ sliceName, dispatch, callback, payload });
    }
  }).current;
}

export function createAppNotificationStoreHooks (): AppNotificationStoreHooks {
  return {
    useClearActionDispatch,
    useSetActionDispatch,
    useStoreState
  };
}
