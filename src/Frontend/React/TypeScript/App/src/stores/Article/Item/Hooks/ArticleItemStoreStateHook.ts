import { type ArticleItemStoreState } from '../../../../app/Stores';
import { useArticleItemStoreStateContext } from '../ArticleItemStoreContext';

type StoreState = ArticleItemStoreState;

export function useStoreState (sliceName: string): StoreState {
  return useArticleItemStoreStateContext(sliceName);
}
