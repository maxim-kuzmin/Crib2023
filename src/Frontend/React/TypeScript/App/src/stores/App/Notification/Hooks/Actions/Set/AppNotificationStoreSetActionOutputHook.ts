import {
  type AppNotificationStoreSetActionOutput,
  type AppNotificationStoreSliceName,
} from '../../../../../../features';
import { useStoreState } from '../../AppNotificationStoreStateHook';
import { useStoreSetActionDispatch } from './AppNotificationStoreSetActionDispatchHook';

export function useStoreSetActionOutput (
  sliceName: AppNotificationStoreSliceName
): AppNotificationStoreSetActionOutput {
  const dispatchOfSetAction = useStoreSetActionDispatch(sliceName);

  const { resultOfSetAction } = useStoreState(sliceName);

  return {
    dispatchOfSetAction,
    resultOfSetAction,
  };
}
