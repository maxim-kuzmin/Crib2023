import { type ArticleListStoreSetActionPayload } from '../Set';
import { type ArticleListStoreLoadActionDispatch } from './ArticleListStoreLoadActionDispatch';

export interface ArticleListStoreLoadActionOutput {
  readonly dispatchOfLoadAction: ArticleListStoreLoadActionDispatch;
  readonly payloadOfLoadAction: ArticleListStoreSetActionPayload;
  readonly pendingOfLoadAction: boolean;
}
