import { type ArticleItemStoreSetActionResult } from './ArticleItemStoreSetActionResult';

export interface ArticleItemStoreSetActionPayload {
  actionResult: ArticleItemStoreSetActionResult;
}

export function createArticleItemStoreSetActionPayload (
  options: Partial<ArticleItemStoreSetActionPayload>
): ArticleItemStoreSetActionPayload {
  return {
    actionResult: options?.actionResult ?? null,
  };
}
