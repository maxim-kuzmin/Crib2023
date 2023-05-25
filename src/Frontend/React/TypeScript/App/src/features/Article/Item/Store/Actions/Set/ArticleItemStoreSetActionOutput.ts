import { type ArticleItemStoreSetActionDispatch } from './ArticleItemStoreSetActionDispatch';
import { type ArticleItemStoreSetActionResult } from './ArticleItemStoreSetActionResult';

export interface ArticleItemStoreSetActionOutput {
  readonly dispatchOfSetAction: ArticleItemStoreSetActionDispatch;
  readonly resultOfSetAction: ArticleItemStoreSetActionResult;
}
