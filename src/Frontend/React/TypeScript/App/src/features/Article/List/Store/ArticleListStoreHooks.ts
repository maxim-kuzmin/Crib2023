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
import { type ArticleListStoreSliceName } from './Slice';
import { type ArticleListStoreResource } from './ArticleListStoreResource';
import { type ArticleListStoreState } from './ArticleListStoreState';

export interface ArticleListStoreHooks {
  readonly useResource: () => ArticleListStoreResource;

  readonly useStoreClearActionDispatch: (
    sliceName: ArticleListStoreSliceName,
    options?: ArticleListStoreClearActionOptions
  ) => ArticleListStoreClearActionDispatch;

  readonly useStoreClearActionOutput: (
    sliceName: ArticleListStoreSliceName,
    input: ArticleListStoreClearActionInput
  ) => ArticleListStoreClearActionOutput;

  readonly useStoreLoadActionDispatch: (
    sliceName: ArticleListStoreSliceName,
    options?: ArticleListStoreLoadActionOptions
  ) => ArticleListStoreLoadActionDispatch;

  readonly useStoreLoadActionOutput: (
    sliceName: ArticleListStoreSliceName,
    input: ArticleListStoreLoadActionInput
  ) => ArticleListStoreLoadActionOutput;

  readonly useStoreLoadCompletedActionDispatch: (
    sliceName: ArticleListStoreSliceName,
    options?: ArticleListStoreLoadCompletedActionOptions
  ) => ArticleListStoreLoadCompletedActionDispatch;

  readonly useStoreSetActionDispatch: (
    sliceName: ArticleListStoreSliceName,
    options?: ArticleListStoreSetActionOptions
  ) => ArticleListStoreSetActionDispatch;

  readonly useStoreSetActionOutput: (
    sliceName: ArticleListStoreSliceName,
    input: ArticleListStoreSetActionInput
  ) => ArticleListStoreSetActionOutput;

  readonly useStoreState: (sliceName: ArticleListStoreSliceName) => ArticleListStoreState;
}
