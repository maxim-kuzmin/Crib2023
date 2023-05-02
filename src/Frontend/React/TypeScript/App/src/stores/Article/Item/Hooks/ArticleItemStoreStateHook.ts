import { type ArticleItemStoreState } from '../../../../features';
import { useArticleItemStoreStateContext } from '../ArticleItemStoreContext';

export function useStoreState (sliceName: string): ArticleItemStoreState {
  return useArticleItemStoreStateContext(sliceName);
}
