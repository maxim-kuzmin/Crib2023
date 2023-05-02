import { type ArticleListStoreState } from '../../../../features';
import { useArticleListStoreStateContext } from '../ArticleListStoreContext';

export function useStoreState (sliceName: string): ArticleListStoreState {
  return useArticleListStoreStateContext(sliceName);
}
