import { type ArticleListStoreLoadActionPayload } from '../../../../app';
import { type StoreAction } from '../../../../common';
import { type ArticleListStoreActionType } from '../ArticleListStoreActionType';

export interface ArticleListStoreLoadAction extends StoreAction {
  type: ArticleListStoreActionType.Load;
  payload: ArticleListStoreLoadActionPayload;
}
