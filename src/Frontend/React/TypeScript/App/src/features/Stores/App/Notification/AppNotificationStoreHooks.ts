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
    owner: string,
    options: AppNotificationStoreClearActionOptions
  ) => AppNotificationStoreClearActionDispatch;

  readonly useStoreClearActionOutput: (
    owner: string,
    input: AppNotificationStoreClearActionInput
  ) => AppNotificationStoreClearActionOutput;

  readonly useStoreSetActionDispatch: (
    owner: string,
    options: AppNotificationStoreSetActionOptions
  ) => AppNotificationStoreSetActionDispatch;

  readonly useStoreSetActionOutput: (
    owner: string,
    input: AppNotificationStoreSetActionInput
  ) => AppNotificationStoreSetActionOutput;

  readonly useStoreState: (owner: string) => AppNotificationStoreState;
}
