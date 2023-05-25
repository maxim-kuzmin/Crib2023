import { type ArticleListStoreLoadCompletedActionResult } from './ArticleListStoreLoadCompletedActionResult';

export interface ArticleListStoreLoadCompletedActionPayload {
  actionResult: ArticleListStoreLoadCompletedActionResult;
}

export function createArticleListStoreLoadCompletedActionPayload (
  options: Partial<ArticleListStoreLoadCompletedActionPayload>
): ArticleListStoreLoadCompletedActionPayload {
  return {
    actionResult: options?.actionResult ?? null,
  };
}
