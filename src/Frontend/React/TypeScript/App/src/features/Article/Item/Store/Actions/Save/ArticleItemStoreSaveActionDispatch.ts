import { type ArticleItemStoreSaveActionPayload } from './ArticleItemStoreSaveActionPayload';

export interface ArticleItemStoreSaveActionDispatch {
  readonly run: (payload: ArticleItemStoreSaveActionPayload, abortSignal?: AbortSignal) => Promise<void>;
}
