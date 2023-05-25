import { type ArticleListStoreSetActionDispatch } from './ArticleListStoreSetActionDispatch';
import { type ArticleListStoreSetActionResult } from './ArticleListStoreSetActionResult';

export interface ArticleListStoreSetActionOutput {
  readonly dispatchOfSetAction: ArticleListStoreSetActionDispatch;
  readonly resultOfSetAction: ArticleListStoreSetActionResult;
}
