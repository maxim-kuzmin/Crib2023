import { type OperationStatus } from '../../../../common';
import {
  type ArticleListStoreLoadActionPayload,
  type ArticleListStoreLoadCompletedActionPayload,
  type ArticleListStoreSetActionPayload
} from './Actions';

export interface ArticleListStoreState {
  payloadOfLoadAction: ArticleListStoreLoadActionPayload;
  payloadOfLoadCompletedAction: ArticleListStoreLoadCompletedActionPayload;
  payloadOfSetAction: ArticleListStoreSetActionPayload;
  statusOfLoadAction: OperationStatus;
}
