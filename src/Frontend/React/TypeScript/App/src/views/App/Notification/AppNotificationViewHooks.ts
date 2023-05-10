import {
  type AppNotificationStoreClearActionInput,
  type AppNotificationStoreClearActionOutput,
  type AppNotificationStoreSetActionInput,
  type AppNotificationStoreSetActionOutput,
  type AppNotificationStoreHooks,
  AppNotificationStoreOwner,
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
  const owner = AppNotificationStoreOwner.AppNotificationView;

  function useStoreClearActionOutput (
    input: AppNotificationStoreClearActionInput
  ): AppNotificationStoreClearActionOutput {
    return hooksOfAppNotificationStore.useStoreClearActionOutput(owner, input);
  }

  function useStoreSetActionOutput (
    input: AppNotificationStoreSetActionInput
  ): AppNotificationStoreSetActionOutput {
    return hooksOfAppNotificationStore.useStoreSetActionOutput(owner, input);
  }

  function useStoreState (): AppNotificationStoreState {
    return hooksOfAppNotificationStore.useStoreState(owner);
  }

  return {
    useStoreClearActionOutput,
    useStoreSetActionOutput,
    useStoreState
  };
}
