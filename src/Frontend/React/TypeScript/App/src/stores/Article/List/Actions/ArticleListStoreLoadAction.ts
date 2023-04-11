import {
  type ArticleListStoreLoadActionPayload,
  type ArticleListStoreActionType
} from '../../../../all';

export interface ArticleListStoreLoadAction {
  type: ArticleListStoreActionType.Load;
  payload: ArticleListStoreLoadActionPayload;
}
