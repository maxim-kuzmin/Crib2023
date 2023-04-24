import { type ArticleItemStoreSetActionPayload } from '../../../../app';
import { type StoreAction } from '../../../../common';
import { type ArticleItemStoreActionType } from '../ArticleItemStoreActionType';

export interface ArticleItemStoreSetAction extends StoreAction {
  type: ArticleItemStoreActionType.Set;
  payload: ArticleItemStoreSetActionPayload;
}
