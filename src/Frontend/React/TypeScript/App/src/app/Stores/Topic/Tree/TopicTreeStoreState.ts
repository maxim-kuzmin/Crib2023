import {
  type TopicTreeStoreLoadActionPayload,
  type TopicTreeStoreSetActionPayload,
  type OperationState
} from '../../../../all';

export interface TopicTreeStoreState extends OperationState {
  payloadFromLoadAction: TopicTreeStoreLoadActionPayload;
  payloadFromSetAction: TopicTreeStoreSetActionPayload;
}
