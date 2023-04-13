import {
  type StoreAction,
  type ArticleListStoreActionType,
  type ArticleListStoreSetActionPayload
} from '../../../../all';

export interface ArticleListStoreSetAction extends StoreAction {
  type: ArticleListStoreActionType.Set;
  payload: ArticleListStoreSetActionPayload;
}
