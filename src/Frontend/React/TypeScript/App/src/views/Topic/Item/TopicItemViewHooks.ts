import {
  type TopicItemStoreClearActionInput,
  type TopicItemStoreClearActionOutput,
  type TopicItemStoreDeleteActionInput,
  type TopicItemStoreDeleteActionOutput,
  type TopicItemStoreLoadActionInput,
  type TopicItemStoreLoadActionOutput,
  type TopicItemStoreSaveActionInput,
  type TopicItemStoreSaveActionOutput,
  type TopicItemStoreSetActionInput,
  type TopicItemStoreSetActionOutput,
  type TopicItemStoreHooks,
  type TopicItemStoreSliceHooks,
  TopicItemStoreSliceName,
  type TopicItemStoreState,
} from '../../../features';

export interface TopicItemViewHooks extends TopicItemStoreSliceHooks {}

interface Options {
  readonly hooksOfTopicItemStore: TopicItemStoreHooks;
}

export function createTopicItemViewHooks ({
  hooksOfTopicItemStore
}: Options): TopicItemViewHooks {
  const sliceName = TopicItemStoreSliceName.Default;

  function useStoreClearActionOutput (input: TopicItemStoreClearActionInput): TopicItemStoreClearActionOutput {
    return hooksOfTopicItemStore.useStoreClearActionOutput(sliceName, input);
  }

  function useStoreDeleteActionOutput (input?: TopicItemStoreDeleteActionInput): TopicItemStoreDeleteActionOutput {
    return hooksOfTopicItemStore.useStoreDeleteActionOutput(sliceName, input);
  }

  function useStoreLoadActionOutput (input: TopicItemStoreLoadActionInput): TopicItemStoreLoadActionOutput {
    return hooksOfTopicItemStore.useStoreLoadActionOutput(sliceName, input);
  }

  function useStoreSaveActionOutput (input?: TopicItemStoreSaveActionInput): TopicItemStoreSaveActionOutput {
    return hooksOfTopicItemStore.useStoreSaveActionOutput(sliceName, input);
  }

  function useStoreSetActionOutput (input: TopicItemStoreSetActionInput): TopicItemStoreSetActionOutput {
    return hooksOfTopicItemStore.useStoreSetActionOutput(sliceName, input);
  }

  function useStoreState (): TopicItemStoreState {
    return hooksOfTopicItemStore.useStoreState(sliceName);
  }

  return {
    useStoreClearActionOutput,
    useStoreDeleteActionOutput,
    useStoreLoadActionOutput,
    useStoreSaveActionOutput,
    useStoreSetActionOutput,
    useStoreState
  };
}
