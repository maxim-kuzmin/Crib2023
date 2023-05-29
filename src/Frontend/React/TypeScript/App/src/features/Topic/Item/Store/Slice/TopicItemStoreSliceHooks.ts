import {
    type TopicItemStoreClearActionOutput,
  type TopicItemStoreDeleteActionInput,
  type TopicItemStoreDeleteActionOutput,
  type TopicItemStoreLoadActionInput,
  type TopicItemStoreLoadActionOutput,
  type TopicItemStoreSaveActionInput,
  type TopicItemStoreSaveActionOutput,
    type TopicItemStoreSetActionOutput
} from '../Actions';
import { type TopicItemStoreState } from '../TopicItemStoreState';

export interface TopicItemStoreSliceHooks {
  readonly useStoreClearActionOutput: () => TopicItemStoreClearActionOutput;

  readonly useStoreDeleteActionOutput: (
    input?: TopicItemStoreDeleteActionInput
  ) => TopicItemStoreDeleteActionOutput;

  readonly useStoreLoadActionOutput: (
    input: TopicItemStoreLoadActionInput
  ) => TopicItemStoreLoadActionOutput;

  readonly useStoreSaveActionOutput: (
    input?: TopicItemStoreSaveActionInput
  ) => TopicItemStoreSaveActionOutput;

  readonly useStoreSetActionOutput: () => TopicItemStoreSetActionOutput;

  readonly useStoreState: () => TopicItemStoreState;
}
