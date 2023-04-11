import {
  type ArticleItemStoreActionType,
  type ArticleItemStoreSetActionPayload
} from '../../../../all';

export interface ArticleItemStoreSetAction {
  type: ArticleItemStoreActionType.Set;
  payload: ArticleItemStoreSetActionPayload;
}
