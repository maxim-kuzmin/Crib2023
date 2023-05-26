import { type StoreActionWithPayload, createStoreActionWithPayload } from '../../../../common';
import { type ArticleItemStoreDeleteCompletedActionPayload } from '../../../../features';
import { ArticleItemStoreActionType } from '../ArticleItemStoreActionType';

export interface ArticleItemStoreDeleteCompletedAction
  extends StoreActionWithPayload<ArticleItemStoreDeleteCompletedActionPayload> {
  readonly type: ArticleItemStoreActionType.DeleteCompleted;
}

export function createArticleItemStoreDeleteCompletedAction (
  options: Omit<ArticleItemStoreDeleteCompletedAction, 'type'>
): ArticleItemStoreDeleteCompletedAction {
  const { payload } = options;

  const base = createStoreActionWithPayload({ payload });

  return {
    ...base,
    type: ArticleItemStoreActionType.DeleteCompleted
  };
}
