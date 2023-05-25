import { type ArticleItemStoreLoadCompletedActionResult } from './ArticleItemStoreLoadCompletedActionResult';

export interface ArticleItemStoreLoadCompletedActionPayload {
  actionResult: ArticleItemStoreLoadCompletedActionResult;
}

export function createArticleItemStoreLoadCompletedActionPayload (
  options: Partial<ArticleItemStoreLoadCompletedActionPayload>
): ArticleItemStoreLoadCompletedActionPayload {
  return {
    actionResult: options?.actionResult ?? null,
  };
}
