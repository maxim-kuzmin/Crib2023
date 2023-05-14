import {
  type ArticleListStoreClearActionDispatch,
  type ArticleListStoreClearActionInput,
  type ArticleListStoreClearActionOptions,
  type ArticleListStoreClearActionOutput,
  type ArticleListStoreLoadActionDispatch,
  type ArticleListStoreLoadActionInput,
  type ArticleListStoreLoadActionOptions,
  type ArticleListStoreLoadActionOutput,
  type ArticleListStoreLoadCompletedActionDispatch,
  type ArticleListStoreLoadCompletedActionOptions,
  type ArticleListStoreSetActionDispatch,
  type ArticleListStoreSetActionInput,
  type ArticleListStoreSetActionOptions,
  type ArticleListStoreSetActionOutput
} from './Actions';
import { type ArticleListStoreSlice } from './ArticleListStoreSlice';
import { type ArticleListStoreResource } from './ArticleListStoreResource';
import { type ArticleListStoreState } from './ArticleListStoreState';

export interface ArticleListStoreHooks {
  readonly useResource: () => ArticleListStoreResource;

  readonly useStoreClearActionDispatch: (
    slice: ArticleListStoreSlice,
    options: ArticleListStoreClearActionOptions
  ) => ArticleListStoreClearActionDispatch;

  readonly useStoreClearActionOutput: (
    slice: ArticleListStoreSlice,
    input: ArticleListStoreClearActionInput
  ) => ArticleListStoreClearActionOutput;

  readonly useStoreLoadActionDispatch: (
    slice: ArticleListStoreSlice,
    options: ArticleListStoreLoadActionOptions
  ) => ArticleListStoreLoadActionDispatch;

  readonly useStoreLoadActionOutput: (
    slice: ArticleListStoreSlice,
    input: ArticleListStoreLoadActionInput
  ) => ArticleListStoreLoadActionOutput;

  readonly useStoreLoadCompletedActionDispatch: (
    slice: ArticleListStoreSlice,
    options: ArticleListStoreLoadCompletedActionOptions
  ) => ArticleListStoreLoadCompletedActionDispatch;

  readonly useStoreSetActionDispatch: (
    slice: ArticleListStoreSlice,
    options: ArticleListStoreSetActionOptions
  ) => ArticleListStoreSetActionDispatch;

  readonly useStoreSetActionOutput: (
    slice: ArticleListStoreSlice,
    input: ArticleListStoreSetActionInput
  ) => ArticleListStoreSetActionOutput;

  readonly useStoreState: (slice: ArticleListStoreSlice) => ArticleListStoreState;
}
