import { type TopicItemStoreHooks } from '../../../app/Stores';
import { useClearActionDispatch } from './Hooks/Actions/Clear/TopicItemStoreClearActionDispatchHook';
import { useClearActionOutput } from './Hooks/Actions/Clear/TopicItemStoreClearActionOutputHook';
import { useDeleteActionDispatch } from './Hooks/Actions/Delete/TopicItemStoreDeleteActionDispatchHook';
import { useDeleteActionOutput } from './Hooks/Actions/Delete/TopicItemStoreDeleteActionOutputHook';
import {
  useDeleteCompletedActionDispatch
} from './Hooks/Actions/DeleteCompleted/TopicItemStoreDeleteCompletedActionDispatchHook';
import { useLoadActionDispatch } from './Hooks/Actions/Load/TopicItemStoreLoadActionDispatchHook';
import { useLoadActionOutput } from './Hooks/Actions/Load/TopicItemStoreLoadActionOutputHook';
import {
  useLoadCompletedActionDispatch
} from './Hooks/Actions/LoadCompleted/TopicItemStoreLoadCompletedActionDispatchHook';
import { useSaveActionDispatch } from './Hooks/Actions/Save/TopicItemStoreSaveActionDispatchHook';
import { useSaveActionOutput } from './Hooks/Actions/Save/TopicItemStoreSaveActionOutputHook';
import {
  useSaveCompletedActionDispatch
} from './Hooks/Actions/SaveCompleted/TopicItemStoreSaveCompletedActionDispatchHook';
import { useSetActionDispatch } from './Hooks/Actions/Set/TopicItemStoreSetActionDispatchHook';
import { useSetActionOutput } from './Hooks/Actions/Set/TopicItemStoreSetActionOutputHook';
import { useStoreState } from './Hooks/TopicItemStoreStateHook';

export function createTopicItemStoreHooks (): TopicItemStoreHooks {
  return {
    useClearActionDispatch,
    useClearActionOutput,
    useDeleteActionDispatch,
    useDeleteActionOutput,
    useDeleteCompletedActionDispatch,
    useLoadActionDispatch,
    useLoadActionOutput,
    useLoadCompletedActionDispatch,
    useSaveActionDispatch,
    useSaveActionOutput,
    useSaveCompletedActionDispatch,
    useSetActionDispatch,
    useSetActionOutput,
    useStoreState
  };
}
