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
import { type TopicTreeStoreResource } from './TopicTreeStoreResource';
import { type TopicTreeStoreState } from './TopicTreeStoreState';

export interface TopicTreeStoreHooks {
  readonly useResource: () => TopicTreeStoreResource;

  readonly useStoreClearActionDispatch: (
    sliceName: string,
    options: TopicTreeStoreClearActionOptions
  ) => TopicTreeStoreClearActionDispatch;

  readonly useStoreClearActionOutput: (
    sliceName: string,
    input: TopicTreeStoreClearActionInput
  ) => TopicTreeStoreClearActionOutput;

  readonly useStoreLoadActionDispatch: (
    sliceName: string,
    options: TopicTreeStoreLoadActionOptions
  ) => TopicTreeStoreLoadActionDispatch;

  readonly useStoreLoadActionOutput: (
    sliceName: string,
    input: TopicTreeStoreLoadActionInput
  ) => TopicTreeStoreLoadActionOutput;

  readonly useStoreLoadCompletedActionDispatch: (
    sliceName: string,
    options: TopicTreeStoreLoadCompletedActionOptions
  ) => TopicTreeStoreLoadCompletedActionDispatch;

  readonly useStoreSetActionDispatch: (
    sliceName: string,
    options: TopicTreeStoreSetActionOptions
  ) => TopicTreeStoreSetActionDispatch;

  readonly useStoreSetActionOutput: (
    sliceName: string,
    input: TopicTreeStoreSetActionInput
  ) => TopicTreeStoreSetActionOutput;

  readonly useStoreState: (sliceName: string) => TopicTreeStoreState;
}
