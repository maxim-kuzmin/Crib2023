import { type ArticleItemStoreSetActionResult } from './ArticleItemStoreSetActionResult';

export interface ArticleItemStoreSetActionDispatch {
  readonly run: (actionResult: ArticleItemStoreSetActionResult) => void;
}
