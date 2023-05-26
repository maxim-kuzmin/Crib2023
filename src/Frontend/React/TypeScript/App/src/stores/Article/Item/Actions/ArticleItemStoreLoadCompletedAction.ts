import { type StoreActionWithPayload, createStoreActionWithPayload } from '../../../../common';
import { type ArticleItemStoreLoadCompletedActionPayload } from '../../../../features';
import { ArticleItemStoreActionType } from '../ArticleItemStoreActionType';

export interface ArticleItemStoreLoadCompletedAction
  extends StoreActionWithPayload<ArticleItemStoreLoadCompletedActionPayload> {
  readonly type: ArticleItemStoreActionType.LoadCompleted;
}

export function createArticleItemStoreLoadCompletedAction (
  options: Omit<ArticleItemStoreLoadCompletedAction, 'type'>
): ArticleItemStoreLoadCompletedAction {
  const { payload } = options;

  const base = createStoreActionWithPayload({ payload });

  return {
    ...base,
    type: ArticleItemStoreActionType.LoadCompleted
  };
}
