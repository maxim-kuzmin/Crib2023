import {
  type ArticleListStoreLoadActionPayload,
  type ArticleListStoreActionType,
  type StoreAction
} from '../../../../all';

export interface ArticleListStoreLoadAction extends StoreAction {
  type: ArticleListStoreActionType.Load;
  payload: ArticleListStoreLoadActionPayload;
}
