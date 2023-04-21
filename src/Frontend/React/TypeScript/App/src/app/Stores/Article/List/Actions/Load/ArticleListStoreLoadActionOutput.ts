import { type ArticleListStoreLoadCompletedActionPayload } from '../LoadCompleted';
import { type ArticleListStoreLoadActionDispatch } from './ArticleListStoreLoadActionDispatch';

export interface ArticleListStoreLoadActionOutput {
  readonly dispatchOfLoadAction: ArticleListStoreLoadActionDispatch;
  readonly payloadOfLoadCompletedAction: ArticleListStoreLoadCompletedActionPayload;
  readonly pendingOfLoadAction: boolean;
}
