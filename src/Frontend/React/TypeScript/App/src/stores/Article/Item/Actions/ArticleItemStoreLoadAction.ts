import { type ArticleItemStoreLoadActionPayload } from '../../../../app/Stores';
import { type StoreAction } from '../../../../common';
import { type ArticleItemStoreActionType } from '../ArticleItemStoreActionType';

export interface ArticleItemStoreLoadAction extends StoreAction {
  type: ArticleItemStoreActionType.Load;
  payload: ArticleItemStoreLoadActionPayload;
}
