import {
  type ArticleItemStoreClearActionDispatch,
  type ArticleItemStoreClearActionOptions,
  type ArticleItemStoreLoadActionDispatch,
  type ArticleItemStoreLoadActionOptions,
  type ArticleItemStoreSetActionDispatch,
  type ArticleItemStoreSetActionOptions
} from './Actions';
import { type ArticleItemStoreState } from './ArticleItemStoreState';

type ClearActionDispatch = ArticleItemStoreClearActionDispatch;
type ClearActionOptions = ArticleItemStoreClearActionOptions;

type LoadActionDispatch = ArticleItemStoreLoadActionDispatch;
type LoadActionOptions = ArticleItemStoreLoadActionOptions;

type SetActionDispatch = ArticleItemStoreSetActionDispatch;
type SetActionOptions = ArticleItemStoreSetActionOptions;

type StoreState = ArticleItemStoreState;

export interface ArticleItemStoreHooks {
  readonly useClearActionDispatch: (sliceName: string, options: ClearActionOptions) => ClearActionDispatch;
  readonly useLoadActionDispatch: (sliceName: string, options: LoadActionOptions) => LoadActionDispatch;
  readonly useSetActionDispatch: (sliceName: string, options: SetActionOptions) => SetActionDispatch;
  readonly useStoreState: (sliceName: string) => StoreState;
}
