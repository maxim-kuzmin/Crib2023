import { type AppNotificationStoreSliceName, type AppNotificationStoreState } from '../../../../features';
import { useAppNotificationStoreState } from '../AppNotificationStoreHooks';

export function useStoreState (sliceName: AppNotificationStoreSliceName): AppNotificationStoreState {
  return useAppNotificationStoreState(sliceName);
}
