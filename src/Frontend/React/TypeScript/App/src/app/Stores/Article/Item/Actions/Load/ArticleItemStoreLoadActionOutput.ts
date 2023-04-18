import { type ArticleItemStoreSetActionPayload } from '../Set';

export interface ArticleItemStoreLoadActionOutput {
  readonly loading: boolean;
  readonly payload: ArticleItemStoreSetActionPayload;
}
