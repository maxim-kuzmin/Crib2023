import {
  type ArticleItemStoreLoadActionPayload,
  type ArticleItemStoreActionType,
  type StoreAction
} from '../../../../all';

export interface ArticleItemStoreLoadAction extends StoreAction {
  type: ArticleItemStoreActionType.Load;
  payload: ArticleItemStoreLoadActionPayload;
}
