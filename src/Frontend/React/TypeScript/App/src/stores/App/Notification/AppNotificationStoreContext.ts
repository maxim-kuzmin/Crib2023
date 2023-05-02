import { type Dispatch, createContext, } from 'react';
import { type AppNotificationStoreState } from '../../../features';
import { type AppNotificationStoreActionUnion } from './AppNotificationStoreActionUnion';

export const AppNotificationStoreDispatchContext = createContext<
  Dispatch<AppNotificationStoreActionUnion> | null
>(null);

export const AppNotificationStoreStateContext = createContext<
  Map<string, AppNotificationStoreState> | null
>(null);
