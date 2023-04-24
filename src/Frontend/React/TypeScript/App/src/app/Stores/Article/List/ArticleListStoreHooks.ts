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
import { type ArticleListStoreResource } from './ArticleListStoreResource';
import { type ArticleListStoreState } from './ArticleListStoreState';

export interface ArticleListStoreHooks {
  readonly useResource: () => ArticleListStoreResource;

  readonly useStoreClearActionDispatch: (
    sliceName: string,
    options: ArticleListStoreClearActionOptions
  ) => ArticleListStoreClearActionDispatch;

  readonly useStoreClearActionOutput: (
    sliceName: string,
    input: ArticleListStoreClearActionInput
  ) => ArticleListStoreClearActionOutput;

  readonly useStoreLoadActionDispatch: (
    sliceName: string,
    options: ArticleListStoreLoadActionOptions
  ) => ArticleListStoreLoadActionDispatch;

  readonly useStoreLoadActionOutput: (
    sliceName: string,
    input: ArticleListStoreLoadActionInput
  ) => ArticleListStoreLoadActionOutput;

  readonly useStoreLoadCompletedActionDispatch: (
    sliceName: string,
    options: ArticleListStoreLoadCompletedActionOptions
  ) => ArticleListStoreLoadCompletedActionDispatch;

  readonly useStoreSetActionDispatch: (
    sliceName: string,
    options: ArticleListStoreSetActionOptions
  ) => ArticleListStoreSetActionDispatch;

  readonly useStoreSetActionOutput: (
    sliceName: string,
    input: ArticleListStoreSetActionInput
  ) => ArticleListStoreSetActionOutput;

  readonly useStoreState: (sliceName: string) => ArticleListStoreState;
}
