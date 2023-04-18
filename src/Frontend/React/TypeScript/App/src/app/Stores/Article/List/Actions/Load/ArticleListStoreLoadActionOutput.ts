import { type ArticleListStoreSetActionPayload } from '../Set';

export interface ArticleListStoreLoadActionOutput {
  readonly loading: boolean;
  readonly payload: ArticleListStoreSetActionPayload;
}
