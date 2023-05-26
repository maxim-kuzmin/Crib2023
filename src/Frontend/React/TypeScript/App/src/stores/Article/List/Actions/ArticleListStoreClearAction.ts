import { type StoreActionWithPayload, createStoreActionWithPayload } from '../../../../common';
import { type ArticleListStoreClearActionPayload } from '../../../../features';
import { ArticleListStoreActionType } from '../ArticleListStoreActionType';

export interface ArticleListStoreClearAction
  extends StoreActionWithPayload<ArticleListStoreClearActionPayload> {
  readonly type: ArticleListStoreActionType.Clear;
}

export function createArticleListStoreClearAction (
  payload: ArticleListStoreClearActionPayload
): ArticleListStoreClearAction {
  const base = createStoreActionWithPayload(payload);

  return {
    ...base,
    type: ArticleListStoreActionType.Clear
  };
}
