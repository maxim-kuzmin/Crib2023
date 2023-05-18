import { type AppNotificationStoreSetActionPayload } from './Actions';

export interface AppNotificationStoreState {
  payloadOfSetAction: AppNotificationStoreSetActionPayload;
}

export function createAppNotificationStoreState (
  options?: Partial<AppNotificationStoreState>
): AppNotificationStoreState {
  return {
    payloadOfSetAction: options?.payloadOfSetAction ?? null,
  };
}
