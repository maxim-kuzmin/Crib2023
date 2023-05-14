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
import { type AppNotificationStoreSlice } from './AppNotificationStoreSlice';
import { type AppNotificationStoreState } from './AppNotificationStoreState';

export interface AppNotificationStoreHooks {
  readonly useStoreClearActionDispatch: (
    slice: AppNotificationStoreSlice,
    options: AppNotificationStoreClearActionOptions
  ) => AppNotificationStoreClearActionDispatch;

  readonly useStoreClearActionOutput: (
    slice: AppNotificationStoreSlice,
    input: AppNotificationStoreClearActionInput
  ) => AppNotificationStoreClearActionOutput;

  readonly useStoreSetActionDispatch: (
    slice: AppNotificationStoreSlice,
    options: AppNotificationStoreSetActionOptions
  ) => AppNotificationStoreSetActionDispatch;

  readonly useStoreSetActionOutput: (
    slice: AppNotificationStoreSlice,
    input: AppNotificationStoreSetActionInput
  ) => AppNotificationStoreSetActionOutput;

  readonly useStoreState: (slice: AppNotificationStoreSlice) => AppNotificationStoreState;
}
