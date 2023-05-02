import { type StoreAction } from '../../../../common';
import { type ArticleListStoreSetActionPayload } from '../../../../features';
import { type ArticleListStoreActionType } from '../ArticleListStoreActionType';

export interface ArticleListStoreSetAction extends StoreAction {
  type: ArticleListStoreActionType.Set;
  payload: ArticleListStoreSetActionPayload;
}
