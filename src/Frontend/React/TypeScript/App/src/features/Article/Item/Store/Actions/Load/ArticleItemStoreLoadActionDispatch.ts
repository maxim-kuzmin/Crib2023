import { type ArticleItemStoreLoadActionPayload } from './ArticleItemStoreLoadActionPayload';

export interface ArticleItemStoreLoadActionDispatch {
  readonly run: (
    payload: ArticleItemStoreLoadActionPayload,
    abortController?: AbortController
  ) => Promise<void>;
}
