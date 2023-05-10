import {
  type TopicTreeStoreClearActionInput,
  type TopicTreeStoreClearActionOutput,
  type TopicTreeStoreLoadActionInput,
  type TopicTreeStoreLoadActionOutput,
  type TopicTreeStoreSetActionInput,
  type TopicTreeStoreSetActionOutput,
  type TopicTreeStoreHooks,
  TopicTreeStoreOwner,
  type TopicTreeStoreState,
} from '../../../features';

export interface TopicTreeViewHooks {
  readonly useStoreClearActionOutput: (
    input: TopicTreeStoreClearActionInput
  ) => TopicTreeStoreClearActionOutput;

  readonly useStoreLoadActionOutput: (
    input: TopicTreeStoreLoadActionInput
  ) => TopicTreeStoreLoadActionOutput;

  readonly useStoreSetActionOutput: (
    input: TopicTreeStoreSetActionInput
  ) => TopicTreeStoreSetActionOutput;

  readonly useStoreState: () => TopicTreeStoreState;
}

interface Options {
  readonly hooksOfTopicTreeStore: TopicTreeStoreHooks;
}

export function createTopicTreeViewHooks ({
  hooksOfTopicTreeStore
}: Options): TopicTreeViewHooks {
  const owner = TopicTreeStoreOwner.TopicTreeView;

  function useStoreClearActionOutput (input: TopicTreeStoreClearActionInput): TopicTreeStoreClearActionOutput {
    return hooksOfTopicTreeStore.useStoreClearActionOutput(owner, input);
  }

  function useStoreLoadActionOutput (input: TopicTreeStoreLoadActionInput): TopicTreeStoreLoadActionOutput {
    return hooksOfTopicTreeStore.useStoreLoadActionOutput(owner, input);
  }

  function useStoreSetActionOutput (input: TopicTreeStoreSetActionInput): TopicTreeStoreSetActionOutput {
    return hooksOfTopicTreeStore.useStoreSetActionOutput(owner, input);
  }

  function useStoreState (): TopicTreeStoreState {
    return hooksOfTopicTreeStore.useStoreState(owner);
  }

  return {
    useStoreClearActionOutput,
    useStoreLoadActionOutput,
    useStoreSetActionOutput,
    useStoreState
  };
}
