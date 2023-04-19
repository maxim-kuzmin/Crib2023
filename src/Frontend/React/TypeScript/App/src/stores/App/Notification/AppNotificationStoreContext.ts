import {
  type Dispatch,
  createContext,
  useContext,
} from 'react';
import { type AppNotificationStoreState } from '../../../app/Stores';
import { type AppNotificationStoreActionUnion } from './AppNotificationStoreActionUnion';

type ActionUnion = AppNotificationStoreActionUnion;
type StoreState = AppNotificationStoreState;
type StoreStateMap = Map<string, StoreState>;

export const AppNotificationStoreDispatchContext = createContext<Dispatch<ActionUnion> | null>(null);
export const AppNotificationStoreStateContext = createContext<StoreStateMap | null>(null);

export function useAppNotificationStoreDispatchContext () {
  return useContext(AppNotificationStoreDispatchContext)!;
}
export function useAppNotificationStoreStateContext (sliceName: string): StoreState {
  return useContext(AppNotificationStoreStateContext)!.get(sliceName)!;
}
