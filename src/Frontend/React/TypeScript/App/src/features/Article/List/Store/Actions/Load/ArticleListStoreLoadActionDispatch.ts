import { type ArticleListStoreLoadActionPayload } from './ArticleListStoreLoadActionPayload';

export interface ArticleListStoreLoadActionDispatch {
  readonly run: (payload: ArticleListStoreLoadActionPayload, abortSignal?: AbortSignal) => Promise<void>;
}
