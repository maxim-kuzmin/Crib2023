import { type StoreActionPayload, createStoreActionPayload } from '../../../../../../common';
import { type ArticleListStoreSliceName } from '../../Slice';

export interface ArticleListStoreClearActionPayload
  extends StoreActionPayload<ArticleListStoreSliceName> {
}

export function createArticleListStoreClearActionPayload (
  options: ArticleListStoreClearActionPayload
): ArticleListStoreClearActionPayload {
  return createStoreActionPayload(options);
}
