import { type ArticleListStoreState } from '../../../../features';
import { useArticleListStoreState } from '../ArticleListStoreHooks';

export function useStoreState (storeKey: string): ArticleListStoreState {
  return useArticleListStoreState(storeKey);
}
