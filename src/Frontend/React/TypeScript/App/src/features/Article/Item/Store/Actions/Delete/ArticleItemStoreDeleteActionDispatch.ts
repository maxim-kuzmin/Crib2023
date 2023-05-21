import { type ArticleItemStoreDeleteActionPayload } from './ArticleItemStoreDeleteActionPayload';

export interface ArticleItemStoreDeleteActionDispatch {
  readonly run: (
    payload: ArticleItemStoreDeleteActionPayload,
    abortController?: AbortController
  ) => Promise<void>;
}
