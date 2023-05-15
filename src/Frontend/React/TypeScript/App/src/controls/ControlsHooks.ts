import {
  type ConfirmControlHooks,
  type NotificationControlHooks,
  type ControlsHooks,
  type TableControlHooks,
} from '../common';
import {
  createConfirmControlHooks,
  createNotificationControlHooks,
  createTableControlHooks,
} from '.';

class Implementation implements ControlsHooks {
  readonly Confirm: ConfirmControlHooks;
  readonly Notification: NotificationControlHooks;
  readonly Table: TableControlHooks;

  constructor () {
    this.Confirm = createConfirmControlHooks();
    this.Notification = createNotificationControlHooks();
    this.Table = createTableControlHooks();
  }
}

export function createControlsHooks (): ControlsHooks {
  return new Implementation();
}
