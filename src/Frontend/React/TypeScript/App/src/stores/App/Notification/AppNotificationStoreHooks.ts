import { type AppNotificationStoreHooks } from '../../../features';
import { useStoreClearActionDispatch } from './Hooks/Actions/Clear/AppNotificationStoreClearActionDispatchHook';
import { useStoreClearActionOutput } from './Hooks/Actions/Clear/AppNotificationStoreClearActionOutputHook';
import { useStoreSetActionDispatch } from './Hooks/Actions/Set/AppNotificationStoreSetActionDispatchHook';
import { useStoreSetActionOutput } from './Hooks/Actions/Set/AppNotificationStoreSetActionOutputHook';
import { useStoreState } from './Hooks/AppNotificationStoreStateHook';

export function createAppNotificationStoreHooks (): AppNotificationStoreHooks {
  return {
    useStoreClearActionDispatch,
    useStoreClearActionOutput,
    useStoreSetActionDispatch,
    useStoreSetActionOutput,
    useStoreState
  };
}
