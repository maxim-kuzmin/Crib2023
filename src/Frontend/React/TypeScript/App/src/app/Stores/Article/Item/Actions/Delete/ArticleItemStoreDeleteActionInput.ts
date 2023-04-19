import { type ArticleItemStoreDeleteCompletedActionCallback } from '../DeleteCompleted';

export interface ArticleItemStoreDeleteActionInput {
  readonly onActionCompleted?: ArticleItemStoreDeleteCompletedActionCallback;
}
