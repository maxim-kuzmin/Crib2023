import { type StoreAction, type ArticleListStoreActionType } from '../../../../all';

export interface ArticleListStoreClearAction extends StoreAction {
  type: ArticleListStoreActionType.Clear;
}
