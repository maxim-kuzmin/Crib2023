import {
  type ArticleItemStoreOptionsToClear,
  type ArticleItemStoreDispatchToClear,
  type ArticleItemStoreState,
  type ArticleItemStoreDispatchToLoad,
  type ArticleItemStoreOptionsToLoad,
  type ArticleItemStoreOptionsToSet,
  type ArticleItemStoreDispatchToSet
} from '../../../../all';

export interface ArticleItemStoreHooks {
  readonly useDispatchToClear: (options?: ArticleItemStoreOptionsToClear) => ArticleItemStoreDispatchToClear;
  readonly useDispatchToLoad: (options?: ArticleItemStoreOptionsToLoad) => ArticleItemStoreDispatchToLoad;
  readonly useDispatchToSet: (options?: ArticleItemStoreOptionsToSet) => ArticleItemStoreDispatchToSet;
  readonly useState: () => ArticleItemStoreState;
}
