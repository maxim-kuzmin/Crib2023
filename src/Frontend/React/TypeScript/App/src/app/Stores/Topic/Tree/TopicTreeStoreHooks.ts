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
import { type TopicTreeStoreState } from './TopicTreeStoreState';

export interface TopicTreeStoreHooks {
  readonly useClearActionDispatch: (
    sliceName: string,
    options: TopicTreeStoreClearActionOptions
  ) => TopicTreeStoreClearActionDispatch;

  readonly useClearActionOutput: (
    sliceName: string,
    input: TopicTreeStoreClearActionInput
  ) => TopicTreeStoreClearActionOutput;

  readonly useLoadActionDispatch: (
    sliceName: string,
    options: TopicTreeStoreLoadActionOptions
  ) => TopicTreeStoreLoadActionDispatch;

  readonly useLoadActionOutput: (
    sliceName: string,
    input: TopicTreeStoreLoadActionInput
  ) => TopicTreeStoreLoadActionOutput;

  readonly useLoadCompletedActionDispatch: (
    sliceName: string,
    options: TopicTreeStoreLoadCompletedActionOptions
  ) => TopicTreeStoreLoadCompletedActionDispatch;

  readonly useSetActionDispatch: (
    sliceName: string,
    options: TopicTreeStoreSetActionOptions
  ) => TopicTreeStoreSetActionDispatch;

  readonly useSetActionOutput: (
    sliceName: string,
    input: TopicTreeStoreSetActionInput
  ) => TopicTreeStoreSetActionOutput;

  readonly useStoreState: (sliceName: string) => TopicTreeStoreState;
}
