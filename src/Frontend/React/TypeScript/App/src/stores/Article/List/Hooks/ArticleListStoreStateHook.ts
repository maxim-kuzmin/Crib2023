import { type ArticleListStoreState } from '../../../../features';
import { useArticleListStoreState } from '../ArticleListStoreHooks';

export function useStoreState (owner: string): ArticleListStoreState {
  return useArticleListStoreState(owner);
}
