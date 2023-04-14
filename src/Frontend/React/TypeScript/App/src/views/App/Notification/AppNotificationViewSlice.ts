import {
  type AppNotificationStoreClearActionOptions,
  type AppNotificationViewHooks,
  type AppNotificationStoreSetActionOptions,
  type AppNotificationStoreHooks
} from '../../../all';
import { AppNotificationStoreSliceName } from '../../../app/Stores';

type ClearActionOptions = AppNotificationStoreClearActionOptions;
type SetActionOptions = AppNotificationStoreSetActionOptions;

export function createAppNotificationViewHooks (
  hooks: AppNotificationStoreHooks
): AppNotificationViewHooks {
  const sliceName = AppNotificationStoreSliceName.AppNotificationView;

  return {
    useDispatchToClear: (options: ClearActionOptions) => hooks.useDispatchToClear(sliceName, options),
    useDispatchToSet: (options: SetActionOptions) => hooks.useDispatchToSet(sliceName, options),
    useState: () => hooks.useState(sliceName)
  };
}
