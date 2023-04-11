import {
  type TopicItemStoreLoadActionPayload,
  type TopicItemStoreSetActionPayload,
  type OperationState
} from '../../../../all';

export interface TopicItemStoreState extends OperationState {
  payloadFromLoadAction: TopicItemStoreLoadActionPayload;
  payloadFromSetAction: TopicItemStoreSetActionPayload;
}
