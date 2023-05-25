import { type ArticleItemStoreSaveCompletedActionResult } from './ArticleItemStoreSaveCompletedActionResult';

export interface ArticleItemStoreSaveCompletedActionPayload {
  actionResult: ArticleItemStoreSaveCompletedActionResult;
}

export function createArticleItemStoreSaveCompletedActionPayload (
  options: Partial<ArticleItemStoreSaveCompletedActionPayload>
): ArticleItemStoreSaveCompletedActionPayload {
  return {
    actionResult: options?.actionResult ?? null,
  };
}
