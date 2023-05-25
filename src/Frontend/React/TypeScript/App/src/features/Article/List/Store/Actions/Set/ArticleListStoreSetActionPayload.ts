import { type ArticleListStoreSetActionResult } from './ArticleListStoreSetActionResult';

export interface ArticleListStoreSetActionPayload {
  actionResult: ArticleListStoreSetActionResult;
}

export function createArticleListStoreSetActionPayload (
  options: Partial<ArticleListStoreSetActionPayload>
): ArticleListStoreSetActionPayload {
  return {
    actionResult: options?.actionResult ?? null,
  };
}
