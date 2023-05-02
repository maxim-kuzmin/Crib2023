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
  const sliceName = TopicTreeStoreSliceName.TopicTreeView;

  function useStoreClearActionOutput (input: TopicTreeStoreClearActionInput): TopicTreeStoreClearActionOutput {
    return hooksOfTopicTreeStore.useStoreClearActionOutput(sliceName, input);
  }

  function useStoreLoadActionOutput (input: TopicTreeStoreLoadActionInput): TopicTreeStoreLoadActionOutput {
    return hooksOfTopicTreeStore.useStoreLoadActionOutput(sliceName, input);
  }

  function useStoreSetActionOutput (input: TopicTreeStoreSetActionInput): TopicTreeStoreSetActionOutput {
    return hooksOfTopicTreeStore.useStoreSetActionOutput(sliceName, input);
  }

  function useStoreState (): TopicTreeStoreState {
    return hooksOfTopicTreeStore.useStoreState(sliceName);
  }

  return {
    useStoreClearActionOutput,
    useStoreLoadActionOutput,
    useStoreSetActionOutput,
    useStoreState
  };
}
