import { type ArticleItemStoreDeleteCompletedActionResult } from './ArticleItemStoreDeleteCompletedActionResult';

export interface ArticleItemStoreDeleteCompletedActionPayload {
  actionResult: ArticleItemStoreDeleteCompletedActionResult;
}

export function createArticleItemStoreDeleteCompletedActionPayload (
  options: Partial<ArticleItemStoreDeleteCompletedActionPayload>
): ArticleItemStoreDeleteCompletedActionPayload {
  return {
    actionResult: options?.actionResult ?? null,
  };
}
