import { type StoreAction } from '../../../../common';
import { type ArticleItemStoreActionType } from '../ArticleItemStoreActionType';

export interface ArticleItemStoreClearAction extends StoreAction {
  type: ArticleItemStoreActionType.Clear;
}
