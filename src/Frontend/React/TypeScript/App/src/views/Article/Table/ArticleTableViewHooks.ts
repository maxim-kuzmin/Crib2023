import {
  type ArticleListStoreClearActionDispatch,
  type ArticleListStoreClearActionOptions,
  type ArticleListStoreLoadActionDispatch,
  type ArticleListStoreLoadActionInput,
  type ArticleListStoreLoadActionOptions,
  type ArticleListStoreLoadActionOutput,
  type ArticleListStoreSetActionDispatch,
  type ArticleListStoreSetActionOptions,
  type ArticleListStoreState
} from '../../../app/Stores';

type ClearActionDispatch = ArticleListStoreClearActionDispatch;
type ClearActionOptions = ArticleListStoreClearActionOptions;

type LoadActionDispatch = ArticleListStoreLoadActionDispatch;
type LoadActionInput = ArticleListStoreLoadActionInput;
type LoadActionOptions = ArticleListStoreLoadActionOptions;
type LoadActionOutput = ArticleListStoreLoadActionOutput;

type SetActionDispatch = ArticleListStoreSetActionDispatch;
type SetActionOptions = ArticleListStoreSetActionOptions;

type StoreState = ArticleListStoreState;

export interface ArticleTableViewHooks {
  readonly useClearActionDispatch: (options: ClearActionOptions) => ClearActionDispatch;
  readonly useLoadActionDispatch: (options: LoadActionOptions) => LoadActionDispatch;
  readonly useLoadActionOutput: (input: LoadActionInput) => LoadActionOutput;
  readonly useSetActionDispatch: (options: SetActionOptions) => SetActionDispatch;
  readonly useStoreState: () => StoreState;
}
