import { type StoreAction } from '../../../../common';
import { type ArticleListStoreLoadActionPayload } from '../../../../features';
import { type ArticleListStoreActionType } from '../ArticleListStoreActionType';

export interface ArticleListStoreLoadAction extends StoreAction {
  type: ArticleListStoreActionType.Load;
  payload: ArticleListStoreLoadActionPayload;
}
