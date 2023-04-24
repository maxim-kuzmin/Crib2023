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
  type TopicItemStoreState,
} from '../../../app/Stores';

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
