import { type ArticleItemStoreDeleteActionPayload } from './ArticleItemStoreDeleteActionPayload';

export interface ArticleItemStoreDeleteActionDispatch {
  readonly run: (payload: ArticleItemStoreDeleteActionPayload, abortSignal?: AbortSignal) => Promise<void>;
}
