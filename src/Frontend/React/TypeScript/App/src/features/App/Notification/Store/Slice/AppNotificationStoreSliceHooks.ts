import {
  type AppNotificationStoreClearActionOutput,
  type AppNotificationStoreSetActionOutput
} from '../Actions';
import { type AppNotificationStoreState } from '../AppNotificationStoreState';

export interface AppNotificationStoreSliceHooks {
  readonly useStoreClearActionOutput: () => AppNotificationStoreClearActionOutput;

  readonly useStoreSetActionOutput: () => AppNotificationStoreSetActionOutput;

  readonly useStoreState: () => AppNotificationStoreState;
}
