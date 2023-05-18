import { OperationStatus } from '../../../../common';
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

export function createArticleItemStoreState (
  options?: Partial<ArticleItemStoreState>
): ArticleItemStoreState {
  return {
    payloadOfDeleteAction: options?.payloadOfDeleteAction ?? null,
    payloadOfDeleteCompletedAction: options?.payloadOfDeleteCompletedAction ?? null,
    payloadOfLoadAction: options?.payloadOfLoadAction ?? null,
    payloadOfLoadCompletedAction: options?.payloadOfLoadCompletedAction ?? null,
    payloadOfSaveAction: options?.payloadOfSaveAction ?? null,
    payloadOfSaveCompletedAction: options?.payloadOfSaveCompletedAction ?? null,
    payloadOfSetAction: options?.payloadOfSetAction ?? null,
    statusOfDeleteAction: options?.statusOfDeleteAction ?? OperationStatus.Initial,
    statusOfLoadAction: options?.statusOfLoadAction ?? OperationStatus.Initial,
    statusOfSaveAction: options?.statusOfSaveAction ?? OperationStatus.Initial,
  };
}
