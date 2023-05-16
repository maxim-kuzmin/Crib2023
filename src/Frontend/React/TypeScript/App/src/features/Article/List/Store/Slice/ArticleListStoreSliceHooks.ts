import {
  type ArticleListStoreClearActionInput,
  type ArticleListStoreClearActionOutput,
  type ArticleListStoreLoadActionInput,
  type ArticleListStoreLoadActionOutput,
  type ArticleListStoreSetActionInput,
  type ArticleListStoreSetActionOutput
} from '../Actions';
import { type ArticleListStoreResource } from '../ArticleListStoreResource';
import { type ArticleListStoreState } from '../ArticleListStoreState';

export interface ArticleListStoreSliceHooks {
  readonly useStoreClearActionOutput: (
    input: ArticleListStoreClearActionInput
  ) => ArticleListStoreClearActionOutput;

  readonly useStoreLoadActionOutput: (
    input: ArticleListStoreLoadActionInput
  ) => ArticleListStoreLoadActionOutput;

  readonly useStoreSetActionOutput: (
    input: ArticleListStoreSetActionInput
  ) => ArticleListStoreSetActionOutput;

  readonly useStoreState: () => ArticleListStoreState;
}
