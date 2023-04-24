import { type ArticleItemStoreDeleteActionPayload } from '../../../../app';
import { type StoreAction } from '../../../../common';
import { type ArticleItemStoreActionType } from '../ArticleItemStoreActionType';

export interface ArticleItemStoreDeleteAction extends StoreAction {
  type: ArticleItemStoreActionType.Delete;
  payload: ArticleItemStoreDeleteActionPayload;
}
