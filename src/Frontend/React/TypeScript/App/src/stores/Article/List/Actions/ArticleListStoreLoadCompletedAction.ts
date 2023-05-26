import { type StoreActionWithPayload, createStoreActionWithPayload } from '../../../../common';
import { type ArticleListStoreLoadCompletedActionPayload } from '../../../../features';
import { ArticleListStoreActionType } from '../ArticleListStoreActionType';

export interface ArticleListStoreLoadCompletedAction
  extends StoreActionWithPayload<ArticleListStoreLoadCompletedActionPayload> {
  readonly type: ArticleListStoreActionType.LoadCompleted;
}

export function createArticleListStoreLoadCompletedAction (
  payload: ArticleListStoreLoadCompletedActionPayload
): ArticleListStoreLoadCompletedAction {
  const base = createStoreActionWithPayload(payload);

  return {
    ...base,
    type: ArticleListStoreActionType.LoadCompleted
  };
}
