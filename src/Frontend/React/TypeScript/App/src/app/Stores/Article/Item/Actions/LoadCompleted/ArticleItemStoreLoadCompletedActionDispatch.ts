import { type ArticleItemStoreLoadCompletedActionPayload } from './ArticleItemStoreLoadCompletedActionPayload';

export interface ArticleItemStoreLoadCompletedActionDispatch {
  readonly run: (payload: ArticleItemStoreLoadCompletedActionPayload) => void;
}
