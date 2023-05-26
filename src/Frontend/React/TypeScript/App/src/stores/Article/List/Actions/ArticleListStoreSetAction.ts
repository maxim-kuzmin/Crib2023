import { type StoreActionWithPayload, createStoreActionWithPayload } from '../../../../common';
import { type ArticleListStoreSetActionPayload } from '../../../../features';
import { ArticleListStoreActionType } from '../ArticleListStoreActionType';

export interface ArticleListStoreSetAction
  extends StoreActionWithPayload<ArticleListStoreSetActionPayload> {
  readonly type: ArticleListStoreActionType.Set;
}

export function createArticleListStoreSetAction (
  payload: ArticleListStoreSetActionPayload
): ArticleListStoreSetAction {
  const base = createStoreActionWithPayload(payload);

  return {
    ...base,
    type: ArticleListStoreActionType.Set
  };
}
