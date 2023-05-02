import { type AppNotificationStoreState } from '../../../../features';
import { useAppNotificationStoreState } from '../AppNotificationStoreHooks';

export function useStoreState (sliceName: string): AppNotificationStoreState {
  return useAppNotificationStoreState(sliceName);
}
