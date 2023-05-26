import { type StoreActionWithPayload, createStoreActionWithPayload } from '../../../../common';
import { type ArticleItemStoreDeleteCompletedActionPayload } from '../../../../features';
import { ArticleItemStoreActionType } from '../ArticleItemStoreActionType';

export interface ArticleItemStoreDeleteCompletedAction
  extends StoreActionWithPayload<ArticleItemStoreDeleteCompletedActionPayload> {
  readonly type: ArticleItemStoreActionType.DeleteCompleted;
}

export function createArticleItemStoreDeleteCompletedAction (
  payload: ArticleItemStoreDeleteCompletedActionPayload
): ArticleItemStoreDeleteCompletedAction {
  const base = createStoreActionWithPayload(payload);

  return {
    ...base,
    type: ArticleItemStoreActionType.DeleteCompleted
  };
}
