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
  readonly useClearActionDispatch: (
    sliceName: string,
    options: ArticleItemStoreClearActionOptions
  ) => ArticleItemStoreClearActionDispatch;

  readonly useClearActionOutput: (
    sliceName: string,
    input: ArticleItemStoreClearActionInput
  ) => ArticleItemStoreClearActionOutput;

  readonly useDeleteActionDispatch: (
    sliceName: string,
    options: ArticleItemStoreDeleteActionOptions
  ) => ArticleItemStoreDeleteActionDispatch;

  readonly useDeleteActionOutput: (
    sliceName: string,
    input?: ArticleItemStoreDeleteActionInput
  ) => ArticleItemStoreDeleteActionOutput;

  readonly useDeleteCompletedActionDispatch: (
    sliceName: string,
    options: ArticleItemStoreDeleteCompletedActionOptions
  ) => ArticleItemStoreDeleteCompletedActionDispatch;

  readonly useLoadActionDispatch: (
    sliceName: string,
    options: ArticleItemStoreLoadActionOptions
  ) => ArticleItemStoreLoadActionDispatch;

  readonly useLoadActionOutput: (
    sliceName: string,
    input: ArticleItemStoreLoadActionInput
  ) => ArticleItemStoreLoadActionOutput;

  readonly useLoadCompletedActionDispatch: (
    sliceName: string,
    options: ArticleItemStoreLoadCompletedActionOptions
  ) => ArticleItemStoreLoadCompletedActionDispatch;

  readonly useSaveActionDispatch: (
    sliceName: string,
    options: ArticleItemStoreSaveActionOptions
  ) => ArticleItemStoreSaveActionDispatch;

  readonly useSaveActionOutput: (
    sliceName: string,
    input?: ArticleItemStoreSaveActionInput
  ) => ArticleItemStoreSaveActionOutput;

  readonly useSaveCompletedActionDispatch: (
    sliceName: string,
    options: ArticleItemStoreSaveCompletedActionOptions
  ) => ArticleItemStoreSaveCompletedActionDispatch;

  readonly useSetActionDispatch: (
    sliceName: string,
    options: ArticleItemStoreSetActionOptions
  ) => ArticleItemStoreSetActionDispatch;

  readonly useSetActionOutput: (
    sliceName: string,
    input: ArticleItemStoreSetActionInput
  ) => ArticleItemStoreSetActionOutput;

  readonly useStoreState: (sliceName: string) => ArticleItemStoreState;
}
