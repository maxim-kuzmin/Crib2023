import {
  type ArticleListStoreActionType,
  type ArticleListStoreSetActionPayload
} from '../../../../all';

export interface ArticleListStoreSetAction {
  type: ArticleListStoreActionType.Set;
  payload: ArticleListStoreSetActionPayload;
}
