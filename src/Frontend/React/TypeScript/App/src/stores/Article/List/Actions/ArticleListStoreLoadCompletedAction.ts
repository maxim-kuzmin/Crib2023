import { type ArticleListStoreLoadCompletedActionPayload } from '../../../../app';
import { type StoreAction } from '../../../../common';
import { type ArticleListStoreActionType } from '../ArticleListStoreActionType';

export interface ArticleListStoreLoadCompletedAction extends StoreAction {
  type: ArticleListStoreActionType.LoadCompleted;
  payload: ArticleListStoreLoadCompletedActionPayload;
}
