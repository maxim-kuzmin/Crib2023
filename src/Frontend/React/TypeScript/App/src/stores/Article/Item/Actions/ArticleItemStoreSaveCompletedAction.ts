import { type StoreAction } from '../../../../common';
import { type ArticleItemStoreSaveCompletedActionPayload } from '../../../../features';
import { type ArticleItemStoreActionType } from '../ArticleItemStoreActionType';

export interface ArticleItemStoreSaveCompletedAction extends StoreAction {
  type: ArticleItemStoreActionType.SaveCompleted;
  payload: ArticleItemStoreSaveCompletedActionPayload;
}
