import {
  type AppNotificationStoreClearActionInput,
  type AppNotificationStoreClearActionOutput,
  type AppNotificationStoreSetActionInput,
  type AppNotificationStoreSetActionOutput,
  type AppNotificationStoreHooks,
  AppNotificationStoreSliceName,
  type AppNotificationStoreState,
} from '../../../app/Stores';
import { type AppNotificationViewHooks } from './AppNotificationViewHooks';

export function createAppNotificationViewHooks (hooks: AppNotificationStoreHooks): AppNotificationViewHooks {
  const sliceName = AppNotificationStoreSliceName.AppNotificationView;

  function useStoreClearActionOutput (
    input: AppNotificationStoreClearActionInput
  ): AppNotificationStoreClearActionOutput {
    return hooks.useStoreClearActionOutput(sliceName, input);
  }

  function useStoreSetActionOutput (
    input: AppNotificationStoreSetActionInput
  ): AppNotificationStoreSetActionOutput {
    return hooks.useStoreSetActionOutput(sliceName, input);
  }

  function useStoreState (): AppNotificationStoreState {
    return hooks.useStoreState(sliceName);
  }

  return {
    useStoreClearActionOutput,
    useStoreSetActionOutput,
    useStoreState
  };
}
