import {
  type ArticleItemStoreClearActionInput,
  type ArticleItemStoreClearActionOutput,
  type ArticleItemStoreDeleteActionInput,
  type ArticleItemStoreDeleteActionOutput,
  type ArticleItemStoreLoadActionInput,
  type ArticleItemStoreLoadActionOutput,
  type ArticleItemStoreSaveActionInput,
  type ArticleItemStoreSaveActionOutput,
  type ArticleItemStoreSetActionInput,
  type ArticleItemStoreSetActionOutput
} from '../../../app/Stores';

export interface ArticleItemViewHooks {
  readonly useClearActionOutput: (input: ArticleItemStoreClearActionInput) => ArticleItemStoreClearActionOutput;
  readonly useDeleteActionOutput: (input: ArticleItemStoreDeleteActionInput) => ArticleItemStoreDeleteActionOutput;
  readonly useLoadActionOutput: (input: ArticleItemStoreLoadActionInput) => ArticleItemStoreLoadActionOutput;
  readonly useSaveActionOutput: (input: ArticleItemStoreSaveActionInput) => ArticleItemStoreSaveActionOutput;
  readonly useSetActionOutput: (input: ArticleItemStoreSetActionInput) => ArticleItemStoreSetActionOutput;
}
