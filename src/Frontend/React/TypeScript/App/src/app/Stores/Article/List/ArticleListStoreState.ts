import { type OperationState } from '../../../../common';
import { type ArticleListStoreLoadActionPayload, type ArticleListStoreSetActionPayload } from './Actions';

export interface ArticleListStoreState extends OperationState {
  payloadFromLoadAction: ArticleListStoreLoadActionPayload;
  payloadFromSetAction: ArticleListStoreSetActionPayload;
}
