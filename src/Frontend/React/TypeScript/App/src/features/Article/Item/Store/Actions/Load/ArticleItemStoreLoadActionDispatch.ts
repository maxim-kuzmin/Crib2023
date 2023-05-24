import { type ArticleItemStoreLoadActionPayload } from './ArticleItemStoreLoadActionPayload';

export interface ArticleItemStoreLoadActionDispatch {
  readonly run: (payload: ArticleItemStoreLoadActionPayload, abortSignal?: AbortSignal) => Promise<void>;
}
