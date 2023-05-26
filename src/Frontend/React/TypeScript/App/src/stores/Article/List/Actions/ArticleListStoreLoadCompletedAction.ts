import { type StoreActionWithPayload, createStoreActionWithPayload } from '../../../../common';
import { type ArticleListStoreLoadCompletedActionPayload } from '../../../../features';
import { ArticleListStoreActionType } from '../ArticleListStoreActionType';

export interface ArticleListStoreLoadCompletedAction
  extends StoreActionWithPayload<ArticleListStoreLoadCompletedActionPayload> {
  readonly type: ArticleListStoreActionType.LoadCompleted;
}

export function createArticleListStoreLoadCompletedAction (
  options: Omit<ArticleListStoreLoadCompletedAction, 'type'>
): ArticleListStoreLoadCompletedAction {
  const { payload } = options;

  const base = createStoreActionWithPayload({ payload });

  return {
    ...base,
    type: ArticleListStoreActionType.LoadCompleted
  };
}
