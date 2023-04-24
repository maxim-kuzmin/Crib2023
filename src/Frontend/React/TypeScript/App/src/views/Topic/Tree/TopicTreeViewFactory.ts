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

  function useStoreClearActionOutput (input: TopicTreeStoreClearActionInput): TopicTreeStoreClearActionOutput {
    return hooks.useStoreClearActionOutput(sliceName, input);
  }

  function useStoreLoadActionOutput (input: TopicTreeStoreLoadActionInput): TopicTreeStoreLoadActionOutput {
    return hooks.useStoreLoadActionOutput(sliceName, input);
  }

  function useStoreSetActionOutput (input: TopicTreeStoreSetActionInput): TopicTreeStoreSetActionOutput {
    return hooks.useStoreSetActionOutput(sliceName, input);
  }

  function useStoreState (): TopicTreeStoreState {
    return hooks.useStoreState(sliceName);
  }

  return {
    useStoreClearActionOutput,
    useStoreLoadActionOutput,
    useStoreSetActionOutput,
    useStoreState
  };
}
