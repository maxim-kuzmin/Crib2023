import { type ArticleItemStoreSliceName, type ArticleItemStoreState } from '../../../../features';
import { useArticleItemStoreState } from '../ArticleItemStoreHooks';

export function useStoreState (sliceName: ArticleItemStoreSliceName): ArticleItemStoreState {
  return useArticleItemStoreState(sliceName);
}
