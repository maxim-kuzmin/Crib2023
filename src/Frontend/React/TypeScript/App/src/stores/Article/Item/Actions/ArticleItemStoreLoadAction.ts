import {
  type ArticleItemStoreLoadActionPayload,
  type ArticleItemStoreActionType
} from '../../../../all';

export interface ArticleItemStoreLoadAction {
  type: ArticleItemStoreActionType.Load;
  payload: ArticleItemStoreLoadActionPayload;
}
