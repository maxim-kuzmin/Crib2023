import { type ArticleItemStoreSaveActionPayload } from './ArticleItemStoreSaveActionPayload';

export interface ArticleItemStoreSaveActionDispatch {
  readonly run: (
    payload: ArticleItemStoreSaveActionPayload,
    abortController?: AbortController
  ) => Promise<void>;
}
