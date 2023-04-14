import { type ArticleItemStoreSetActionPayload } from '../../../../app/Stores';
import { type StoreAction } from '../../../../common';
import { type ArticleItemStoreActionType } from '../ArticleItemStoreActionType';

export interface ArticleItemStoreSetAction extends StoreAction {
  type: ArticleItemStoreActionType.Set;
  payload: ArticleItemStoreSetActionPayload;
}
