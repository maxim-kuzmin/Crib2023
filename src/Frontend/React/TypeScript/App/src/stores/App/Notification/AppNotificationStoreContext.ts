import {
  type Dispatch,
  createContext,
  useContext,
} from 'react';
import { type AppNotificationStoreState } from '../../../app/Stores';
import { type AppNotificationStoreActionUnion } from './AppNotificationStoreActionUnion';

export const AppNotificationStoreDispatchContext =
  createContext<Dispatch<AppNotificationStoreActionUnion> | null>(null);

export const AppNotificationStoreStateContext = createContext<Map<string, AppNotificationStoreState> | null>(null);

export function useAppNotificationStoreDispatchContext () {
  return useContext(AppNotificationStoreDispatchContext)!;
}
export function useAppNotificationStoreStateContext (sliceName: string): AppNotificationStoreState {
  return useContext(AppNotificationStoreStateContext)!.get(sliceName)!;
}
