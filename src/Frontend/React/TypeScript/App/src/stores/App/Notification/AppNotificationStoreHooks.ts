import { type Dispatch, useContext } from 'react';
import {
  type AppNotificationStoreState,
  type AppNotificationStoreHooks,
  type AppNotificationStoreSliceName
} from '../../../features';
import { useStoreClearActionOutput } from './Hooks/Actions/Clear/AppNotificationStoreClearActionOutputHook';
import { useStoreSetActionOutput } from './Hooks/Actions/Set/AppNotificationStoreSetActionOutputHook';
import { useStoreState } from './Hooks/AppNotificationStoreStateHook';
import {
  AppNotificationStoreDispatchContext,
  AppNotificationStoreStateContext,
  type AppNotificationStoreActionUnion,
} from '.';

export function createAppNotificationStoreHooks (): AppNotificationStoreHooks {
  return {
    useStoreClearActionOutput,
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
  return useContext(AppNotificationStoreStateContext)![sliceName];
}
