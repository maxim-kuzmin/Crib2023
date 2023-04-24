import {
  type AppNotificationStoreClearActionInput,
  type AppNotificationStoreClearActionOutput,
  type AppNotificationStoreSetActionInput,
  type AppNotificationStoreSetActionOutput,
  type AppNotificationStoreState,
} from '../../../app/Stores';

export interface AppNotificationViewHooks {
  readonly useStoreClearActionOutput: (
    input: AppNotificationStoreClearActionInput
  ) => AppNotificationStoreClearActionOutput;

  readonly useStoreSetActionOutput: (
    input: AppNotificationStoreSetActionInput
  ) => AppNotificationStoreSetActionOutput;

  readonly useStoreState: () => AppNotificationStoreState;
}
