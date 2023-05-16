import { type ArticleItemStoreLoadCompletedActionPayload } from '../LoadCompleted';
import { type ArticleItemStoreLoadActionDispatch } from './ArticleItemStoreLoadActionDispatch';

export interface ArticleItemStoreLoadActionOutput {
  readonly dispatchOfLoadAction: ArticleItemStoreLoadActionDispatch;
  readonly payloadOfLoadCompletedAction: ArticleItemStoreLoadCompletedActionPayload;
  readonly pendingOfLoadAction: boolean;
}
