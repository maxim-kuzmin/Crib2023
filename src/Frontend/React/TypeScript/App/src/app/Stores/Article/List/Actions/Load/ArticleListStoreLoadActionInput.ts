import { type ArticleListStoreLoadCompletedActionCallback } from '../LoadCompleted';
import { type ArticleListStoreLoadActionPayload } from './ArticleListStoreLoadActionPayload';

export interface ArticleListStoreLoadActionInput {
  readonly isCanceled?: boolean;
  readonly onActionCompleted?: ArticleListStoreLoadCompletedActionCallback;
  readonly payloadOfLoadAction: ArticleListStoreLoadActionPayload;
}
