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
import { type ArticleListStoreState } from './ArticleListStoreState';

export interface ArticleListStoreHooks {
  readonly useClearActionDispatch: (
    sliceName: string,
    options: ArticleListStoreClearActionOptions
  ) => ArticleListStoreClearActionDispatch;

  readonly useClearActionOutput: (
    sliceName: string,
    input: ArticleListStoreClearActionInput
  ) => ArticleListStoreClearActionOutput;

  readonly useLoadActionDispatch: (
    sliceName: string,
    options: ArticleListStoreLoadActionOptions
  ) => ArticleListStoreLoadActionDispatch;

  readonly useLoadActionOutput: (
    sliceName: string,
    input: ArticleListStoreLoadActionInput
  ) => ArticleListStoreLoadActionOutput;

  readonly useLoadCompletedActionDispatch: (
    sliceName: string,
    options: ArticleListStoreLoadCompletedActionOptions
  ) => ArticleListStoreLoadCompletedActionDispatch;

  readonly useSetActionDispatch: (
    sliceName: string,
    options: ArticleListStoreSetActionOptions
  ) => ArticleListStoreSetActionDispatch;

  readonly useSetActionOutput: (
    sliceName: string,
    input: ArticleListStoreSetActionInput
  ) => ArticleListStoreSetActionOutput;

  readonly useStoreState: (sliceName: string) => ArticleListStoreState;
}
