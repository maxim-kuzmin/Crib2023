import { type TopicTreeStoreHooks } from '../../../app/Stores';
import { useClearActionDispatch } from './Hooks/Actions/Clear/TopicTreeStoreClearActionDispatchHook';
import { useClearActionOutput } from './Hooks/Actions/Clear/TopicTreeStoreClearActionOutputHook';
import { useLoadActionDispatch } from './Hooks/Actions/Load/TopicTreeStoreLoadActionDispatchHook';
import { useLoadActionOutput } from './Hooks/Actions/Load/TopicTreeStoreLoadActionOutputHook';
import {
  useLoadCompletedActionDispatch
} from './Hooks/Actions/LoadCompleted/TopicTreeStoreLoadCompletedActionDispatchHook';
import { useSetActionDispatch } from './Hooks/Actions/Set/TopicTreeStoreSetActionDispatchHook';
import { useSetActionOutput } from './Hooks/Actions/Set/TopicTreeStoreSetActionOutputHook';
import { useStoreState } from './Hooks/TopicTreeStoreStateHook';

export function createTopicTreeStoreHooks (): TopicTreeStoreHooks {
  return {
    useClearActionDispatch,
    useClearActionOutput,
    useLoadActionDispatch,
    useLoadActionOutput,
    useLoadCompletedActionDispatch,
    useSetActionDispatch,
    useSetActionOutput,
    useStoreState
  };
}
