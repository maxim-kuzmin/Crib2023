import { type ArticleListStoreState } from '../../../../app/Stores';
import { useArticleListStoreStateContext } from '../ArticleListStoreContext';

export function useStoreState (sliceName: string): ArticleListStoreState {
  return useArticleListStoreStateContext(sliceName);
}