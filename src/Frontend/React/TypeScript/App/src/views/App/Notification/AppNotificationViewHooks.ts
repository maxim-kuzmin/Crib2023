import {
  type AppNotificationStoreClearActionInput,
  type AppNotificationStoreClearActionOutput,
  type AppNotificationStoreSetActionInput,
  type AppNotificationStoreSetActionOutput,
  type AppNotificationStoreHooks,
  AppNotificationStoreSliceName,
  type AppNotificationStoreState,
} from '../../../app';

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
  const sliceName = AppNotificationStoreSliceName.AppNotificationView;

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
