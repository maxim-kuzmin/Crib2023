import {
  type AppNotificationStoreClearActionInput,
  type AppNotificationStoreClearActionOutput,
  type AppNotificationStoreSetActionInput,
  type AppNotificationStoreSetActionOutput,
  type AppNotificationStoreState,
} from '../../../app/Stores';

export interface AppNotificationViewHooks {
  readonly useClearActionOutput: (input: AppNotificationStoreClearActionInput) => AppNotificationStoreClearActionOutput;
  readonly useSetActionOutput: (input: AppNotificationStoreSetActionInput) => AppNotificationStoreSetActionOutput;
  readonly useStoreState: () => AppNotificationStoreState;
}
