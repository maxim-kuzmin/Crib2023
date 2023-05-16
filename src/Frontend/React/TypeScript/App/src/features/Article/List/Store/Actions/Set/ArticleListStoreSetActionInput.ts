import { type ArticleListStoreSetActionCallback } from './ArticleListStoreSetActionCallback';

export interface ArticleListStoreSetActionInput {
  readonly onActionCompleted?: ArticleListStoreSetActionCallback;
}
