import { type OperationState } from '../../../../common';
import { type TopicItemStoreLoadActionPayload, type TopicItemStoreSetActionPayload } from './Actions';

export interface TopicItemStoreState extends OperationState {
  payloadFromLoadAction: TopicItemStoreLoadActionPayload;
  payloadFromSetAction: TopicItemStoreSetActionPayload;
}
