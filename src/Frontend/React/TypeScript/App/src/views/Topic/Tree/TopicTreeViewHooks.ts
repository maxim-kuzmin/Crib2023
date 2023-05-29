import {
  type TopicTreeStoreClearActionOutput,
  type TopicTreeStoreLoadActionInput,
  type TopicTreeStoreLoadActionOutput,
  type TopicTreeStoreSetActionOutput,
  type TopicTreeStoreHooks,
  type TopicTreeStoreSliceHooks,
  TopicTreeStoreSliceName,
  type TopicTreeStoreState,
} from '../../../features';

export interface TopicTreeViewHooks extends TopicTreeStoreSliceHooks {}

interface Options {
  readonly hooksOfTopicTreeStore: TopicTreeStoreHooks;
}

export function createTopicTreeViewHooks ({
  hooksOfTopicTreeStore
}: Options): TopicTreeViewHooks {
  const sliceName = TopicTreeStoreSliceName.Default;

  function useStoreClearActionOutput (): TopicTreeStoreClearActionOutput {
    return hooksOfTopicTreeStore.useStoreClearActionOutput(sliceName);
  }

  function useStoreLoadActionOutput (input: TopicTreeStoreLoadActionInput): TopicTreeStoreLoadActionOutput {
    return hooksOfTopicTreeStore.useStoreLoadActionOutput(sliceName, input);
  }

  function useStoreSetActionOutput (): TopicTreeStoreSetActionOutput {
    return hooksOfTopicTreeStore.useStoreSetActionOutput(sliceName);
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
