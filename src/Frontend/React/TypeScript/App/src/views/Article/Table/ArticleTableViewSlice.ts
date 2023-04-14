import {
  type ArticleListStoreClearActionOptions,
  type ArticleTableViewHooks,
  type ArticleListStoreSetActionOptions,
  type ArticleListStoreLoadActionOptions,
  type ArticleListStoreHooks
} from '../../../all';
import { ArticleListStoreSliceName } from '../../../app/Stores';

type ClearActionOptions = ArticleListStoreClearActionOptions;
type LoadActionOptions = ArticleListStoreLoadActionOptions;
type SetActionOptions = ArticleListStoreSetActionOptions;

export function createArticleTableViewHooks (
  hooks: ArticleListStoreHooks
): ArticleTableViewHooks {
  const sliceName = ArticleListStoreSliceName.ArticleTableView;

  return {
    useDispatchToClear: (options: ClearActionOptions) => hooks.useDispatchToClear(sliceName, options),
    useDispatchToLoad: (options: LoadActionOptions) => hooks.useDispatchToLoad(sliceName, options),
    useDispatchToSet: (options: SetActionOptions) => hooks.useDispatchToSet(sliceName, options),
    useState: () => hooks.useState(sliceName)
  };
}
