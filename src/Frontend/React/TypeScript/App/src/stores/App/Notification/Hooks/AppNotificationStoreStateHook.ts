import { type AppNotificationStoreState } from '../../../../app';
import { useAppNotificationStoreStateContext } from '../AppNotificationStoreContext';

export function useStoreState (sliceName: string): AppNotificationStoreState {
  return useAppNotificationStoreStateContext(sliceName);
}
