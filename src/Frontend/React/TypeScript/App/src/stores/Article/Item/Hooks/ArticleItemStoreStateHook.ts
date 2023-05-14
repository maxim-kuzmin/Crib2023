import { type ArticleItemStoreSlice, type ArticleItemStoreState } from '../../../../features';
import { useArticleItemStoreState } from '../ArticleItemStoreHooks';

export function useStoreState (slice: ArticleItemStoreSlice): ArticleItemStoreState {
  return useArticleItemStoreState(slice);
}
