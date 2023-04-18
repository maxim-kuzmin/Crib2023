import {
  type AppNotificationStoreSetActionDispatch,
  type AppNotificationStoreClearActionDispatch,
  type AppNotificationStoreClearActionOptions,
  type AppNotificationStoreSetActionOptions
} from './Actions';
import { type AppNotificationStoreState } from './AppNotificationStoreState';

type ClearActionDispatch = AppNotificationStoreClearActionDispatch;
type ClearActionOptions = AppNotificationStoreClearActionOptions;

type SetActionDispatch = AppNotificationStoreSetActionDispatch;
type SetActionOptions = AppNotificationStoreSetActionOptions;

type StoreState = AppNotificationStoreState;

export interface AppNotificationStoreHooks {
  readonly useClearActionDispatch: (sliceName: string, options: ClearActionOptions) => ClearActionDispatch;
  readonly useSetActionDispatch: (sliceName: string, options: SetActionOptions) => SetActionDispatch;
  readonly useStoreState: (sliceName: string) => StoreState;
}
