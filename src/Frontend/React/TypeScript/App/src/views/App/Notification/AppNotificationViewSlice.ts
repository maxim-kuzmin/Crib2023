import { type AppNotificationViewHooks } from '../..';
import {
  type AppNotificationStoreClearActionOptions,
  type AppNotificationStoreClearActionDispatch,
  type AppNotificationStoreHooks,
  AppNotificationStoreSliceName,
  type AppNotificationStoreSetActionDispatch,
  type AppNotificationStoreSetActionOptions,
  type AppNotificationStoreState
} from '../../../app/Stores';

type ClearActionDispatch = AppNotificationStoreClearActionDispatch;
type ClearActionOptions = AppNotificationStoreClearActionOptions;

type SetActionDispatch = AppNotificationStoreSetActionDispatch;
type SetActionOptions = AppNotificationStoreSetActionOptions;

type StoreState = AppNotificationStoreState;

export function createAppNotificationViewHooks (
  hooks: AppNotificationStoreHooks
): AppNotificationViewHooks {
  const sliceName = AppNotificationStoreSliceName.AppNotificationView;

  function useClearActionDispatch (options: ClearActionOptions): ClearActionDispatch {
    return hooks.useClearActionDispatch(sliceName, options);
  }

  function useSetActionDispatch (options: SetActionOptions): SetActionDispatch {
    return hooks.useSetActionDispatch(sliceName, options);
  }

  function useStoreState (): StoreState {
    return hooks.useStoreState(sliceName);
  }

  return {
    useClearActionDispatch,
    useSetActionDispatch,
    useStoreState
  };
}
