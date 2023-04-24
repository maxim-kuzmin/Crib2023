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
import { type TopicItemStoreState } from './TopicItemStoreState';

export interface TopicItemStoreHooks {
  readonly useStoreClearActionDispatch: (
    sliceName: string,
    options: TopicItemStoreClearActionOptions
  ) => TopicItemStoreClearActionDispatch;

  readonly useStoreClearActionOutput: (
    sliceName: string,
    input: TopicItemStoreClearActionInput
  ) => TopicItemStoreClearActionOutput;

  readonly useStoreDeleteActionDispatch: (
    sliceName: string,
    options: TopicItemStoreDeleteActionOptions
  ) => TopicItemStoreDeleteActionDispatch;

  readonly useStoreDeleteActionOutput: (
    sliceName: string,
    input?: TopicItemStoreDeleteActionInput
  ) => TopicItemStoreDeleteActionOutput;

  readonly useStoreDeleteCompletedActionDispatch: (
    sliceName: string,
    options: TopicItemStoreDeleteCompletedActionOptions
  ) => TopicItemStoreDeleteCompletedActionDispatch;

  readonly useStoreLoadActionDispatch: (
    sliceName: string,
    options: TopicItemStoreLoadActionOptions
  ) => TopicItemStoreLoadActionDispatch;

  readonly useStoreLoadActionOutput: (
    sliceName: string,
    input: TopicItemStoreLoadActionInput
  ) => TopicItemStoreLoadActionOutput;

  readonly useStoreLoadCompletedActionDispatch: (
    sliceName: string,
    options: TopicItemStoreLoadCompletedActionOptions
  ) => TopicItemStoreLoadCompletedActionDispatch;

  readonly useStoreSaveActionDispatch: (
    sliceName: string,
    options: TopicItemStoreSaveActionOptions
  ) => TopicItemStoreSaveActionDispatch;

  readonly useStoreSaveActionOutput: (
    sliceName: string,
    input?: TopicItemStoreSaveActionInput
  ) => TopicItemStoreSaveActionOutput;

  readonly useStoreSaveCompletedActionDispatch: (
    sliceName: string,
    options: TopicItemStoreSaveCompletedActionOptions
  ) => TopicItemStoreSaveCompletedActionDispatch;

  readonly useStoreSetActionDispatch: (
    sliceName: string,
    options: TopicItemStoreSetActionOptions
  ) => TopicItemStoreSetActionDispatch;

  readonly useStoreSetActionOutput: (
    sliceName: string,
    input: TopicItemStoreSetActionInput
  ) => TopicItemStoreSetActionOutput;

  readonly useStoreState: (sliceName: string) => TopicItemStoreState;
}
