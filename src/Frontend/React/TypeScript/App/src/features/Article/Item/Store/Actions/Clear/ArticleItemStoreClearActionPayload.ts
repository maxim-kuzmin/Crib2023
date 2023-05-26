import { type StoreActionPayload, createStoreActionPayload } from '../../../../../../common';
import { type ArticleItemStoreSliceName } from '../../Slice';

export interface ArticleItemStoreClearActionPayload
  extends StoreActionPayload<ArticleItemStoreSliceName> {
}

export function createArticleItemStoreClearActionPayload (
  options: ArticleItemStoreClearActionPayload
): ArticleItemStoreClearActionPayload {
  return createStoreActionPayload(options);
}
