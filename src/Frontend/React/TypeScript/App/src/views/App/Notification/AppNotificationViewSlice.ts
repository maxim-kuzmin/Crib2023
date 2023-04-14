import { type AppNotificationViewHooks } from '../..';
import {
  type AppNotificationStoreClearActionOptions,
  type AppNotificationStoreHooks,
  type AppNotificationStoreSetActionOptions,
  AppNotificationStoreSliceName
} from '../../../app/Stores';

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
