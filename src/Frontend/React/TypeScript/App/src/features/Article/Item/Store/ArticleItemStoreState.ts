import { OperationStatus } from '../../../../common';
import {
  type ArticleItemStoreDeleteActionResult,
  type ArticleItemStoreDeleteCompletedActionResult,
  type ArticleItemStoreLoadActionResult,
  type ArticleItemStoreLoadCompletedActionResult,
  type ArticleItemStoreSaveActionResult,
  type ArticleItemStoreSaveCompletedActionResult,
  type ArticleItemStoreSetActionResult,
} from './Actions';

export interface ArticleItemStoreState {
  resultOfDeleteAction: ArticleItemStoreDeleteActionResult;
  resultOfDeleteCompletedAction: ArticleItemStoreDeleteCompletedActionResult;
  resultOfLoadAction: ArticleItemStoreLoadActionResult;
  resultOfLoadCompletedAction: ArticleItemStoreLoadCompletedActionResult;
  resultOfSaveAction: ArticleItemStoreSaveActionResult;
  resultOfSaveCompletedAction: ArticleItemStoreSaveCompletedActionResult;
  resultOfSetAction: ArticleItemStoreSetActionResult;
  statusOfDeleteAction: OperationStatus;
  statusOfLoadAction: OperationStatus;
  statusOfSaveAction: OperationStatus;
}

export function createArticleItemStoreState (
  options?: Partial<ArticleItemStoreState>
): ArticleItemStoreState {
  return {
    resultOfDeleteAction: options?.resultOfDeleteAction ?? null,
    resultOfDeleteCompletedAction: options?.resultOfDeleteCompletedAction ?? null,
    resultOfLoadAction: options?.resultOfLoadAction ?? null,
    resultOfLoadCompletedAction: options?.resultOfLoadCompletedAction ?? null,
    resultOfSaveAction: options?.resultOfSaveAction ?? null,
    resultOfSaveCompletedAction: options?.resultOfSaveCompletedAction ?? null,
    resultOfSetAction: options?.resultOfSetAction ?? null,
    statusOfDeleteAction: options?.statusOfDeleteAction ?? OperationStatus.Initial,
    statusOfLoadAction: options?.statusOfLoadAction ?? OperationStatus.Initial,
    statusOfSaveAction: options?.statusOfSaveAction ?? OperationStatus.Initial,
  };
}
