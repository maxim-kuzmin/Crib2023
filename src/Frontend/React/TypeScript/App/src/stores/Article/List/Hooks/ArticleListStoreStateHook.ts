import { type ArticleListStoreOwner, type ArticleListStoreState } from '../../../../features';
import { useArticleListStoreState } from '../ArticleListStoreHooks';

export function useStoreState (owner: ArticleListStoreOwner): ArticleListStoreState {
  return useArticleListStoreState(owner);
}
