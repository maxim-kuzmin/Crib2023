import {
  type ArticleListStoreClearActionInput,
  type ArticleListStoreClearActionOutput,
  type ArticleListStoreLoadActionInput,
  type ArticleListStoreLoadActionOutput,
  type ArticleListStoreSetActionInput,
  type ArticleListStoreSetActionOutput
} from './Actions';
import { type ArticleListStoreSliceName } from './Slice';
import { type ArticleListStoreResource } from './ArticleListStoreResource';
import { type ArticleListStoreState } from './ArticleListStoreState';

export interface ArticleListStoreHooks {
  readonly useResource: () => ArticleListStoreResource;

  readonly useStoreClearActionOutput: (
    sliceName: ArticleListStoreSliceName,
    input: ArticleListStoreClearActionInput
  ) => ArticleListStoreClearActionOutput;

  readonly useStoreLoadActionOutput: (
    sliceName: ArticleListStoreSliceName,
    input: ArticleListStoreLoadActionInput
  ) => ArticleListStoreLoadActionOutput;

  readonly useStoreSetActionOutput: (
    sliceName: ArticleListStoreSliceName,
    input: ArticleListStoreSetActionInput
  ) => ArticleListStoreSetActionOutput;

  readonly useStoreState: (sliceName: ArticleListStoreSliceName) => ArticleListStoreState;
}
