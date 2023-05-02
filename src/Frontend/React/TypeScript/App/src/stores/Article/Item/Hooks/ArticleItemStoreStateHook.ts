import { type ArticleItemStoreState } from '../../../../features';
import { useArticleItemStoreState } from '../ArticleItemStoreHooks';

export function useStoreState (sliceName: string): ArticleItemStoreState {
  return useArticleItemStoreState(sliceName);
}
