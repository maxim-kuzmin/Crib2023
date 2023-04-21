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
  readonly useClearActionDispatch: (
    sliceName: string,
    options: TopicItemStoreClearActionOptions
  ) => TopicItemStoreClearActionDispatch;

  readonly useClearActionOutput: (
    sliceName: string,
    input: TopicItemStoreClearActionInput
  ) => TopicItemStoreClearActionOutput;

  readonly useDeleteActionDispatch: (
    sliceName: string,
    options: TopicItemStoreDeleteActionOptions
  ) => TopicItemStoreDeleteActionDispatch;

  readonly useDeleteActionOutput: (
    sliceName: string,
    input?: TopicItemStoreDeleteActionInput
  ) => TopicItemStoreDeleteActionOutput;

  readonly useDeleteCompletedActionDispatch: (
    sliceName: string,
    options: TopicItemStoreDeleteCompletedActionOptions
  ) => TopicItemStoreDeleteCompletedActionDispatch;

  readonly useLoadActionDispatch: (
    sliceName: string,
    options: TopicItemStoreLoadActionOptions
  ) => TopicItemStoreLoadActionDispatch;

  readonly useLoadActionOutput: (
    sliceName: string,
    input: TopicItemStoreLoadActionInput
  ) => TopicItemStoreLoadActionOutput;

  readonly useLoadCompletedActionDispatch: (
    sliceName: string,
    options: TopicItemStoreLoadCompletedActionOptions
  ) => TopicItemStoreLoadCompletedActionDispatch;

  readonly useSaveActionDispatch: (
    sliceName: string,
    options: TopicItemStoreSaveActionOptions
  ) => TopicItemStoreSaveActionDispatch;

  readonly useSaveActionOutput: (
    sliceName: string,
    input?: TopicItemStoreSaveActionInput
  ) => TopicItemStoreSaveActionOutput;

  readonly useSaveCompletedActionDispatch: (
    sliceName: string,
    options: TopicItemStoreSaveCompletedActionOptions
  ) => TopicItemStoreSaveCompletedActionDispatch;

  readonly useSetActionDispatch: (
    sliceName: string,
    options: TopicItemStoreSetActionOptions
  ) => TopicItemStoreSetActionDispatch;

  readonly useSetActionOutput: (
    sliceName: string,
    input: TopicItemStoreSetActionInput
  ) => TopicItemStoreSetActionOutput;

  readonly useStoreState: (sliceName: string) => TopicItemStoreState;
}
