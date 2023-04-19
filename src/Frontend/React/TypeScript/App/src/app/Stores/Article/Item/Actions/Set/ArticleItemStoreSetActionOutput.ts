import { type ArticleItemStoreSetActionDispatch } from './ArticleItemStoreSetActionDispatch';
import { type ArticleItemStoreSetActionPayload } from './ArticleItemStoreSetActionPayload';

export interface ArticleItemStoreSetActionOutput {
  readonly dispatchOfSetAction: ArticleItemStoreSetActionDispatch;
  readonly payloadOfSetAction: ArticleItemStoreSetActionPayload;
}
