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
    owner: string,
    options: ArticleListStoreClearActionOptions
  ) => ArticleListStoreClearActionDispatch;

  readonly useStoreClearActionOutput: (
    owner: string,
    input: ArticleListStoreClearActionInput
  ) => ArticleListStoreClearActionOutput;

  readonly useStoreLoadActionDispatch: (
    owner: string,
    options: ArticleListStoreLoadActionOptions
  ) => ArticleListStoreLoadActionDispatch;

  readonly useStoreLoadActionOutput: (
    owner: string,
    input: ArticleListStoreLoadActionInput
  ) => ArticleListStoreLoadActionOutput;

  readonly useStoreLoadCompletedActionDispatch: (
    owner: string,
    options: ArticleListStoreLoadCompletedActionOptions
  ) => ArticleListStoreLoadCompletedActionDispatch;

  readonly useStoreSetActionDispatch: (
    owner: string,
    options: ArticleListStoreSetActionOptions
  ) => ArticleListStoreSetActionDispatch;

  readonly useStoreSetActionOutput: (
    owner: string,
    input: ArticleListStoreSetActionInput
  ) => ArticleListStoreSetActionOutput;

  readonly useStoreState: (owner: string) => ArticleListStoreState;
}
