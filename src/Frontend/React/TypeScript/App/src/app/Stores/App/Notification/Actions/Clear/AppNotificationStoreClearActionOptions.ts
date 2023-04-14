import { type StoreActionOptions } from '../../../../../../common';
import { type AppNotificationStoreClearActionCallback } from './AppNotificationStoreClearActionCallback';

export interface AppNotificationStoreClearActionOptions extends StoreActionOptions {
  callback?: AppNotificationStoreClearActionCallback;
}
