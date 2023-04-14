import {
  type ArticleListStoreClearActionOptions,
  type ArticleListStoreHooks,
  type ArticleListStoreLoadActionOptions,
  type ArticleListStoreSetActionOptions,
  ArticleListStoreSliceName
} from '../../../app/Stores';
import { type ArticleTableViewHooks } from './ArticleTableViewHooks';

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
