import { type ArticleItemStoreSetActionPayload } from '../Set';

export interface ArticleItemStoreSaveActionOutput {
  readonly loading: boolean;
  readonly payload: ArticleItemStoreSetActionPayload;
}
