import { type StoreAction } from '../../../../common';
import { type ArticleItemStoreLoadActionPayload } from '../../../../features';
import { type ArticleItemStoreActionType } from '../ArticleItemStoreActionType';

export interface ArticleItemStoreLoadAction extends StoreAction {
  type: ArticleItemStoreActionType.Load;
  payload: ArticleItemStoreLoadActionPayload;
}
