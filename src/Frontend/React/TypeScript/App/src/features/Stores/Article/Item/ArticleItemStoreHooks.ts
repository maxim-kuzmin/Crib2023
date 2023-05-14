import {
  type ArticleItemStoreClearActionDispatch,
  type ArticleItemStoreClearActionInput,
  type ArticleItemStoreClearActionOptions,
  type ArticleItemStoreClearActionOutput,
  type ArticleItemStoreDeleteActionDispatch,
  type ArticleItemStoreDeleteActionInput,
  type ArticleItemStoreDeleteActionOptions,
  type ArticleItemStoreDeleteActionOutput,
  type ArticleItemStoreDeleteCompletedActionDispatch,
  type ArticleItemStoreDeleteCompletedActionOptions,
  type ArticleItemStoreLoadActionDispatch,
  type ArticleItemStoreLoadActionInput,
  type ArticleItemStoreLoadActionOptions,
  type ArticleItemStoreLoadActionOutput,
  type ArticleItemStoreLoadCompletedActionDispatch,
  type ArticleItemStoreLoadCompletedActionOptions,
  type ArticleItemStoreSaveActionDispatch,
  type ArticleItemStoreSaveActionInput,
  type ArticleItemStoreSaveActionOptions,
  type ArticleItemStoreSaveActionOutput,
  type ArticleItemStoreSaveCompletedActionDispatch,
  type ArticleItemStoreSaveCompletedActionOptions,
  type ArticleItemStoreSetActionDispatch,
  type ArticleItemStoreSetActionInput,
  type ArticleItemStoreSetActionOptions,
  type ArticleItemStoreSetActionOutput
} from './Actions';
import { type ArticleItemStoreSlice } from './ArticleItemStoreSlice';
import { type ArticleItemStoreResource } from './ArticleItemStoreResource';
import { type ArticleItemStoreState } from './ArticleItemStoreState';

export interface ArticleItemStoreHooks {
  readonly useResource: () => ArticleItemStoreResource;

  readonly useStoreClearActionDispatch: (
    slice: ArticleItemStoreSlice,
    options: ArticleItemStoreClearActionOptions
  ) => ArticleItemStoreClearActionDispatch;

  readonly useStoreClearActionOutput: (
    slice: ArticleItemStoreSlice,
    input: ArticleItemStoreClearActionInput
  ) => ArticleItemStoreClearActionOutput;

  readonly useStoreDeleteActionDispatch: (
    slice: ArticleItemStoreSlice,
    options: ArticleItemStoreDeleteActionOptions
  ) => ArticleItemStoreDeleteActionDispatch;

  readonly useStoreDeleteActionOutput: (
    slice: ArticleItemStoreSlice,
    input?: ArticleItemStoreDeleteActionInput
  ) => ArticleItemStoreDeleteActionOutput;

  readonly useStoreDeleteCompletedActionDispatch: (
    slice: ArticleItemStoreSlice,
    options: ArticleItemStoreDeleteCompletedActionOptions
  ) => ArticleItemStoreDeleteCompletedActionDispatch;

  readonly useStoreLoadActionDispatch: (
    slice: ArticleItemStoreSlice,
    options: ArticleItemStoreLoadActionOptions
  ) => ArticleItemStoreLoadActionDispatch;

  readonly useStoreLoadActionOutput: (
    slice: ArticleItemStoreSlice,
    input: ArticleItemStoreLoadActionInput
  ) => ArticleItemStoreLoadActionOutput;

  readonly useStoreLoadCompletedActionDispatch: (
    slice: ArticleItemStoreSlice,
    options: ArticleItemStoreLoadCompletedActionOptions
  ) => ArticleItemStoreLoadCompletedActionDispatch;

  readonly useStoreSaveActionDispatch: (
    slice: ArticleItemStoreSlice,
    options: ArticleItemStoreSaveActionOptions
  ) => ArticleItemStoreSaveActionDispatch;

  readonly useStoreSaveActionOutput: (
    slice: ArticleItemStoreSlice,
    input?: ArticleItemStoreSaveActionInput
  ) => ArticleItemStoreSaveActionOutput;

  readonly useStoreSaveCompletedActionDispatch: (
    slice: ArticleItemStoreSlice,
    options: ArticleItemStoreSaveCompletedActionOptions
  ) => ArticleItemStoreSaveCompletedActionDispatch;

  readonly useStoreSetActionDispatch: (
    slice: ArticleItemStoreSlice,
    options: ArticleItemStoreSetActionOptions
  ) => ArticleItemStoreSetActionDispatch;

  readonly useStoreSetActionOutput: (
    slice: ArticleItemStoreSlice,
    input: ArticleItemStoreSetActionInput
  ) => ArticleItemStoreSetActionOutput;

  readonly useStoreState: (slice: ArticleItemStoreSlice) => ArticleItemStoreState;
}
