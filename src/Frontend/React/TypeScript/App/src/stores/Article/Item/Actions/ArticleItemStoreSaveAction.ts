import { type StoreActionWithPayload, createStoreActionWithPayload } from '../../../../common';
import { type ArticleItemStoreSaveActionPayload } from '../../../../features';
import { ArticleItemStoreActionType } from '../ArticleItemStoreActionType';

export interface ArticleItemStoreSaveAction
  extends StoreActionWithPayload<ArticleItemStoreSaveActionPayload> {
  readonly type: ArticleItemStoreActionType.Save;
}

export function createArticleItemStoreSaveAction (
  options: Omit<ArticleItemStoreSaveAction, 'type'>
): ArticleItemStoreSaveAction {
  const { payload } = options;

  const base = createStoreActionWithPayload({ payload });

  return {
    ...base,
    type: ArticleItemStoreActionType.Save
  };
}
