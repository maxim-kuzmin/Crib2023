import { type ArticleItemStoreLoadCompletedActionPayload } from '../../../../app/Stores';
import { type StoreAction } from '../../../../common';
import { type ArticleItemStoreActionType } from '../ArticleItemStoreActionType';

export interface ArticleItemStoreLoadCompletedAction extends StoreAction {
  type: ArticleItemStoreActionType.LoadCompleted;
  payload: ArticleItemStoreLoadCompletedActionPayload;
}
