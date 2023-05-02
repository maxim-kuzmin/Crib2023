import { type ArticleItemStoreSetActionCallback } from './ArticleItemStoreSetActionCallback';

export interface ArticleItemStoreSetActionInput {
  readonly onActionCompleted?: ArticleItemStoreSetActionCallback;
}
