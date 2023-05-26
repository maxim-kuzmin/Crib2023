import { type StoreActionWithPayload, createStoreActionWithPayload } from '../../../../common';
import { type ArticleItemStoreDeleteActionPayload } from '../../../../features';
import { ArticleItemStoreActionType } from '../ArticleItemStoreActionType';

export interface ArticleItemStoreDeleteAction
  extends StoreActionWithPayload<ArticleItemStoreDeleteActionPayload> {
  readonly type: ArticleItemStoreActionType.Delete;
}

export function createArticleItemStoreDeleteAction (
  payload: ArticleItemStoreDeleteActionPayload
): ArticleItemStoreDeleteAction {
  const base = createStoreActionWithPayload(payload);

  return {
    ...base,
    type: ArticleItemStoreActionType.Delete
  };
}
