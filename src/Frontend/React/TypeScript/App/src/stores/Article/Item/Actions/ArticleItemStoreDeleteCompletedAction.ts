import { type ArticleItemStoreDeleteCompletedActionPayload } from '../../../../app/Stores';
import { type StoreAction } from '../../../../common';
import { type ArticleItemStoreActionType } from '../ArticleItemStoreActionType';

export interface ArticleItemStoreDeleteCompletedAction extends StoreAction {
  type: ArticleItemStoreActionType.DeleteCompleted;
  payload: ArticleItemStoreDeleteCompletedActionPayload;
}
