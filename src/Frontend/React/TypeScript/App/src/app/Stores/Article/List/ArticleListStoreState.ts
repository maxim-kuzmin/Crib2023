import { type OperationStatus } from '../../../../common';
import { type ArticleListStoreLoadActionPayload, type ArticleListStoreSetActionPayload } from './Actions';

export interface ArticleListStoreState {
  payloadOfLoadAction: ArticleListStoreLoadActionPayload;
  payloadOfSetAction: ArticleListStoreSetActionPayload;
  statusOfLoadAction: OperationStatus;
}
