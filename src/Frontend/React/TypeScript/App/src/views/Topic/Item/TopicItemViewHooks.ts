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
  readonly useClearActionOutput: (input: TopicItemStoreClearActionInput) => TopicItemStoreClearActionOutput;
  readonly useDeleteActionOutput: (input?: TopicItemStoreDeleteActionInput) => TopicItemStoreDeleteActionOutput;
  readonly useLoadActionOutput: (input: TopicItemStoreLoadActionInput) => TopicItemStoreLoadActionOutput;
  readonly useSaveActionOutput: (input?: TopicItemStoreSaveActionInput) => TopicItemStoreSaveActionOutput;
  readonly useSetActionOutput: (input: TopicItemStoreSetActionInput) => TopicItemStoreSetActionOutput;
  readonly useStoreState: () => TopicItemStoreState;
}
