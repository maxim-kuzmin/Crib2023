import { type ArticleItemStoreLoadCompletedActionCallback } from '../LoadCompleted';

export interface ArticleItemStoreLoadActionInput {
  readonly articleId: number;
  readonly isCanceled?: boolean;
  readonly onActionCompleted?: ArticleItemStoreLoadCompletedActionCallback;
}
