import { OperationStatus } from '../../../../common';
import {
  type TopicItemStoreDeleteActionResult,
  type TopicItemStoreDeleteCompletedActionResult,
  type TopicItemStoreLoadActionResult,
  type TopicItemStoreLoadCompletedActionResult,
  type TopicItemStoreSaveActionResult,
  type TopicItemStoreSaveCompletedActionResult,
  type TopicItemStoreSetActionResult
} from './Actions';

export interface TopicItemStoreState {
  resultOfDeleteAction: TopicItemStoreDeleteActionResult;
  resultOfDeleteCompletedAction: TopicItemStoreDeleteCompletedActionResult;
  resultOfLoadAction: TopicItemStoreLoadActionResult;
  resultOfLoadCompletedAction: TopicItemStoreLoadCompletedActionResult;
  resultOfSaveAction: TopicItemStoreSaveActionResult;
  resultOfSaveCompletedAction: TopicItemStoreSaveCompletedActionResult;
  resultOfSetAction: TopicItemStoreSetActionResult;
  statusOfDeleteAction: OperationStatus;
  statusOfLoadAction: OperationStatus;
  statusOfSaveAction: OperationStatus;
}

export function createTopicItemStoreState (
  options?: Partial<TopicItemStoreState>
): TopicItemStoreState {
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
