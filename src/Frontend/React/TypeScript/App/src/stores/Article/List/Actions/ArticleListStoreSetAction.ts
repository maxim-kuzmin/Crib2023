import { type ArticleListStoreSetActionPayload } from '../../../../app/Stores';
import { type StoreAction } from '../../../../common';
import { type ArticleListStoreActionType } from '../ArticleListStoreActionType';

export interface ArticleListStoreSetAction extends StoreAction {
  type: ArticleListStoreActionType.Set;
  payload: ArticleListStoreSetActionPayload;
}
