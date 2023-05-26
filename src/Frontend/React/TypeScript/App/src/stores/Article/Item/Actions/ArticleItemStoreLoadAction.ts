import { type StoreActionWithPayload, createStoreActionWithPayload } from '../../../../common';
import { type ArticleItemStoreLoadActionPayload } from '../../../../features';
import { ArticleItemStoreActionType } from '../ArticleItemStoreActionType';

export interface ArticleItemStoreLoadAction
  extends StoreActionWithPayload<ArticleItemStoreLoadActionPayload> {
  readonly type: ArticleItemStoreActionType.Load;
}

export function createArticleItemStoreLoadAction (
  options: Omit<ArticleItemStoreLoadAction, 'type'>
): ArticleItemStoreLoadAction {
  const { payload } = options;

  const base = createStoreActionWithPayload({ payload });

  return {
    ...base,
    type: ArticleItemStoreActionType.Load
  };
}
