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
import { type TopicItemStoreSlice } from './TopicItemStoreSlice';
import { type TopicItemStoreResource } from './TopicItemStoreResource';
import { type TopicItemStoreState } from './TopicItemStoreState';

export interface TopicItemStoreHooks {
  readonly useResource: () => TopicItemStoreResource;

  readonly useStoreClearActionDispatch: (
    slice: TopicItemStoreSlice,
    options: TopicItemStoreClearActionOptions
  ) => TopicItemStoreClearActionDispatch;

  readonly useStoreClearActionOutput: (
    slice: TopicItemStoreSlice,
    input: TopicItemStoreClearActionInput
  ) => TopicItemStoreClearActionOutput;

  readonly useStoreDeleteActionDispatch: (
    slice: TopicItemStoreSlice,
    options: TopicItemStoreDeleteActionOptions
  ) => TopicItemStoreDeleteActionDispatch;

  readonly useStoreDeleteActionOutput: (
    slice: TopicItemStoreSlice,
    input?: TopicItemStoreDeleteActionInput
  ) => TopicItemStoreDeleteActionOutput;

  readonly useStoreDeleteCompletedActionDispatch: (
    slice: TopicItemStoreSlice,
    options: TopicItemStoreDeleteCompletedActionOptions
  ) => TopicItemStoreDeleteCompletedActionDispatch;

  readonly useStoreLoadActionDispatch: (
    slice: TopicItemStoreSlice,
    options: TopicItemStoreLoadActionOptions
  ) => TopicItemStoreLoadActionDispatch;

  readonly useStoreLoadActionOutput: (
    slice: TopicItemStoreSlice,
    input: TopicItemStoreLoadActionInput
  ) => TopicItemStoreLoadActionOutput;

  readonly useStoreLoadCompletedActionDispatch: (
    slice: TopicItemStoreSlice,
    options: TopicItemStoreLoadCompletedActionOptions
  ) => TopicItemStoreLoadCompletedActionDispatch;

  readonly useStoreSaveActionDispatch: (
    slice: TopicItemStoreSlice,
    options: TopicItemStoreSaveActionOptions
  ) => TopicItemStoreSaveActionDispatch;

  readonly useStoreSaveActionOutput: (
    slice: TopicItemStoreSlice,
    input?: TopicItemStoreSaveActionInput
  ) => TopicItemStoreSaveActionOutput;

  readonly useStoreSaveCompletedActionDispatch: (
    slice: TopicItemStoreSlice,
    options: TopicItemStoreSaveCompletedActionOptions
  ) => TopicItemStoreSaveCompletedActionDispatch;

  readonly useStoreSetActionDispatch: (
    slice: TopicItemStoreSlice,
    options: TopicItemStoreSetActionOptions
  ) => TopicItemStoreSetActionDispatch;

  readonly useStoreSetActionOutput: (
    slice: TopicItemStoreSlice,
    input: TopicItemStoreSetActionInput
  ) => TopicItemStoreSetActionOutput;

  readonly useStoreState: (slice: TopicItemStoreSlice) => TopicItemStoreState;
}
