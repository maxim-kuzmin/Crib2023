import { type ArticleListStoreSetActionDispatch } from './ArticleListStoreSetActionDispatch';
import { type ArticleListStoreSetActionPayload } from './ArticleListStoreSetActionPayload';

export interface ArticleListStoreSetActionOutput {
  readonly dispatchOfSetAction: ArticleListStoreSetActionDispatch;
  readonly payloadOfSetAction: ArticleListStoreSetActionPayload;
}
