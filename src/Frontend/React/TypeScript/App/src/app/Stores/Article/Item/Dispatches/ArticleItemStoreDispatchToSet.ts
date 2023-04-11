import { type ArticleItemStoreContentForResponse } from '../../../../../all';

export interface ArticleItemStoreDispatchToSet {
  run: (response: ArticleItemStoreContentForResponse) => void;
}
