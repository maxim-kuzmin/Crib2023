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

  function useClearActionOutput (input: AppNotificationStoreClearActionInput): AppNotificationStoreClearActionOutput {
    return hooks.useClearActionOutput(sliceName, input);
  }

  function useSetActionOutput (input: AppNotificationStoreSetActionInput): AppNotificationStoreSetActionOutput {
    return hooks.useSetActionOutput(sliceName, input);
  }

  function useStoreState (): AppNotificationStoreState {
    return hooks.useStoreState(sliceName);
  }

  return {
    useClearActionOutput,
    useSetActionOutput,
    useStoreState
  };
}
