import { type StoreAction, type ArticleItemStoreActionType } from '../../../../all';

export interface ArticleItemStoreClearAction extends StoreAction {
  type: ArticleItemStoreActionType.Clear;
}
