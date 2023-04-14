import {
  type Dispatch,
  createContext,
  useContext,
} from 'react';
import { type AppNotificationStoreState } from '../../../app/Stores';
import { type AppNotificationStoreActionUnion } from './AppNotificationStoreActionUnion';

type ActionUnion = AppNotificationStoreActionUnion;
type State = AppNotificationStoreState;
type StateMap = Map<string, State>;

export const AppNotificationStoreDispatchContext = createContext<Dispatch<ActionUnion> | null>(null);
export const AppNotificationStoreStateContext = createContext<StateMap | null>(null);

export function useAppNotificationStoreDispatchContext () {
  return useContext(AppNotificationStoreDispatchContext)!;
}
export function useAppNotificationStoreStateContext (sliceName: string): State {
  return useContext(AppNotificationStoreStateContext)!.get(sliceName)!;
}
