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
  type TopicItemStoreSetActionOutput
} from './Actions';
import { type TopicItemStoreSliceName } from './Slice';
import { type TopicItemStoreResource } from './TopicItemStoreResource';
import { type TopicItemStoreState } from './TopicItemStoreState';

export interface TopicItemStoreHooks {
  readonly useResource: () => TopicItemStoreResource;

  readonly useStoreClearActionOutput: (
    sliceName: TopicItemStoreSliceName,
    input: TopicItemStoreClearActionInput
  ) => TopicItemStoreClearActionOutput;

  readonly useStoreDeleteActionOutput: (
    sliceName: TopicItemStoreSliceName,
    input?: TopicItemStoreDeleteActionInput
  ) => TopicItemStoreDeleteActionOutput;

  readonly useStoreLoadActionOutput: (
    sliceName: TopicItemStoreSliceName,
    input: TopicItemStoreLoadActionInput
  ) => TopicItemStoreLoadActionOutput;

  readonly useStoreSaveActionOutput: (
    sliceName: TopicItemStoreSliceName,
    input?: TopicItemStoreSaveActionInput
  ) => TopicItemStoreSaveActionOutput;

  readonly useStoreSetActionOutput: (
    sliceName: TopicItemStoreSliceName,
    input: TopicItemStoreSetActionInput
  ) => TopicItemStoreSetActionOutput;

  readonly useStoreState: (sliceName: TopicItemStoreSliceName) => TopicItemStoreState;
}
