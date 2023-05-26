import { type StoreActionWithPayload, createStoreActionWithPayload } from '../../../../common';
import { type ArticleItemStoreSaveCompletedActionPayload } from '../../../../features';
import { ArticleItemStoreActionType } from '../ArticleItemStoreActionType';

export interface ArticleItemStoreSaveCompletedAction
  extends StoreActionWithPayload<ArticleItemStoreSaveCompletedActionPayload> {
  readonly type: ArticleItemStoreActionType.SaveCompleted;
}

export function createArticleItemStoreSaveCompletedAction (
  payload: ArticleItemStoreSaveCompletedActionPayload
): ArticleItemStoreSaveCompletedAction {
  const base = createStoreActionWithPayload(payload);

  return {
    ...base,
    type: ArticleItemStoreActionType.SaveCompleted
  };
}
