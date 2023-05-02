import { type ArticleItemStoreSetActionPayload } from './ArticleItemStoreSetActionPayload';

export interface ArticleItemStoreSetActionDispatch {
  readonly run: (payload: ArticleItemStoreSetActionPayload) => void;
}
