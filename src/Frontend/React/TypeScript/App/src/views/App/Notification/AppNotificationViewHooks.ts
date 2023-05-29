import {
  type AppNotificationStoreClearActionOutput,
  type AppNotificationStoreSetActionOutput,
  type AppNotificationStoreHooks,
  type AppNotificationStoreSliceHooks,
  AppNotificationStoreSliceName,
  type AppNotificationStoreState,
} from '../../../features';

export interface AppNotificationViewHooks extends AppNotificationStoreSliceHooks {}

interface Options {
  readonly hooksOfAppNotificationStore: AppNotificationStoreHooks;
}

export function createAppNotificationViewHooks ({
  hooksOfAppNotificationStore
}: Options): AppNotificationViewHooks {
  const sliceName = AppNotificationStoreSliceName.Default;

  function useStoreClearActionOutput (): AppNotificationStoreClearActionOutput {
    return hooksOfAppNotificationStore.useStoreClearActionOutput(sliceName);
  }

  function useStoreSetActionOutput (): AppNotificationStoreSetActionOutput {
    return hooksOfAppNotificationStore.useStoreSetActionOutput(sliceName);
  }

  function useStoreState (): AppNotificationStoreState {
    return hooksOfAppNotificationStore.useStoreState(sliceName);
  }

  return {
    useStoreClearActionOutput,
    useStoreSetActionOutput,
    useStoreState
  };
}
