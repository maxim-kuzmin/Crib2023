import { type OperationStatus } from '../../../../common';
import { type TopicTreeStoreLoadActionPayload, type TopicTreeStoreSetActionPayload } from './Actions';

export interface TopicTreeStoreState {
  payloadOfLoadAction: TopicTreeStoreLoadActionPayload;
  payloadOfSetAction: TopicTreeStoreSetActionPayload;
  statusOfLoadAction: OperationStatus;
}
