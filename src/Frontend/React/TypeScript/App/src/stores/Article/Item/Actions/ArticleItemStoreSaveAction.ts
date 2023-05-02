import { type StoreAction } from '../../../../common';
import { type ArticleItemStoreSaveActionPayload } from '../../../../features';
import { type ArticleItemStoreActionType } from '../ArticleItemStoreActionType';

export interface ArticleItemStoreSaveAction extends StoreAction {
  type: ArticleItemStoreActionType.Save;
  payload: ArticleItemStoreSaveActionPayload;
}
