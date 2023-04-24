import { type ArticleItemStoreSaveCompletedActionPayload } from '../../../../app';
import { type StoreAction } from '../../../../common';
import { type ArticleItemStoreActionType } from '../ArticleItemStoreActionType';

export interface ArticleItemStoreSaveCompletedAction extends StoreAction {
  type: ArticleItemStoreActionType.SaveCompleted;
  payload: ArticleItemStoreSaveCompletedActionPayload;
}
