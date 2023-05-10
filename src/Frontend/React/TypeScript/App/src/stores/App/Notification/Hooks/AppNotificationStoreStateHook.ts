import { type AppNotificationStoreState } from '../../../../features';
import { useAppNotificationStoreState } from '../AppNotificationStoreHooks';

export function useStoreState (owner: string): AppNotificationStoreState {
  return useAppNotificationStoreState(owner);
}
