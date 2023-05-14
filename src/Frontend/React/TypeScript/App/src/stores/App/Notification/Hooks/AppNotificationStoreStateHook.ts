import { type AppNotificationStoreOwner, type AppNotificationStoreState } from '../../../../features';
import { useAppNotificationStoreState } from '../AppNotificationStoreHooks';

export function useStoreState (owner: AppNotificationStoreOwner): AppNotificationStoreState {
  return useAppNotificationStoreState(owner);
}
