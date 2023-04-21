import { type ArticleListStoreLoadCompletedActionPayload } from './ArticleListStoreLoadCompletedActionPayload';

export interface ArticleListStoreLoadCompletedActionDispatch {
  readonly run: (payload: ArticleListStoreLoadCompletedActionPayload) => void;
}
