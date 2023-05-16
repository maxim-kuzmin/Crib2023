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
import { type ArticleItemStoreSliceName } from './Slice';
import { type ArticleItemStoreResource } from './ArticleItemStoreResource';
import { type ArticleItemStoreState } from './ArticleItemStoreState';

export interface ArticleItemStoreHooks {
  readonly useResource: () => ArticleItemStoreResource;

  readonly useStoreClearActionDispatch: (
    sliceName: ArticleItemStoreSliceName,
    options: ArticleItemStoreClearActionOptions
  ) => ArticleItemStoreClearActionDispatch;

  readonly useStoreClearActionOutput: (
    sliceName: ArticleItemStoreSliceName,
    input: ArticleItemStoreClearActionInput
  ) => ArticleItemStoreClearActionOutput;

  readonly useStoreDeleteActionDispatch: (
    sliceName: ArticleItemStoreSliceName,
    options: ArticleItemStoreDeleteActionOptions
  ) => ArticleItemStoreDeleteActionDispatch;

  readonly useStoreDeleteActionOutput: (
    sliceName: ArticleItemStoreSliceName,
    input?: ArticleItemStoreDeleteActionInput
  ) => ArticleItemStoreDeleteActionOutput;

  readonly useStoreDeleteCompletedActionDispatch: (
    sliceName: ArticleItemStoreSliceName,
    options: ArticleItemStoreDeleteCompletedActionOptions
  ) => ArticleItemStoreDeleteCompletedActionDispatch;

  readonly useStoreLoadActionDispatch: (
    sliceName: ArticleItemStoreSliceName,
    options: ArticleItemStoreLoadActionOptions
  ) => ArticleItemStoreLoadActionDispatch;

  readonly useStoreLoadActionOutput: (
    sliceName: ArticleItemStoreSliceName,
    input: ArticleItemStoreLoadActionInput
  ) => ArticleItemStoreLoadActionOutput;

  readonly useStoreLoadCompletedActionDispatch: (
    sliceName: ArticleItemStoreSliceName,
    options: ArticleItemStoreLoadCompletedActionOptions
  ) => ArticleItemStoreLoadCompletedActionDispatch;

  readonly useStoreSaveActionDispatch: (
    sliceName: ArticleItemStoreSliceName,
    options: ArticleItemStoreSaveActionOptions
  ) => ArticleItemStoreSaveActionDispatch;

  readonly useStoreSaveActionOutput: (
    sliceName: ArticleItemStoreSliceName,
    input?: ArticleItemStoreSaveActionInput
  ) => ArticleItemStoreSaveActionOutput;

  readonly useStoreSaveCompletedActionDispatch: (
    sliceName: ArticleItemStoreSliceName,
    options: ArticleItemStoreSaveCompletedActionOptions
  ) => ArticleItemStoreSaveCompletedActionDispatch;

  readonly useStoreSetActionDispatch: (
    sliceName: ArticleItemStoreSliceName,
    options: ArticleItemStoreSetActionOptions
  ) => ArticleItemStoreSetActionDispatch;

  readonly useStoreSetActionOutput: (
    sliceName: ArticleItemStoreSliceName,
    input: ArticleItemStoreSetActionInput
  ) => ArticleItemStoreSetActionOutput;

  readonly useStoreState: (sliceName: ArticleItemStoreSliceName) => ArticleItemStoreState;
}
