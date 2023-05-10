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
import { type ArticleItemStoreResource } from './ArticleItemStoreResource';
import { type ArticleItemStoreState } from './ArticleItemStoreState';

export interface ArticleItemStoreHooks {
  readonly useResource: () => ArticleItemStoreResource;

  readonly useStoreClearActionDispatch: (
    owner: string,
    options: ArticleItemStoreClearActionOptions
  ) => ArticleItemStoreClearActionDispatch;

  readonly useStoreClearActionOutput: (
    owner: string,
    input: ArticleItemStoreClearActionInput
  ) => ArticleItemStoreClearActionOutput;

  readonly useStoreDeleteActionDispatch: (
    owner: string,
    options: ArticleItemStoreDeleteActionOptions
  ) => ArticleItemStoreDeleteActionDispatch;

  readonly useStoreDeleteActionOutput: (
    owner: string,
    input?: ArticleItemStoreDeleteActionInput
  ) => ArticleItemStoreDeleteActionOutput;

  readonly useStoreDeleteCompletedActionDispatch: (
    owner: string,
    options: ArticleItemStoreDeleteCompletedActionOptions
  ) => ArticleItemStoreDeleteCompletedActionDispatch;

  readonly useStoreLoadActionDispatch: (
    owner: string,
    options: ArticleItemStoreLoadActionOptions
  ) => ArticleItemStoreLoadActionDispatch;

  readonly useStoreLoadActionOutput: (
    owner: string,
    input: ArticleItemStoreLoadActionInput
  ) => ArticleItemStoreLoadActionOutput;

  readonly useStoreLoadCompletedActionDispatch: (
    owner: string,
    options: ArticleItemStoreLoadCompletedActionOptions
  ) => ArticleItemStoreLoadCompletedActionDispatch;

  readonly useStoreSaveActionDispatch: (
    owner: string,
    options: ArticleItemStoreSaveActionOptions
  ) => ArticleItemStoreSaveActionDispatch;

  readonly useStoreSaveActionOutput: (
    owner: string,
    input?: ArticleItemStoreSaveActionInput
  ) => ArticleItemStoreSaveActionOutput;

  readonly useStoreSaveCompletedActionDispatch: (
    owner: string,
    options: ArticleItemStoreSaveCompletedActionOptions
  ) => ArticleItemStoreSaveCompletedActionDispatch;

  readonly useStoreSetActionDispatch: (
    owner: string,
    options: ArticleItemStoreSetActionOptions
  ) => ArticleItemStoreSetActionDispatch;

  readonly useStoreSetActionOutput: (
    owner: string,
    input: ArticleItemStoreSetActionInput
  ) => ArticleItemStoreSetActionOutput;

  readonly useStoreState: (owner: string) => ArticleItemStoreState;
}
