import { type StoreAction } from '../../../../common';
import { type ArticleItemStoreLoadCompletedActionPayload } from '../../../../features';
import { type ArticleItemStoreActionType } from '../ArticleItemStoreActionType';

export interface ArticleItemStoreLoadCompletedAction extends StoreAction {
  type: ArticleItemStoreActionType.LoadCompleted;
  payload: ArticleItemStoreLoadCompletedActionPayload;
}
