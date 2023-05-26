import { type StoreActionWithPayload, createStoreActionWithPayload } from '../../../../common';
import { type ArticleListStoreLoadActionPayload } from '../../../../features';
import { ArticleListStoreActionType } from '../ArticleListStoreActionType';

export interface ArticleListStoreLoadAction
  extends StoreActionWithPayload<ArticleListStoreLoadActionPayload> {
  readonly type: ArticleListStoreActionType.Load;
}

export function createArticleListStoreLoadAction (
  options: Omit<ArticleListStoreLoadAction, 'type'>
): ArticleListStoreLoadAction {
  const { payload } = options;

  const base = createStoreActionWithPayload({ payload });

  return {
    ...base,
    type: ArticleListStoreActionType.Load
  };
}
