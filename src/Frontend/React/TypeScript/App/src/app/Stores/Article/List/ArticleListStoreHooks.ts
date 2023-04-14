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

type State = ArticleListStoreState;

export interface ArticleListStoreHooks {
  readonly useDispatchToClear: (sliceName: string, options: ClearActionOptions) => ClearActionDispatch;
  readonly useDispatchToLoad: (sliceName: string, options: LoadActionOptions) => LoadActionDispatch;
  readonly useDispatchToSet: (sliceName: string, options: SetActionOptions) => SetActionDispatch;
  readonly useState: (sliceName: string) => State;
}
