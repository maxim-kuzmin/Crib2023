import {
  type ArticleListStoreClearActionOutput,
  type ArticleListStoreLoadActionInput,
  type ArticleListStoreLoadActionOutput,
  type ArticleListStoreSetActionOutput
} from '../Actions';
import { type ArticleListStoreState } from '../ArticleListStoreState';

export interface ArticleListStoreSliceHooks {
  readonly useStoreClearActionOutput: () => ArticleListStoreClearActionOutput;

  readonly useStoreLoadActionOutput: (
    input: ArticleListStoreLoadActionInput
  ) => ArticleListStoreLoadActionOutput;

  readonly useStoreSetActionOutput: () => ArticleListStoreSetActionOutput;

  readonly useStoreState: () => ArticleListStoreState;
}
