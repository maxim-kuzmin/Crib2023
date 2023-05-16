import { type ArticleListStoreSetActionPayload } from './ArticleListStoreSetActionPayload';

export interface ArticleListStoreSetActionDispatch {
  readonly run: (payload: ArticleListStoreSetActionPayload) => void;
}
