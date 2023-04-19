import { type OperationStatus } from '../../../../common';
import { type TopicItemStoreLoadActionPayload, type TopicItemStoreSetActionPayload } from './Actions';

export interface TopicItemStoreState {
  payloadOfLoadAction: TopicItemStoreLoadActionPayload;
  payloadOfSetAction: TopicItemStoreSetActionPayload;
  statusOfLoadAction: OperationStatus;
}
