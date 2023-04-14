import { type OperationState } from '../../../../common';
import { type TopicTreeStoreLoadActionPayload, type TopicTreeStoreSetActionPayload } from './Actions';

export interface TopicTreeStoreState extends OperationState {
  payloadFromLoadAction: TopicTreeStoreLoadActionPayload;
  payloadFromSetAction: TopicTreeStoreSetActionPayload;
}
