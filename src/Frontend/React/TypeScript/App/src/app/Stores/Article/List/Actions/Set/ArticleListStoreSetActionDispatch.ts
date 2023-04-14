import { type ArticleListStoreSetActionPayload } from './ArticleListStoreSetActionPayload';

export interface ArticleListStoreSetActionDispatch {
  run: (payload: ArticleListStoreSetActionPayload) => void;
}
