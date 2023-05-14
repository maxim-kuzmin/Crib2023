import { type Dispatch, useContext } from 'react';
import {
  type AppNotificationStoreState,
  type AppNotificationStoreHooks,
  type AppNotificationStoreSliceName
} from '../../../features';
import { useStoreClearActionDispatch } from './Hooks/Actions/Clear/AppNotificationStoreClearActionDispatchHook';
import { useStoreClearActionOutput } from './Hooks/Actions/Clear/AppNotificationStoreClearActionOutputHook';
import { useStoreSetActionDispatch } from './Hooks/Actions/Set/AppNotificationStoreSetActionDispatchHook';
import { useStoreSetActionOutput } from './Hooks/Actions/Set/AppNotificationStoreSetActionOutputHook';
import { useStoreState } from './Hooks/AppNotificationStoreStateHook';
import {
  AppNotificationStoreDispatchContext,
  AppNotificationStoreStateContext,
  type AppNotificationStoreActionUnion,
} from '.';

export function createAppNotificationStoreHooks (): AppNotificationStoreHooks {
  return {
    useStoreClearActionDispatch,
    useStoreClearActionOutput,
    useStoreSetActionDispatch,
    useStoreSetActionOutput,
    useStoreState
  };
}

export function useAppNotificationStoreDispatch (): Dispatch<AppNotificationStoreActionUnion> {
  return useContext(AppNotificationStoreDispatchContext)!;
}

export function useAppNotificationStoreState (
  sliceName: AppNotificationStoreSliceName
): AppNotificationStoreState {
  return useContext(AppNotificationStoreStateContext)!.get(sliceName)!;
}
