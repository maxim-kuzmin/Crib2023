import { type ArticleItemStoreLoadCompletedActionPayload } from '../../../../app';
import { type StoreAction } from '../../../../common';
import { type ArticleItemStoreActionType } from '../ArticleItemStoreActionType';

export interface ArticleItemStoreLoadCompletedAction extends StoreAction {
  type: ArticleItemStoreActionType.LoadCompleted;
  payload: ArticleItemStoreLoadCompletedActionPayload;
}
