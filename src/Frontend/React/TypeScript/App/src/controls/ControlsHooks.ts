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

interface Options {
  readonly pathOfConfirmControlResource: string;
}

class Implementation implements ControlsHooks {
  readonly Confirm: ConfirmControlHooks;
  readonly Notification: NotificationControlHooks;
  readonly Table: TableControlHooks;

  constructor ({
    pathOfConfirmControlResource,
  }: Options) {
    this.Confirm = createConfirmControlHooks({ pathOfConfirmControlResource });
    this.Notification = createNotificationControlHooks();
    this.Table = createTableControlHooks();
  }
}

export function createControlsHooks (options: Options): ControlsHooks {
  return new Implementation(options);
}
