import { type StoreActionWithPayload, createStoreActionWithPayload } from '../../../../common';
import { type ArticleItemStoreSetActionPayload } from '../../../../features';
import { ArticleItemStoreActionType } from '../ArticleItemStoreActionType';

export interface ArticleItemStoreSetAction
  extends StoreActionWithPayload<ArticleItemStoreSetActionPayload> {
  readonly type: ArticleItemStoreActionType.Set;
}

export function createArticleItemStoreSetAction (
  options: Omit<ArticleItemStoreSetAction, 'type'>
): ArticleItemStoreSetAction {
  const { payload } = options;

  const base = createStoreActionWithPayload({ payload });

  return {
    ...base,
    type: ArticleItemStoreActionType.Set
  };
}
