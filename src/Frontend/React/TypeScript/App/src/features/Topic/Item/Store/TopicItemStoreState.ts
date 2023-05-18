import { OperationStatus } from '../../../../common';
import {
  type TopicItemStoreDeleteActionPayload,
  type TopicItemStoreDeleteCompletedActionPayload,
  type TopicItemStoreLoadActionPayload,
  type TopicItemStoreLoadCompletedActionPayload,
  type TopicItemStoreSaveActionPayload,
  type TopicItemStoreSaveCompletedActionPayload,
  type TopicItemStoreSetActionPayload
} from './Actions';

export interface TopicItemStoreState {
  payloadOfDeleteAction: TopicItemStoreDeleteActionPayload;
  payloadOfDeleteCompletedAction: TopicItemStoreDeleteCompletedActionPayload;
  payloadOfLoadAction: TopicItemStoreLoadActionPayload;
  payloadOfLoadCompletedAction: TopicItemStoreLoadCompletedActionPayload;
  payloadOfSaveAction: TopicItemStoreSaveActionPayload;
  payloadOfSaveCompletedAction: TopicItemStoreSaveCompletedActionPayload;
  payloadOfSetAction: TopicItemStoreSetActionPayload;
  statusOfDeleteAction: OperationStatus;
  statusOfLoadAction: OperationStatus;
  statusOfSaveAction: OperationStatus;
}

export function createTopicItemStoreState (
  options?: Partial<TopicItemStoreState>
): TopicItemStoreState {
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
