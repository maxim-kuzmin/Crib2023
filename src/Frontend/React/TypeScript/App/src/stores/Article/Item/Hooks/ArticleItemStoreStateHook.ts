import { type ArticleItemStoreState } from '../../../../features';
import { useArticleItemStoreState } from '../ArticleItemStoreHooks';

export function useStoreState (storeKey: string): ArticleItemStoreState {
  return useArticleItemStoreState(storeKey);
}
