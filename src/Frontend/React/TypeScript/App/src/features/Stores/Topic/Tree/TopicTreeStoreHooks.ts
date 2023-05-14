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
import { type TopicTreeStoreSliceName } from './Slice/TopicTreeStoreSliceName';
import { type TopicTreeStoreResource } from './TopicTreeStoreResource';
import { type TopicTreeStoreState } from './TopicTreeStoreState';

export interface TopicTreeStoreHooks {
  readonly useResource: () => TopicTreeStoreResource;

  readonly useStoreClearActionDispatch: (
    sliceName: TopicTreeStoreSliceName,
    options: TopicTreeStoreClearActionOptions
  ) => TopicTreeStoreClearActionDispatch;

  readonly useStoreClearActionOutput: (
    sliceName: TopicTreeStoreSliceName,
    input: TopicTreeStoreClearActionInput
  ) => TopicTreeStoreClearActionOutput;

  readonly useStoreLoadActionDispatch: (
    sliceName: TopicTreeStoreSliceName,
    options: TopicTreeStoreLoadActionOptions
  ) => TopicTreeStoreLoadActionDispatch;

  readonly useStoreLoadActionOutput: (
    sliceName: TopicTreeStoreSliceName,
    input: TopicTreeStoreLoadActionInput
  ) => TopicTreeStoreLoadActionOutput;

  readonly useStoreLoadCompletedActionDispatch: (
    sliceName: TopicTreeStoreSliceName,
    options: TopicTreeStoreLoadCompletedActionOptions
  ) => TopicTreeStoreLoadCompletedActionDispatch;

  readonly useStoreSetActionDispatch: (
    sliceName: TopicTreeStoreSliceName,
    options: TopicTreeStoreSetActionOptions
  ) => TopicTreeStoreSetActionDispatch;

  readonly useStoreSetActionOutput: (
    sliceName: TopicTreeStoreSliceName,
    input: TopicTreeStoreSetActionInput
  ) => TopicTreeStoreSetActionOutput;

  readonly useStoreState: (sliceName: TopicTreeStoreSliceName) => TopicTreeStoreState;
}
