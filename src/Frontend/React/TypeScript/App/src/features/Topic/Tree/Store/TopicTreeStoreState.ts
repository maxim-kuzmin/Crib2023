import { OperationStatus } from '../../../../common';
import {
  type TopicTreeStoreLoadActionResult,
  type TopicTreeStoreLoadCompletedActionResult,
  type TopicTreeStoreSetActionResult
} from './Actions';

export interface TopicTreeStoreState {
  resultOfLoadAction: TopicTreeStoreLoadActionResult;
  resultOfLoadCompletedAction: TopicTreeStoreLoadCompletedActionResult;
  resultOfSetAction: TopicTreeStoreSetActionResult;
  statusOfLoadAction: OperationStatus;
}

export function createTopicTreeStoreState (
  options?: Partial<TopicTreeStoreState>
): TopicTreeStoreState {
  return {
    resultOfLoadAction: options?.resultOfLoadAction ?? null,
    resultOfLoadCompletedAction: options?.resultOfLoadCompletedAction ?? null,
    resultOfSetAction: options?.resultOfSetAction ?? null,
    statusOfLoadAction: options?.statusOfLoadAction ?? OperationStatus.Initial,
  };
}
