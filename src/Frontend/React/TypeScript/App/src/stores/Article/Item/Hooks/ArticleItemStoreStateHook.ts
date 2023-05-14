import { type ArticleItemStoreOwner, type ArticleItemStoreState } from '../../../../features';
import { useArticleItemStoreState } from '../ArticleItemStoreHooks';

export function useStoreState (owner: ArticleItemStoreOwner): ArticleItemStoreState {
  return useArticleItemStoreState(owner);
}
