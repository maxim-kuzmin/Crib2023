import {
  type StoreAction,
  type ArticleItemStoreActionType,
  type ArticleItemStoreSetActionPayload
} from '../../../../all';

export interface ArticleItemStoreSetAction extends StoreAction {
  type: ArticleItemStoreActionType.Set;
  payload: ArticleItemStoreSetActionPayload;
}
