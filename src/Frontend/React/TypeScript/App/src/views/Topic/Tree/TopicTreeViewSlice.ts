import {
  type TopicTreeStoreClearActionInput,
  type TopicTreeStoreClearActionOutput,
  type TopicTreeStoreLoadActionInput,
  type TopicTreeStoreLoadActionOutput,
  type TopicTreeStoreSetActionInput,
  type TopicTreeStoreSetActionOutput,
  type TopicTreeStoreHooks,
  TopicTreeStoreSliceName,
  type TopicTreeStoreState,
} from '../../../app/Stores';
import { type TopicTreeViewHooks } from './TopicTreeViewHooks';

export function createTopicTreeViewHooks (hooks: TopicTreeStoreHooks): TopicTreeViewHooks {
  const sliceName = TopicTreeStoreSliceName.TopicTreeView;

  function useClearActionOutput (input: TopicTreeStoreClearActionInput): TopicTreeStoreClearActionOutput {
    return hooks.useClearActionOutput(sliceName, input);
  }

  function useLoadActionOutput (input: TopicTreeStoreLoadActionInput): TopicTreeStoreLoadActionOutput {
    return hooks.useLoadActionOutput(sliceName, input);
  }

  function useSetActionOutput (input: TopicTreeStoreSetActionInput): TopicTreeStoreSetActionOutput {
    return hooks.useSetActionOutput(sliceName, input);
  }

  function useStoreState (): TopicTreeStoreState {
    return hooks.useStoreState(sliceName);
  }

  return {
    useClearActionOutput,
    useLoadActionOutput,
    useSetActionOutput,
    useStoreState
  };
}
