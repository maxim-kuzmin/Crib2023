import { type AppNotificationStoreState } from '../../../../app/Stores';
import { useAppNotificationStoreStateContext } from '../AppNotificationStoreContext';

export function useStoreState (sliceName: string): AppNotificationStoreState {
  return useAppNotificationStoreStateContext(sliceName);
}
