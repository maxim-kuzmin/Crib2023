import { type StoreActionWithPayload, createStoreActionWithPayload } from '../../../../common';
import { type ArticleItemStoreClearActionPayload } from '../../../../features';
import { ArticleItemStoreActionType } from '../ArticleItemStoreActionType';

export interface ArticleItemStoreClearAction
  extends StoreActionWithPayload<ArticleItemStoreClearActionPayload> {
  readonly type: ArticleItemStoreActionType.Clear;
}

export function createArticleItemStoreClearAction (
  payload: ArticleItemStoreClearActionPayload
): ArticleItemStoreClearAction {
  const base = createStoreActionWithPayload(payload);

  return {
    ...base,
    type: ArticleItemStoreActionType.Clear
  };
}
