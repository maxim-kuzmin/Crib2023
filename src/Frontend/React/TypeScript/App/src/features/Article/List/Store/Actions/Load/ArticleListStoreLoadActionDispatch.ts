import { type ArticleListStoreLoadActionPayload } from './ArticleListStoreLoadActionPayload';

export interface ArticleListStoreLoadActionDispatch {
  readonly run: (
    payload: ArticleListStoreLoadActionPayload,
    abortController?: AbortController
  ) => Promise<void>;
}
