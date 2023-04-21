import { type OperationStatus } from '../../../../common';
import {
  type TopicTreeStoreLoadActionPayload,
  type TopicTreeStoreLoadCompletedActionPayload,
  type TopicTreeStoreSetActionPayload
} from './Actions';

export interface TopicTreeStoreState {
  payloadOfLoadAction: TopicTreeStoreLoadActionPayload;
  payloadOfLoadCompletedAction: TopicTreeStoreLoadCompletedActionPayload;
  payloadOfSetAction: TopicTreeStoreSetActionPayload;
  statusOfLoadAction: OperationStatus;
}
