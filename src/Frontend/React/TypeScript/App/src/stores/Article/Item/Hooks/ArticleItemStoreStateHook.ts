import { type ArticleItemStoreState } from '../../../../app/Stores';
import { useArticleItemStoreStateContext } from '../ArticleItemStoreContext';

export function useStoreState (sliceName: string): ArticleItemStoreState {
  return useArticleItemStoreStateContext(sliceName);
}
