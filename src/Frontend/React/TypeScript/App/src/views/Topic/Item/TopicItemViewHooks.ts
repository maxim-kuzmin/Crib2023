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
  TopicItemStoreSliceName,
  type TopicItemStoreState,
} from '../../../app';

export interface TopicItemViewHooks {
  readonly useStoreClearActionOutput: (
    input: TopicItemStoreClearActionInput
  ) => TopicItemStoreClearActionOutput;

  readonly useStoreDeleteActionOutput: (
    input?: TopicItemStoreDeleteActionInput
  ) => TopicItemStoreDeleteActionOutput;

  readonly useStoreLoadActionOutput: (
    input: TopicItemStoreLoadActionInput
  ) => TopicItemStoreLoadActionOutput;

  readonly useStoreSaveActionOutput: (
    input?: TopicItemStoreSaveActionInput
  ) => TopicItemStoreSaveActionOutput;

  readonly useStoreSetActionOutput: (
    input: TopicItemStoreSetActionInput
  ) => TopicItemStoreSetActionOutput;

  readonly useStoreState: () => TopicItemStoreState;
}

interface Options {
  readonly hooksOfTopicItemStore: TopicItemStoreHooks;
}

export function createTopicItemViewHooks ({
  hooksOfTopicItemStore
}: Options): TopicItemViewHooks {
  const sliceName = TopicItemStoreSliceName.TopicItemView;

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
