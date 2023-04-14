import { type ArticleListStoreLoadActionPayload } from '../../../../app/Stores';
import { type StoreAction } from '../../../../common';
import { type ArticleListStoreActionType } from '../ArticleListStoreActionType';

export interface ArticleListStoreLoadAction extends StoreAction {
  type: ArticleListStoreActionType.Load;
  payload: ArticleListStoreLoadActionPayload;
}
