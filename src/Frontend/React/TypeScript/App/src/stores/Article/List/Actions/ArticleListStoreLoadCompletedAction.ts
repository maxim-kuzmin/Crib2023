import { type StoreAction } from '../../../../common';
import { type ArticleListStoreLoadCompletedActionPayload } from '../../../../features';
import { type ArticleListStoreActionType } from '../ArticleListStoreActionType';

export interface ArticleListStoreLoadCompletedAction extends StoreAction {
  type: ArticleListStoreActionType.LoadCompleted;
  payload: ArticleListStoreLoadCompletedActionPayload;
}
