import { type ArticleItemStoreDeleteActionPayload } from '../../../../app/Stores';
import { type StoreAction } from '../../../../common';
import { type ArticleItemStoreActionType } from '../ArticleItemStoreActionType';

export interface ArticleItemStoreDeleteAction extends StoreAction {
  type: ArticleItemStoreActionType.Delete;
  payload: ArticleItemStoreDeleteActionPayload;
}
