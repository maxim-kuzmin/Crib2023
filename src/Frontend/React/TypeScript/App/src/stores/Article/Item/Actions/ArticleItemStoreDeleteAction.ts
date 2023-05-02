import { type StoreAction } from '../../../../common';
import { type ArticleItemStoreDeleteActionPayload } from '../../../../features';
import { type ArticleItemStoreActionType } from '../ArticleItemStoreActionType';

export interface ArticleItemStoreDeleteAction extends StoreAction {
  type: ArticleItemStoreActionType.Delete;
  payload: ArticleItemStoreDeleteActionPayload;
}
