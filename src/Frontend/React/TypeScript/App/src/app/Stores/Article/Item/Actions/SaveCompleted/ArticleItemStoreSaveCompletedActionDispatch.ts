import { type ArticleItemStoreSaveCompletedActionPayload } from './ArticleItemStoreSaveCompletedActionPayload';

export interface ArticleItemStoreSaveCompletedActionDispatch {
  readonly run: (payload: ArticleItemStoreSaveCompletedActionPayload) => void;
}
