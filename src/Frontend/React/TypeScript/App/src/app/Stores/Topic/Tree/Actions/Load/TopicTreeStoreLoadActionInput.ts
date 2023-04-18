import { type TreeGetOperationAxisForList } from '../../../../../../common';
import { type TopicTreeStoreSetActionPayload } from '../Set';

export interface TopicTreeStoreLoadActionInput {
  readonly axis: TreeGetOperationAxisForList;
  readonly sortField?: string;
  readonly sortDirection?: 'asc' | 'desc';
  readonly topicId: number;
  readonly isCanceled?: boolean;
  readonly onTopicTreeLoaded?: (payload: TopicTreeStoreSetActionPayload) => void;
}
