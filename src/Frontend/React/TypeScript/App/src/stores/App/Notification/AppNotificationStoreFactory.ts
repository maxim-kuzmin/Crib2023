import { type AppNotificationStoreHooks } from '../../../app/Stores';
import { useClearActionDispatch } from './Hooks/Actions/Clear/AppNotificationStoreClearActionDispatchHook';
import { useClearActionOutput } from './Hooks/Actions/Clear/AppNotificationStoreClearActionOutputHook';
import { useSetActionDispatch } from './Hooks/Actions/Set/AppNotificationStoreSetActionDispatchHook';
import { useSetActionOutput } from './Hooks/Actions/Set/AppNotificationStoreSetActionOutputHook';
import { useStoreState } from './Hooks/AppNotificationStoreStateHook';

export function createAppNotificationStoreHooks (): AppNotificationStoreHooks {
  return {
    useClearActionDispatch,
    useClearActionOutput,
    useSetActionDispatch,
    useSetActionOutput,
    useStoreState
  };
}
