import { type ArticleListStoreState } from '../../../../features';
import { useArticleListStoreState } from '../ArticleListStoreHooks';

export function useStoreState (sliceName: string): ArticleListStoreState {
  return useArticleListStoreState(sliceName);
}
