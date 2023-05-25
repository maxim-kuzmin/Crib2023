import { type AppNotificationStoreSetActionResult } from './Actions';

export interface AppNotificationStoreState {
  resultOfSetAction: AppNotificationStoreSetActionResult;
}

export function createAppNotificationStoreState (
  options?: Partial<AppNotificationStoreState>
): AppNotificationStoreState {
  return {
    resultOfSetAction: options?.resultOfSetAction ?? null,
  };
}
