import { type StoreAction } from '../../../../common';
import { type ArticleListStoreActionType } from '../ArticleListStoreActionType';

export interface ArticleListStoreClearAction extends StoreAction {
  type: ArticleListStoreActionType.Clear;
}
