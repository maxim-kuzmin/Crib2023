import { type ArticleItemStoreSaveActionPayload } from '../../../../app';
import { type StoreAction } from '../../../../common';
import { type ArticleItemStoreActionType } from '../ArticleItemStoreActionType';

export interface ArticleItemStoreSaveAction extends StoreAction {
  type: ArticleItemStoreActionType.Save;
  payload: ArticleItemStoreSaveActionPayload;
}
