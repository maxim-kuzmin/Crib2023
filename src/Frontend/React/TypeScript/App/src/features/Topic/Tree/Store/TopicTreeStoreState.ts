import { OperationStatus } from '../../../../common';
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

export function createTopicTreeStoreState (
  options?: Partial<TopicTreeStoreState>
): TopicTreeStoreState {
  return {
    payloadOfLoadAction: options?.payloadOfLoadAction ?? null,
    payloadOfLoadCompletedAction: options?.payloadOfLoadCompletedAction ?? null,
    payloadOfSetAction: options?.payloadOfSetAction ?? null,
    statusOfLoadAction: options?.statusOfLoadAction ?? OperationStatus.Initial,
  };
}
