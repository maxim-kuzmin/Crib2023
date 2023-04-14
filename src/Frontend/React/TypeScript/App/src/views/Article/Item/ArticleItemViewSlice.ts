import {
  type ArticleItemStoreClearActionOptions,
  type ArticleItemViewHooks,
  type ArticleItemStoreSetActionOptions,
  type ArticleItemStoreLoadActionOptions,
  type ArticleItemStoreHooks
} from '../../../all';
import { ArticleItemStoreSliceName } from '../../../app/Stores';

type ClearActionOptions = ArticleItemStoreClearActionOptions;
type LoadActionOptions = ArticleItemStoreLoadActionOptions;
type SetActionOptions = ArticleItemStoreSetActionOptions;

export function createArticleItemViewHooks (
  hooks: ArticleItemStoreHooks
): ArticleItemViewHooks {
  const sliceName = ArticleItemStoreSliceName.ArticleItemView;

  return {
    useDispatchToClear: (options: ClearActionOptions) => hooks.useDispatchToClear(sliceName, options),
    useDispatchToLoad: (options: LoadActionOptions) => hooks.useDispatchToLoad(sliceName, options),
    useDispatchToSet: (options: SetActionOptions) => hooks.useDispatchToSet(sliceName, options),
    useState: () => hooks.useState(sliceName)
  };
}
