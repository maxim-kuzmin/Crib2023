import { type ArticleItemStoreSaveActionPayload } from '../../../../app/Stores';
import { type StoreAction } from '../../../../common';
import { type ArticleItemStoreActionType } from '../ArticleItemStoreActionType';

export interface ArticleItemStoreSaveAction extends StoreAction {
  type: ArticleItemStoreActionType.Save;
  payload: ArticleItemStoreSaveActionPayload;
}
