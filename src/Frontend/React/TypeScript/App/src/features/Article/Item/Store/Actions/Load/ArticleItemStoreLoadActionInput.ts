import { type ArticleItemStoreLoadCompletedActionCallback } from '../LoadCompleted';
import { type ArticleItemStoreLoadActionPayload } from './ArticleItemStoreLoadActionPayload';

export interface ArticleItemStoreLoadActionInput {
  readonly isCanceled?: boolean;
  readonly onActionCompleted?: ArticleItemStoreLoadCompletedActionCallback;
  readonly payloadOfLoadAction: ArticleItemStoreLoadActionPayload;
}
