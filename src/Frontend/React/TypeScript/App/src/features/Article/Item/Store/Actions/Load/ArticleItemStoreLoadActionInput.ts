import { type ArticleItemStoreLoadCompletedActionCallback } from '../LoadCompleted';
import { type ArticleItemStoreLoadActionPayload } from './ArticleItemStoreLoadActionPayload';

export interface ArticleItemStoreLoadActionInput {
  readonly abortController?: AbortController;
  readonly onActionCompleted?: ArticleItemStoreLoadCompletedActionCallback;
  readonly payloadOfLoadAction: ArticleItemStoreLoadActionPayload;
}
