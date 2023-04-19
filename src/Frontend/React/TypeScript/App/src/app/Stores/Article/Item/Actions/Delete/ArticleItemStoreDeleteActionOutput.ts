import { type ArticleItemStoreDeleteCompletedActionPayload } from '../DeleteCompleted';

export interface ArticleItemStoreDeleteActionOutput {
  readonly loading: boolean;
  readonly payload: ArticleItemStoreDeleteCompletedActionPayload;
}
