import {
  type TopicTreeStoreClearActionInput,
  type TopicTreeStoreClearActionOutput,
  type TopicTreeStoreLoadActionInput,
  type TopicTreeStoreLoadActionOutput,
  type TopicTreeStoreSetActionInput,
  type TopicTreeStoreSetActionOutput,
  type TopicTreeStoreHooks,
  TopicTreeStoreSlice,
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
  const slice = TopicTreeStoreSlice.Default;

  function useStoreClearActionOutput (input: TopicTreeStoreClearActionInput): TopicTreeStoreClearActionOutput {
    return hooksOfTopicTreeStore.useStoreClearActionOutput(slice, input);
  }

  function useStoreLoadActionOutput (input: TopicTreeStoreLoadActionInput): TopicTreeStoreLoadActionOutput {
    return hooksOfTopicTreeStore.useStoreLoadActionOutput(slice, input);
  }

  function useStoreSetActionOutput (input: TopicTreeStoreSetActionInput): TopicTreeStoreSetActionOutput {
    return hooksOfTopicTreeStore.useStoreSetActionOutput(slice, input);
  }

  function useStoreState (): TopicTreeStoreState {
    return hooksOfTopicTreeStore.useStoreState(slice);
  }

  return {
    useStoreClearActionOutput,
    useStoreLoadActionOutput,
    useStoreSetActionOutput,
    useStoreState
  };
}
