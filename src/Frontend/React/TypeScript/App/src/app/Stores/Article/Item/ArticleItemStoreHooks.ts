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

type State = ArticleItemStoreState;

export interface ArticleItemStoreHooks {
  readonly useDispatchToClear: (sliceName: string, options: ClearActionOptions) => ClearActionDispatch;
  readonly useDispatchToLoad: (sliceName: string, options: LoadActionOptions) => LoadActionDispatch;
  readonly useDispatchToSet: (sliceName: string, options: SetActionOptions) => SetActionDispatch;
  readonly useState: (sliceName: string) => State;
}
