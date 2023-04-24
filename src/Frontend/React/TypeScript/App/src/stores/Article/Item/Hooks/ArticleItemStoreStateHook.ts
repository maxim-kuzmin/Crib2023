import { type ArticleItemStoreState } from '../../../../app';
import { useArticleItemStoreStateContext } from '../ArticleItemStoreContext';

export function useStoreState (sliceName: string): ArticleItemStoreState {
  return useArticleItemStoreStateContext(sliceName);
}
