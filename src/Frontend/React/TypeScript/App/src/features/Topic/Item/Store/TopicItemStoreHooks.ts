import {
  type TopicItemStoreClearActionDispatch,
  type TopicItemStoreClearActionInput,
  type TopicItemStoreClearActionOptions,
  type TopicItemStoreClearActionOutput,
  type TopicItemStoreDeleteActionDispatch,
  type TopicItemStoreDeleteActionInput,
  type TopicItemStoreDeleteActionOptions,
  type TopicItemStoreDeleteActionOutput,
  type TopicItemStoreDeleteCompletedActionDispatch,
  type TopicItemStoreDeleteCompletedActionOptions,
  type TopicItemStoreLoadActionDispatch,
  type TopicItemStoreLoadActionInput,
  type TopicItemStoreLoadActionOptions,
  type TopicItemStoreLoadActionOutput,
  type TopicItemStoreLoadCompletedActionDispatch,
  type TopicItemStoreLoadCompletedActionOptions,
  type TopicItemStoreSaveActionDispatch,
  type TopicItemStoreSaveActionInput,
  type TopicItemStoreSaveActionOptions,
  type TopicItemStoreSaveActionOutput,
  type TopicItemStoreSaveCompletedActionDispatch,
  type TopicItemStoreSaveCompletedActionOptions,
  type TopicItemStoreSetActionDispatch,
  type TopicItemStoreSetActionInput,
  type TopicItemStoreSetActionOptions,
  type TopicItemStoreSetActionOutput
} from './Actions';
import { type TopicItemStoreSliceName } from './Slice/TopicItemStoreSliceName';
import { type TopicItemStoreResource } from './TopicItemStoreResource';
import { type TopicItemStoreState } from './TopicItemStoreState';

export interface TopicItemStoreHooks {
  readonly useResource: () => TopicItemStoreResource;

  readonly useStoreClearActionDispatch: (
    sliceName: TopicItemStoreSliceName,
    options?: TopicItemStoreClearActionOptions
  ) => TopicItemStoreClearActionDispatch;

  readonly useStoreClearActionOutput: (
    sliceName: TopicItemStoreSliceName,
    input: TopicItemStoreClearActionInput
  ) => TopicItemStoreClearActionOutput;

  readonly useStoreDeleteActionDispatch: (
    sliceName: TopicItemStoreSliceName,
    options?: TopicItemStoreDeleteActionOptions
  ) => TopicItemStoreDeleteActionDispatch;

  readonly useStoreDeleteActionOutput: (
    sliceName: TopicItemStoreSliceName,
    input?: TopicItemStoreDeleteActionInput
  ) => TopicItemStoreDeleteActionOutput;

  readonly useStoreDeleteCompletedActionDispatch: (
    sliceName: TopicItemStoreSliceName,
    options?: TopicItemStoreDeleteCompletedActionOptions
  ) => TopicItemStoreDeleteCompletedActionDispatch;

  readonly useStoreLoadActionDispatch: (
    sliceName: TopicItemStoreSliceName,
    options?: TopicItemStoreLoadActionOptions
  ) => TopicItemStoreLoadActionDispatch;

  readonly useStoreLoadActionOutput: (
    sliceName: TopicItemStoreSliceName,
    input: TopicItemStoreLoadActionInput
  ) => TopicItemStoreLoadActionOutput;

  readonly useStoreLoadCompletedActionDispatch: (
    sliceName: TopicItemStoreSliceName,
    options?: TopicItemStoreLoadCompletedActionOptions
  ) => TopicItemStoreLoadCompletedActionDispatch;

  readonly useStoreSaveActionDispatch: (
    sliceName: TopicItemStoreSliceName,
    options?: TopicItemStoreSaveActionOptions
  ) => TopicItemStoreSaveActionDispatch;

  readonly useStoreSaveActionOutput: (
    sliceName: TopicItemStoreSliceName,
    input?: TopicItemStoreSaveActionInput
  ) => TopicItemStoreSaveActionOutput;

  readonly useStoreSaveCompletedActionDispatch: (
    sliceName: TopicItemStoreSliceName,
    options?: TopicItemStoreSaveCompletedActionOptions
  ) => TopicItemStoreSaveCompletedActionDispatch;

  readonly useStoreSetActionDispatch: (
    sliceName: TopicItemStoreSliceName,
    options?: TopicItemStoreSetActionOptions
  ) => TopicItemStoreSetActionDispatch;

  readonly useStoreSetActionOutput: (
    sliceName: TopicItemStoreSliceName,
    input: TopicItemStoreSetActionInput
  ) => TopicItemStoreSetActionOutput;

  readonly useStoreState: (sliceName: TopicItemStoreSliceName) => TopicItemStoreState;
}
