import { type StoreActionPayload, createStoreActionPayload } from '../../../../../../common';
import { type AppNotificationStoreSliceName } from '../../Slice';
import { type AppNotificationStoreSetActionResult } from './AppNotificationStoreSetActionResult';

export interface AppNotificationStoreSetActionPayload
  extends StoreActionPayload<AppNotificationStoreSliceName> {
  actionResult: AppNotificationStoreSetActionResult;
}

interface Options extends Omit<AppNotificationStoreSetActionPayload, 'actionResult'> {
  actionResult?: AppNotificationStoreSetActionResult;
}

export function createAppNotificationStoreSetActionPayload (
  options: Options
): AppNotificationStoreSetActionPayload {
  const base = createStoreActionPayload(options);

  const { actionResult } = options;

  return {
    ...base,
    actionResult: actionResult ?? null,
  };
}
