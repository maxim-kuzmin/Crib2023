import { type ArticleListStoreLoadCompletedActionPayload } from '../../../../app/Stores';
import { type StoreAction } from '../../../../common';
import { type ArticleListStoreActionType } from '../ArticleListStoreActionType';

export interface ArticleListStoreLoadCompletedAction extends StoreAction {
  type: ArticleListStoreActionType.LoadCompleted;
  payload: ArticleListStoreLoadCompletedActionPayload;
}
