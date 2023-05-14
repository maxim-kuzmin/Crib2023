import {
  type AppNotificationStoreClearActionInput,
  type AppNotificationStoreClearActionOutput,
  type AppNotificationStoreSetActionInput,
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

  function useStoreClearActionOutput (
    input: AppNotificationStoreClearActionInput
  ): AppNotificationStoreClearActionOutput {
    return hooksOfAppNotificationStore.useStoreClearActionOutput(sliceName, input);
  }

  function useStoreSetActionOutput (
    input: AppNotificationStoreSetActionInput
  ): AppNotificationStoreSetActionOutput {
    return hooksOfAppNotificationStore.useStoreSetActionOutput(sliceName, input);
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
