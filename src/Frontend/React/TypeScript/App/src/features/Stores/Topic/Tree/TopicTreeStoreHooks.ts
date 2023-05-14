import {
  type TopicTreeStoreClearActionDispatch,
  type TopicTreeStoreClearActionInput,
  type TopicTreeStoreClearActionOptions,
  type TopicTreeStoreClearActionOutput,
  type TopicTreeStoreLoadActionDispatch,
  type TopicTreeStoreLoadActionInput,
  type TopicTreeStoreLoadActionOptions,
  type TopicTreeStoreLoadActionOutput,
  type TopicTreeStoreLoadCompletedActionDispatch,
  type TopicTreeStoreLoadCompletedActionOptions,
  type TopicTreeStoreSetActionDispatch,
  type TopicTreeStoreSetActionInput,
  type TopicTreeStoreSetActionOptions,
  type TopicTreeStoreSetActionOutput
} from './Actions';
import { type TopicTreeStoreSlice } from './TopicTreeStoreSlice';
import { type TopicTreeStoreResource } from './TopicTreeStoreResource';
import { type TopicTreeStoreState } from './TopicTreeStoreState';

export interface TopicTreeStoreHooks {
  readonly useResource: () => TopicTreeStoreResource;

  readonly useStoreClearActionDispatch: (
    slice: TopicTreeStoreSlice,
    options: TopicTreeStoreClearActionOptions
  ) => TopicTreeStoreClearActionDispatch;

  readonly useStoreClearActionOutput: (
    slice: TopicTreeStoreSlice,
    input: TopicTreeStoreClearActionInput
  ) => TopicTreeStoreClearActionOutput;

  readonly useStoreLoadActionDispatch: (
    slice: TopicTreeStoreSlice,
    options: TopicTreeStoreLoadActionOptions
  ) => TopicTreeStoreLoadActionDispatch;

  readonly useStoreLoadActionOutput: (
    slice: TopicTreeStoreSlice,
    input: TopicTreeStoreLoadActionInput
  ) => TopicTreeStoreLoadActionOutput;

  readonly useStoreLoadCompletedActionDispatch: (
    slice: TopicTreeStoreSlice,
    options: TopicTreeStoreLoadCompletedActionOptions
  ) => TopicTreeStoreLoadCompletedActionDispatch;

  readonly useStoreSetActionDispatch: (
    slice: TopicTreeStoreSlice,
    options: TopicTreeStoreSetActionOptions
  ) => TopicTreeStoreSetActionDispatch;

  readonly useStoreSetActionOutput: (
    slice: TopicTreeStoreSlice,
    input: TopicTreeStoreSetActionInput
  ) => TopicTreeStoreSetActionOutput;

  readonly useStoreState: (slice: TopicTreeStoreSlice) => TopicTreeStoreState;
}
