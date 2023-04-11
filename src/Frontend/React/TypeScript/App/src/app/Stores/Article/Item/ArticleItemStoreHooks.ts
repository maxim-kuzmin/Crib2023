import {
  type ArticleItemStoreClearActionOptions,
  type ArticleItemStoreClearActionDispatch,
  type ArticleItemStoreState,
  type ArticleItemStoreLoadActionDispatch,
  type ArticleItemStoreLoadActionOptions,
  type ArticleItemStoreSetActionOptions,
  type ArticleItemStoreSetActionDispatch
} from '../../../../all';

type ClearActionDispatch = ArticleItemStoreClearActionDispatch;
type ClearActionOptions = ArticleItemStoreClearActionOptions;

type LoadActionDispatch = ArticleItemStoreLoadActionDispatch;
type LoadActionOptions = ArticleItemStoreLoadActionOptions;

type SetActionDispatch = ArticleItemStoreSetActionDispatch;
type SetActionOptions = ArticleItemStoreSetActionOptions;

export interface ArticleItemStoreHooks {
  readonly useDispatchToClear: (options?: ClearActionOptions) => ClearActionDispatch;
  readonly useDispatchToLoad: (options?: LoadActionOptions) => LoadActionDispatch;
  readonly useDispatchToSet: (options?: SetActionOptions) => SetActionDispatch;
  readonly useState: () => ArticleItemStoreState;
}
