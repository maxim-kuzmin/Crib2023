import { type ArticleListStoreSetActionPayload } from '../../../../app';
import { type StoreAction } from '../../../../common';
import { type ArticleListStoreActionType } from '../ArticleListStoreActionType';

export interface ArticleListStoreSetAction extends StoreAction {
  type: ArticleListStoreActionType.Set;
  payload: ArticleListStoreSetActionPayload;
}
