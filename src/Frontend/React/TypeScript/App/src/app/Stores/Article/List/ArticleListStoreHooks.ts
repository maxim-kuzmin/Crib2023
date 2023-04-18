import {
  type ArticleListStoreClearActionOptions,
  type ArticleListStoreClearActionDispatch,
  type ArticleListStoreLoadActionDispatch,
  type ArticleListStoreLoadActionOptions,
  type ArticleListStoreSetActionDispatch,
  type ArticleListStoreSetActionOptions
} from './Actions';
import { type ArticleListStoreState } from './ArticleListStoreState';

type ClearActionDispatch = ArticleListStoreClearActionDispatch;
type ClearActionOptions = ArticleListStoreClearActionOptions;

type LoadActionDispatch = ArticleListStoreLoadActionDispatch;
type LoadActionOptions = ArticleListStoreLoadActionOptions;

type SetActionDispatch = ArticleListStoreSetActionDispatch;
type SetActionOptions = ArticleListStoreSetActionOptions;

type StoreState = ArticleListStoreState;

export interface ArticleListStoreHooks {
  readonly useClearActionDispatch: (sliceName: string, options: ClearActionOptions) => ClearActionDispatch;
  readonly useLoadActionDispatch: (sliceName: string, options: LoadActionOptions) => LoadActionDispatch;
  readonly useSetActionDispatch: (sliceName: string, options: SetActionOptions) => SetActionDispatch;
  readonly useStoreState: (sliceName: string) => StoreState;
}
