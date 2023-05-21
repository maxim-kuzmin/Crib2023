import { type ArticleListStoreLoadCompletedActionCallback } from '../LoadCompleted';
import { type ArticleListStoreLoadActionPayload } from './ArticleListStoreLoadActionPayload';

export interface ArticleListStoreLoadActionInput {
  readonly abortController?: AbortController;
  readonly onActionCompleted?: ArticleListStoreLoadCompletedActionCallback;
  readonly payloadOfLoadAction: ArticleListStoreLoadActionPayload;
}
