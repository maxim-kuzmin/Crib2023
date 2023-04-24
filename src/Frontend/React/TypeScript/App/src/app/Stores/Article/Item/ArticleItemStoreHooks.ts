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
import { type ArticleItemStoreState } from './ArticleItemStoreState';

export interface ArticleItemStoreHooks {
  readonly useStoreClearActionDispatch: (
    sliceName: string,
    options: ArticleItemStoreClearActionOptions
  ) => ArticleItemStoreClearActionDispatch;

  readonly useStoreClearActionOutput: (
    sliceName: string,
    input: ArticleItemStoreClearActionInput
  ) => ArticleItemStoreClearActionOutput;

  readonly useStoreDeleteActionDispatch: (
    sliceName: string,
    options: ArticleItemStoreDeleteActionOptions
  ) => ArticleItemStoreDeleteActionDispatch;

  readonly useStoreDeleteActionOutput: (
    sliceName: string,
    input?: ArticleItemStoreDeleteActionInput
  ) => ArticleItemStoreDeleteActionOutput;

  readonly useStoreDeleteCompletedActionDispatch: (
    sliceName: string,
    options: ArticleItemStoreDeleteCompletedActionOptions
  ) => ArticleItemStoreDeleteCompletedActionDispatch;

  readonly useStoreLoadActionDispatch: (
    sliceName: string,
    options: ArticleItemStoreLoadActionOptions
  ) => ArticleItemStoreLoadActionDispatch;

  readonly useStoreLoadActionOutput: (
    sliceName: string,
    input: ArticleItemStoreLoadActionInput
  ) => ArticleItemStoreLoadActionOutput;

  readonly useStoreLoadCompletedActionDispatch: (
    sliceName: string,
    options: ArticleItemStoreLoadCompletedActionOptions
  ) => ArticleItemStoreLoadCompletedActionDispatch;

  readonly useStoreSaveActionDispatch: (
    sliceName: string,
    options: ArticleItemStoreSaveActionOptions
  ) => ArticleItemStoreSaveActionDispatch;

  readonly useStoreSaveActionOutput: (
    sliceName: string,
    input?: ArticleItemStoreSaveActionInput
  ) => ArticleItemStoreSaveActionOutput;

  readonly useStoreSaveCompletedActionDispatch: (
    sliceName: string,
    options: ArticleItemStoreSaveCompletedActionOptions
  ) => ArticleItemStoreSaveCompletedActionDispatch;

  readonly useStoreSetActionDispatch: (
    sliceName: string,
    options: ArticleItemStoreSetActionOptions
  ) => ArticleItemStoreSetActionDispatch;

  readonly useStoreSetActionOutput: (
    sliceName: string,
    input: ArticleItemStoreSetActionInput
  ) => ArticleItemStoreSetActionOutput;

  readonly useStoreState: (sliceName: string) => ArticleItemStoreState;
}
