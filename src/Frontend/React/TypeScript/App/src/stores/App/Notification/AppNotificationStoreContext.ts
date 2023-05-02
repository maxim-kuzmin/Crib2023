import {
  type Dispatch,
  createContext,
  useContext,
} from 'react';
import { type AppNotificationStoreState } from '../../../features';
import { type AppNotificationStoreActionUnion } from './AppNotificationStoreActionUnion';

export const AppNotificationStoreDispatchContext = createContext<
  Dispatch<AppNotificationStoreActionUnion> | null
>(null);

export function useAppNotificationStoreDispatchContext () {
  return useContext(AppNotificationStoreDispatchContext)!;
}

export const AppNotificationStoreStateContext = createContext<
  Map<string, AppNotificationStoreState> | null
>(null);

export function useAppNotificationStoreStateContext (
  sliceName: string
): AppNotificationStoreState {
  return useContext(AppNotificationStoreStateContext)!.get(sliceName)!;
}
