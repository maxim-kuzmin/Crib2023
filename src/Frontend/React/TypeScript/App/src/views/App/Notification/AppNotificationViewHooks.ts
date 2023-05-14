import {
  type AppNotificationStoreClearActionInput,
  type AppNotificationStoreClearActionOutput,
  type AppNotificationStoreSetActionInput,
  type AppNotificationStoreSetActionOutput,
  type AppNotificationStoreHooks,
  AppNotificationStoreSlice,
  type AppNotificationStoreState,
} from '../../../features';

export interface AppNotificationViewHooks {
  readonly useStoreClearActionOutput: (
    input: AppNotificationStoreClearActionInput
  ) => AppNotificationStoreClearActionOutput;

  readonly useStoreSetActionOutput: (
    input: AppNotificationStoreSetActionInput
  ) => AppNotificationStoreSetActionOutput;

  readonly useStoreState: () => AppNotificationStoreState;
}

interface Options {
  readonly hooksOfAppNotificationStore: AppNotificationStoreHooks;
}

export function createAppNotificationViewHooks ({
  hooksOfAppNotificationStore
}: Options): AppNotificationViewHooks {
  const slice = AppNotificationStoreSlice.Default;

  function useStoreClearActionOutput (
    input: AppNotificationStoreClearActionInput
  ): AppNotificationStoreClearActionOutput {
    return hooksOfAppNotificationStore.useStoreClearActionOutput(slice, input);
  }

  function useStoreSetActionOutput (
    input: AppNotificationStoreSetActionInput
  ): AppNotificationStoreSetActionOutput {
    return hooksOfAppNotificationStore.useStoreSetActionOutput(slice, input);
  }

  function useStoreState (): AppNotificationStoreState {
    return hooksOfAppNotificationStore.useStoreState(slice);
  }

  return {
    useStoreClearActionOutput,
    useStoreSetActionOutput,
    useStoreState
  };
}
