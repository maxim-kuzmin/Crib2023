import { type ArticleListStoreSetActionPayload } from '../../../../../../all';

export interface ArticleListStoreSetActionDispatch {
  run: (payload: ArticleListStoreSetActionPayload) => void;
}
