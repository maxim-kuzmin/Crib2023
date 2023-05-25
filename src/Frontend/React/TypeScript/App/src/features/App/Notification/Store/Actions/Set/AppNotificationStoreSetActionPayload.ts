import { type AppNotificationStoreSetActionResult } from './AppNotificationStoreSetActionResult';

export interface AppNotificationStoreSetActionPayload {
  actionResult: AppNotificationStoreSetActionResult;
}

export function createAppNotificationStoreSetActionPayload (
  options?: Partial<AppNotificationStoreSetActionPayload>
): AppNotificationStoreSetActionPayload {
  return {
    actionResult: options?.actionResult ?? null,
  };
}
