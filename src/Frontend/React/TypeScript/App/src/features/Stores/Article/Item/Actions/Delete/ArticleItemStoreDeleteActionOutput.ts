import { type ArticleItemStoreDeleteCompletedActionPayload } from '../DeleteCompleted';
import { type ArticleItemStoreDeleteActionDispatch } from './ArticleItemStoreDeleteActionDispatch';

export interface ArticleItemStoreDeleteActionOutput {
  readonly dispatchOfDeleteAction: ArticleItemStoreDeleteActionDispatch;
  readonly payloadOfDeleteCompletedAction: ArticleItemStoreDeleteCompletedActionPayload;
  readonly pendingOfDeleteAction: boolean;
}
