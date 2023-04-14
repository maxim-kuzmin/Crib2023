import { type ArticleItemStoreSetActionPayload } from './ArticleItemStoreSetActionPayload';

export interface ArticleItemStoreSetActionDispatch {
  run: (payload: ArticleItemStoreSetActionPayload) => void;
}
