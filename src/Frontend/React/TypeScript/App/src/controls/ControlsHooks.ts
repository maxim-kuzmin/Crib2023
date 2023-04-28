import { type ControlsHooks } from '../common';
import { createConfirmControlHooks } from './Confirm/ConfirmControlHooks';
import { createNotificationControlHooks } from './Notification/NotificationControlHooks';
import { createTableControlHooks } from './Table/TableControlHooks';

export function createControlsHooks (): ControlsHooks {
  const hooksOfConfirmControl = createConfirmControlHooks();
  const hooksOfNotificationControl = createNotificationControlHooks();
  const hooksOfTableControl = createTableControlHooks();

  return {
    Confirm: hooksOfConfirmControl,
    Notification: hooksOfNotificationControl,
    Table: hooksOfTableControl
  };
}
