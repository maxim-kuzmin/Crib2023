import {
  type AppNotificationStoreClearActionOutput,
  type AppNotificationStoreSetActionOutput
} from './Actions';
import { type AppNotificationStoreSliceName } from './Slice';
import { type AppNotificationStoreState } from './AppNotificationStoreState';

export interface AppNotificationStoreHooks {
  readonly useStoreClearActionOutput: (
    sliceName: AppNotificationStoreSliceName
  ) => AppNotificationStoreClearActionOutput;

  readonly useStoreSetActionOutput: (
    sliceName: AppNotificationStoreSliceName
  ) => AppNotificationStoreSetActionOutput;

  readonly useStoreState: (sliceName: AppNotificationStoreSliceName) => AppNotificationStoreState;
}
