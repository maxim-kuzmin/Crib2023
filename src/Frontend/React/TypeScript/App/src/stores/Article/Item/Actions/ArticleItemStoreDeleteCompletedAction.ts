import { type StoreAction } from '../../../../common';
import { type ArticleItemStoreDeleteCompletedActionPayload } from '../../../../features';
import { type ArticleItemStoreActionType } from '../ArticleItemStoreActionType';

export interface ArticleItemStoreDeleteCompletedAction extends StoreAction {
  type: ArticleItemStoreActionType.DeleteCompleted;
  payload: ArticleItemStoreDeleteCompletedActionPayload;
}
