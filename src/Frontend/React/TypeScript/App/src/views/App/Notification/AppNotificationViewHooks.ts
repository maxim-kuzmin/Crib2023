import {
  type AppNotificationStoreClearActionDispatch,
  type AppNotificationStoreClearActionOptions,
  type AppNotificationStoreSetActionDispatch,
  type AppNotificationStoreSetActionOptions,
  type AppNotificationStoreState
} from '../../../app/Stores';

type ClearActionDispatch = AppNotificationStoreClearActionDispatch;
type ClearActionOptions = AppNotificationStoreClearActionOptions;

type SetActionDispatch = AppNotificationStoreSetActionDispatch;
type SetActionOptions = AppNotificationStoreSetActionOptions;

type StoreState = AppNotificationStoreState;

export interface AppNotificationViewHooks {
  readonly useClearActionDispatch: (options: ClearActionOptions) => ClearActionDispatch;
  readonly useSetActionDispatch: (options: SetActionOptions) => SetActionDispatch;
  readonly useStoreState: () => StoreState;
}
