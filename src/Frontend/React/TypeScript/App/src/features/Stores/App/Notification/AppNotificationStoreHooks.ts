import {
  type AppNotificationStoreClearActionDispatch,
  type AppNotificationStoreClearActionInput,
  type AppNotificationStoreClearActionOptions,
  type AppNotificationStoreClearActionOutput,
  type AppNotificationStoreSetActionDispatch,
  type AppNotificationStoreSetActionInput,
  type AppNotificationStoreSetActionOptions,
  type AppNotificationStoreSetActionOutput
} from './Actions';
import { type AppNotificationStoreSliceName } from './Slice';
import { type AppNotificationStoreState } from './AppNotificationStoreState';

export interface AppNotificationStoreHooks {
  readonly useStoreClearActionDispatch: (
    sliceName: AppNotificationStoreSliceName,
    options: AppNotificationStoreClearActionOptions
  ) => AppNotificationStoreClearActionDispatch;

  readonly useStoreClearActionOutput: (
    sliceName: AppNotificationStoreSliceName,
    input: AppNotificationStoreClearActionInput
  ) => AppNotificationStoreClearActionOutput;

  readonly useStoreSetActionDispatch: (
    sliceName: AppNotificationStoreSliceName,
    options: AppNotificationStoreSetActionOptions
  ) => AppNotificationStoreSetActionDispatch;

  readonly useStoreSetActionOutput: (
    sliceName: AppNotificationStoreSliceName,
    input: AppNotificationStoreSetActionInput
  ) => AppNotificationStoreSetActionOutput;

  readonly useStoreState: (sliceName: AppNotificationStoreSliceName) => AppNotificationStoreState;
}
