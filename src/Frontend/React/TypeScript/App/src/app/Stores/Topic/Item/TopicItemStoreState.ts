import { type OperationStatus } from '../../../../common';
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
