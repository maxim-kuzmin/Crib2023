import { type ArticleItemStoreDeleteCompletedActionPayload } from '../DeleteCompleted';

export interface ArticleItemStoreDeleteActionInput {
  readonly articleId: number;
  readonly isCanceled?: boolean;
  readonly onActionCompleted?: (payload: ArticleItemStoreDeleteCompletedActionPayload) => void;
}
