import { type ArticleItemStoreSaveCompletedActionCallback } from '../SaveCompleted';

export interface ArticleItemStoreSaveActionInput {
  readonly onActionCompleted?: ArticleItemStoreSaveCompletedActionCallback;
}
