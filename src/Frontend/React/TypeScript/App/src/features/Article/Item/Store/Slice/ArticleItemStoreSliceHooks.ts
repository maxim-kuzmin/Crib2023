import {
  type ArticleItemStoreClearActionOutput,
  type ArticleItemStoreDeleteActionInput,
  type ArticleItemStoreDeleteActionOutput,
  type ArticleItemStoreLoadActionInput,
  type ArticleItemStoreLoadActionOutput,
  type ArticleItemStoreSaveActionInput,
  type ArticleItemStoreSaveActionOutput,
  type ArticleItemStoreSetActionOutput
} from '../Actions';
import { type ArticleItemStoreState } from '../ArticleItemStoreState';

export interface ArticleItemStoreSliceHooks {
  readonly useStoreClearActionOutput: () => ArticleItemStoreClearActionOutput;

  readonly useStoreDeleteActionOutput: (
    input?: ArticleItemStoreDeleteActionInput
  ) => ArticleItemStoreDeleteActionOutput;

  readonly useStoreLoadActionOutput: (
    input: ArticleItemStoreLoadActionInput
  ) => ArticleItemStoreLoadActionOutput;

  readonly useStoreSaveActionOutput: (
    input?: ArticleItemStoreSaveActionInput
  ) => ArticleItemStoreSaveActionOutput;

  readonly useStoreSetActionOutput: () => ArticleItemStoreSetActionOutput;

  readonly useStoreState: () => ArticleItemStoreState;
}
