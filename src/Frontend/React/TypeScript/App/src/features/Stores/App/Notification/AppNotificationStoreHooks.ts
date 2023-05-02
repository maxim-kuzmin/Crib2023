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
import { type AppNotificationStoreState } from './AppNotificationStoreState';

export interface AppNotificationStoreHooks {
  readonly useStoreClearActionDispatch: (
    sliceName: string,
    options: AppNotificationStoreClearActionOptions
  ) => AppNotificationStoreClearActionDispatch;

  readonly useStoreClearActionOutput: (
    sliceName: string,
    input: AppNotificationStoreClearActionInput
  ) => AppNotificationStoreClearActionOutput;

  readonly useStoreSetActionDispatch: (
    sliceName: string,
    options: AppNotificationStoreSetActionOptions
  ) => AppNotificationStoreSetActionDispatch;

  readonly useStoreSetActionOutput: (
    sliceName: string,
    input: AppNotificationStoreSetActionInput
  ) => AppNotificationStoreSetActionOutput;

  readonly useStoreState: (sliceName: string) => AppNotificationStoreState;
}
