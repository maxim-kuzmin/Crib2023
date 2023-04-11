import { type ArticleListStoreSetActionPayload } from '../../../../../../all';

export interface ArticleListStoreSetActionDispatch {
  run: (response: ArticleListStoreSetActionPayload) => void;
}
