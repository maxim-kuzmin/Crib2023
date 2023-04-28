import { type ConfirmControlHooks } from './Confirm';
import { type NotificationControlHooks } from './Notification';
import { type TableControlHooks } from './Table';

export interface ControlsHooks {
  readonly Confirm: ConfirmControlHooks;
  readonly Notification: NotificationControlHooks;
  readonly Table: TableControlHooks;
}
