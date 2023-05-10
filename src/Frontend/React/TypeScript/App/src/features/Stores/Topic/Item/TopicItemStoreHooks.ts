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
import { type TopicItemStoreResource } from './TopicItemStoreResource';
import { type TopicItemStoreState } from './TopicItemStoreState';

export interface TopicItemStoreHooks {
  readonly useResource: () => TopicItemStoreResource;

  readonly useStoreClearActionDispatch: (
    owner: string,
    options: TopicItemStoreClearActionOptions
  ) => TopicItemStoreClearActionDispatch;

  readonly useStoreClearActionOutput: (
    owner: string,
    input: TopicItemStoreClearActionInput
  ) => TopicItemStoreClearActionOutput;

  readonly useStoreDeleteActionDispatch: (
    owner: string,
    options: TopicItemStoreDeleteActionOptions
  ) => TopicItemStoreDeleteActionDispatch;

  readonly useStoreDeleteActionOutput: (
    owner: string,
    input?: TopicItemStoreDeleteActionInput
  ) => TopicItemStoreDeleteActionOutput;

  readonly useStoreDeleteCompletedActionDispatch: (
    owner: string,
    options: TopicItemStoreDeleteCompletedActionOptions
  ) => TopicItemStoreDeleteCompletedActionDispatch;

  readonly useStoreLoadActionDispatch: (
    owner: string,
    options: TopicItemStoreLoadActionOptions
  ) => TopicItemStoreLoadActionDispatch;

  readonly useStoreLoadActionOutput: (
    owner: string,
    input: TopicItemStoreLoadActionInput
  ) => TopicItemStoreLoadActionOutput;

  readonly useStoreLoadCompletedActionDispatch: (
    owner: string,
    options: TopicItemStoreLoadCompletedActionOptions
  ) => TopicItemStoreLoadCompletedActionDispatch;

  readonly useStoreSaveActionDispatch: (
    owner: string,
    options: TopicItemStoreSaveActionOptions
  ) => TopicItemStoreSaveActionDispatch;

  readonly useStoreSaveActionOutput: (
    owner: string,
    input?: TopicItemStoreSaveActionInput
  ) => TopicItemStoreSaveActionOutput;

  readonly useStoreSaveCompletedActionDispatch: (
    owner: string,
    options: TopicItemStoreSaveCompletedActionOptions
  ) => TopicItemStoreSaveCompletedActionDispatch;

  readonly useStoreSetActionDispatch: (
    owner: string,
    options: TopicItemStoreSetActionOptions
  ) => TopicItemStoreSetActionDispatch;

  readonly useStoreSetActionOutput: (
    owner: string,
    input: TopicItemStoreSetActionInput
  ) => TopicItemStoreSetActionOutput;

  readonly useStoreState: (owner: string) => TopicItemStoreState;
}
