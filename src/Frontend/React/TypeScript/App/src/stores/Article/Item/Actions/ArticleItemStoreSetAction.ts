import { type StoreAction } from '../../../../common';
import { type ArticleItemStoreSetActionPayload } from '../../../../features';
import { type ArticleItemStoreActionType } from '../ArticleItemStoreActionType';

export interface ArticleItemStoreSetAction extends StoreAction {
  type: ArticleItemStoreActionType.Set;
  payload: ArticleItemStoreSetActionPayload;
}
