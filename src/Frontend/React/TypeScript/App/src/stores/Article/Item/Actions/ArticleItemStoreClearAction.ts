import { type StoreActionWithPayload, createStoreActionWithPayload } from '../../../../common';
import { type ArticleItemStoreClearActionPayload } from '../../../../features';
import { ArticleItemStoreActionType } from '../ArticleItemStoreActionType';

export interface ArticleItemStoreClearAction
  extends StoreActionWithPayload<ArticleItemStoreClearActionPayload> {
  readonly type: ArticleItemStoreActionType.Clear;
}

export function createArticleItemStoreClearAction (
  options: Omit<ArticleItemStoreClearAction, 'type'>
): ArticleItemStoreClearAction {
  const { payload } = options;

  const base = createStoreActionWithPayload({ payload });

  return {
    ...base,
    type: ArticleItemStoreActionType.Clear
  };
}
