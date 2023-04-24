import { type ArticleItemStoreDeleteCompletedActionPayload } from '../../../../app';
import { type StoreAction } from '../../../../common';
import { type ArticleItemStoreActionType } from '../ArticleItemStoreActionType';

export interface ArticleItemStoreDeleteCompletedAction extends StoreAction {
  type: ArticleItemStoreActionType.DeleteCompleted;
  payload: ArticleItemStoreDeleteCompletedActionPayload;
}
