import { StoreDispatchType } from '../../../../../../common';
import {
  type AppNotificationStoreClearActionOutput,
  type AppNotificationStoreSliceName,
} from '../../../../../../features';
import { useStoreClearActionDispatch } from './AppNotificationStoreClearActionDispatchHook';

export function useStoreClearActionOutput (
  sliceName: AppNotificationStoreSliceName
): AppNotificationStoreClearActionOutput {
  const dispatchOfClearAction = useStoreClearActionDispatch(
    sliceName,
    {
      dispatchType: StoreDispatchType.Unmount
    }
  );

  return {
    dispatchOfClearAction
  };
}
