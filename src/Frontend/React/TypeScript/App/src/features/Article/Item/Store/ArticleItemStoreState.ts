import { type OperationStatus } from '../../../../common';
import {
  type ArticleItemStoreDeleteActionPayload,
  type ArticleItemStoreDeleteCompletedActionPayload,
  type ArticleItemStoreLoadActionPayload,
  type ArticleItemStoreLoadCompletedActionPayload,
  type ArticleItemStoreSaveActionPayload,
  type ArticleItemStoreSaveCompletedActionPayload,
  type ArticleItemStoreSetActionPayload
} from './Actions';

export interface ArticleItemStoreState {
  payloadOfDeleteAction: ArticleItemStoreDeleteActionPayload;
  payloadOfDeleteCompletedAction: ArticleItemStoreDeleteCompletedActionPayload;
  payloadOfLoadAction: ArticleItemStoreLoadActionPayload;
  payloadOfLoadCompletedAction: ArticleItemStoreLoadCompletedActionPayload;
  payloadOfSaveAction: ArticleItemStoreSaveActionPayload;
  payloadOfSaveCompletedAction: ArticleItemStoreSaveCompletedActionPayload;
  payloadOfSetAction: ArticleItemStoreSetActionPayload;
  statusOfDeleteAction: OperationStatus;
  statusOfLoadAction: OperationStatus;
  statusOfSaveAction: OperationStatus;
}
