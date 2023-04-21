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
  readonly useClearActionDispatch: (
    sliceName: string,
    options: AppNotificationStoreClearActionOptions
  ) => AppNotificationStoreClearActionDispatch;

  readonly useClearActionOutput: (
    sliceName: string,
    input: AppNotificationStoreClearActionInput
  ) => AppNotificationStoreClearActionOutput;

  readonly useSetActionDispatch: (
    sliceName: string,
    options: AppNotificationStoreSetActionOptions
  ) => AppNotificationStoreSetActionDispatch;

  readonly useSetActionOutput: (
    sliceName: string,
    input: AppNotificationStoreSetActionInput
  ) => AppNotificationStoreSetActionOutput;

  readonly useStoreState: (sliceName: string) => AppNotificationStoreState;
}
