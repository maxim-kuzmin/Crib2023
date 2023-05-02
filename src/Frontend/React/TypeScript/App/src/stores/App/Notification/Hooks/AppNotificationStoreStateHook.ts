import { type AppNotificationStoreState } from '../../../../features';
import { useAppNotificationStoreStateContext } from '../AppNotificationStoreContext';

export function useStoreState (sliceName: string): AppNotificationStoreState {
  return useAppNotificationStoreStateContext(sliceName);
}
