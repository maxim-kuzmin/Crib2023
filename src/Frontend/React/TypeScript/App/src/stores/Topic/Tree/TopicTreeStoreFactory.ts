import { type TopicTreeStoreHooks } from '../../../app/Stores';
import { useStoreClearActionDispatch } from './Hooks/Actions/Clear/TopicTreeStoreClearActionDispatchHook';
import { useStoreClearActionOutput } from './Hooks/Actions/Clear/TopicTreeStoreClearActionOutputHook';
import { useStoreLoadActionDispatch } from './Hooks/Actions/Load/TopicTreeStoreLoadActionDispatchHook';
import { useStoreLoadActionOutput } from './Hooks/Actions/Load/TopicTreeStoreLoadActionOutputHook';
import {
  useStoreLoadCompletedActionDispatch
} from './Hooks/Actions/LoadCompleted/TopicTreeStoreLoadCompletedActionDispatchHook';
import { useStoreSetActionDispatch } from './Hooks/Actions/Set/TopicTreeStoreSetActionDispatchHook';
import { useStoreSetActionOutput } from './Hooks/Actions/Set/TopicTreeStoreSetActionOutputHook';
import { useStoreState } from './Hooks/TopicTreeStoreStateHook';

export function createTopicTreeStoreHooks (): TopicTreeStoreHooks {
  return {
    useStoreClearActionDispatch,
    useStoreClearActionOutput,
    useStoreLoadActionDispatch,
    useStoreLoadActionOutput,
    useStoreLoadCompletedActionDispatch,
    useStoreSetActionDispatch,
    useStoreSetActionOutput,
    useStoreState
  };
}
