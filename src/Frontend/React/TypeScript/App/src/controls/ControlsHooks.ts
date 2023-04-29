import { type ControlsHooks } from '../common';
import { createConfirmControlHooks } from './Confirm/ConfirmControlHooks';
import { createNotificationControlHooks } from './Notification/NotificationControlHooks';
import { createTableControlHooks } from './Table/TableControlHooks';

export function createControlsHooks (): ControlsHooks {
  const hooksOfConfirm = createConfirmControlHooks();
  const hooksOfNotification = createNotificationControlHooks();
  const hooksOfTable = createTableControlHooks();

  return {
    Confirm: hooksOfConfirm,
    Notification: hooksOfNotification,
    Table: hooksOfTable
  };
}
