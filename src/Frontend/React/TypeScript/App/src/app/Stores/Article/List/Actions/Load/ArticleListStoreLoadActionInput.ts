import { type ArticleListStoreSetActionPayload } from '../Set';

export interface ArticleListStoreLoadActionInput {
  readonly isCanceled?: boolean;
  readonly onActionCompleted?: (payload: ArticleListStoreSetActionPayload) => void;
  readonly pageNumber: number;
  readonly pageSize: number;
  readonly topicId: number;
}
