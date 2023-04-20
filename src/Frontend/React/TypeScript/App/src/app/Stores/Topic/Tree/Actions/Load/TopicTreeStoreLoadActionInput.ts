import { type OperationSortDirection, type TreeGetOperationAxisForList } from '../../../../../../common';
import { type TopicTreeStoreSetActionPayload } from '../Set';

export interface TopicTreeStoreLoadActionInput {
  readonly axis: TreeGetOperationAxisForList;
  readonly sortDirection?: OperationSortDirection;
  readonly sortField?: string;
  readonly topicId: number;
  readonly isCanceled?: boolean;
  readonly onActionCompleted?: (payload: TopicTreeStoreSetActionPayload) => void;
}
