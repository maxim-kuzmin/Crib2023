import { type Dispatch, createContext, } from 'react';
import { type AppNotificationStoreStateMap } from '../../../../features';
import { type AppNotificationStoreActionUnion } from '../AppNotificationStoreActionUnion';

export const AppNotificationStoreDispatchContext = createContext<
  Dispatch<AppNotificationStoreActionUnion> | null
>(null);

export const AppNotificationStoreStateContext = createContext<
  AppNotificationStoreStateMap | null
>(null);
