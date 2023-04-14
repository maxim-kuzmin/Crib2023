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

type State = AppNotificationStoreState;

export interface AppNotificationStoreHooks {
  readonly useDispatchToClear: (sliceName: string, options: ClearActionOptions) => ClearActionDispatch;
  readonly useDispatchToSet: (sliceName: string, options: SetActionOptions) => SetActionDispatch;
  readonly useState: (sliceName: string) => State;
}
