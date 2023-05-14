import { type ArticleListStoreSliceName, type ArticleListStoreState } from '../../../../features';
import { useArticleListStoreState } from '../ArticleListStoreHooks';

export function useStoreState (sliceName: ArticleListStoreSliceName): ArticleListStoreState {
  return useArticleListStoreState(sliceName);
}
