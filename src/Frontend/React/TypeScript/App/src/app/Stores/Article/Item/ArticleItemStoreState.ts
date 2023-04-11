import {
  type ArticleItemStoreLoadActionPayload,
  type ArticleItemStoreSetActionPayload,
  type OperationState
} from '../../../../all';

export interface ArticleItemStoreState extends OperationState {
  input: ArticleItemStoreLoadActionPayload;
  response: ArticleItemStoreSetActionPayload;
}
