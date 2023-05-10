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
  TopicItemStoreOwner,
  type TopicItemStoreState,
} from '../../../features';

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
  const owner = TopicItemStoreOwner.TopicItemView;

  function useStoreClearActionOutput (input: TopicItemStoreClearActionInput): TopicItemStoreClearActionOutput {
    return hooksOfTopicItemStore.useStoreClearActionOutput(owner, input);
  }

  function useStoreDeleteActionOutput (input?: TopicItemStoreDeleteActionInput): TopicItemStoreDeleteActionOutput {
    return hooksOfTopicItemStore.useStoreDeleteActionOutput(owner, input);
  }

  function useStoreLoadActionOutput (input: TopicItemStoreLoadActionInput): TopicItemStoreLoadActionOutput {
    return hooksOfTopicItemStore.useStoreLoadActionOutput(owner, input);
  }

  function useStoreSaveActionOutput (input?: TopicItemStoreSaveActionInput): TopicItemStoreSaveActionOutput {
    return hooksOfTopicItemStore.useStoreSaveActionOutput(owner, input);
  }

  function useStoreSetActionOutput (input: TopicItemStoreSetActionInput): TopicItemStoreSetActionOutput {
    return hooksOfTopicItemStore.useStoreSetActionOutput(owner, input);
  }

  function useStoreState (): TopicItemStoreState {
    return hooksOfTopicItemStore.useStoreState(owner);
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
