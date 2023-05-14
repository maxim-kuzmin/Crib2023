import { type ArticleListStoreSlice, type ArticleListStoreState } from '../../../../features';
import { useArticleListStoreState } from '../ArticleListStoreHooks';

export function useStoreState (slice: ArticleListStoreSlice): ArticleListStoreState {
  return useArticleListStoreState(slice);
}
