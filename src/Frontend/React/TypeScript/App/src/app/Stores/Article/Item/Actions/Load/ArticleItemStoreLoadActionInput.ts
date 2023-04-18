import { type ArticleItemStoreSetActionPayload } from '../Set';

export interface ArticleItemStoreLoadActionInput {
  readonly articleId: number;
  readonly isCanceled?: boolean;
  readonly onArticleItemLoaded?: (payload: ArticleItemStoreSetActionPayload) => void;
}
