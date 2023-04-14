import {
  type AppNotificationStoreClearActionOptions,
  type AppNotificationStoreClearActionDispatch,
  type AppNotificationStoreState,
  type AppNotificationStoreSetActionOptions,
  type AppNotificationStoreSetActionDispatch
} from '../../../../all';

type ClearActionDispatch = AppNotificationStoreClearActionDispatch;
type ClearActionOptions = AppNotificationStoreClearActionOptions;

type SetActionDispatch = AppNotificationStoreSetActionDispatch;
type SetActionOptions = AppNotificationStoreSetActionOptions;

export interface AppNotificationStoreHooks {
  readonly useDispatchToClear: (sliceName: string, options: ClearActionOptions) => ClearActionDispatch;
  readonly useDispatchToSet: (sliceName: string, options: SetActionOptions) => SetActionDispatch;
  readonly useState: (sliceName: string) => AppNotificationStoreState;
}
