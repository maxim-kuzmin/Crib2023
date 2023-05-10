import { type AppNotificationStoreState } from '../../../../features';
import { useAppNotificationStoreState } from '../AppNotificationStoreHooks';

export function useStoreState (storeKey: string): AppNotificationStoreState {
  return useAppNotificationStoreState(storeKey);
}
