import { type ArticleItemStoreState } from '../../../../features';
import { useArticleItemStoreState } from '../ArticleItemStoreHooks';

export function useStoreState (owner: string): ArticleItemStoreState {
  return useArticleItemStoreState(owner);
}
