import {
  type ArticleListStoreLoadActionPayload,
  type ArticleListStoreSetActionPayload,
  type OperationState
} from '../../../../all';

export interface ArticleListStoreState extends OperationState {
  payloadFromLoadAction: ArticleListStoreLoadActionPayload;
  payloadFromSetAction: ArticleListStoreSetActionPayload;
}
