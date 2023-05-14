import { type AppNotificationStoreSlice, type AppNotificationStoreState } from '../../../../features';
import { useAppNotificationStoreState } from '../AppNotificationStoreHooks';

export function useStoreState (slice: AppNotificationStoreSlice): AppNotificationStoreState {
  return useAppNotificationStoreState(slice);
}
