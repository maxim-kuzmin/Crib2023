import {
  type ArticleItemStoreClearActionDispatch,
  type ArticleItemStoreClearActionOptions,
  type ArticleItemStoreLoadActionDispatch,
  type ArticleItemStoreLoadActionInput,
  type ArticleItemStoreLoadActionOptions,
  type ArticleItemStoreLoadActionOutput,
  type ArticleItemStoreSetActionDispatch,
  type ArticleItemStoreSetActionOptions,
  type ArticleItemStoreState,
} from '../../../app/Stores';

type ClearActionDispatch = ArticleItemStoreClearActionDispatch;
type ClearActionOptions = ArticleItemStoreClearActionOptions;

type LoadActionDispatch = ArticleItemStoreLoadActionDispatch;
type LoadActionInput = ArticleItemStoreLoadActionInput;
type LoadActionOptions = ArticleItemStoreLoadActionOptions;
type LoadActionOutput = ArticleItemStoreLoadActionOutput;

type SetActionDispatch = ArticleItemStoreSetActionDispatch;
type SetActionOptions = ArticleItemStoreSetActionOptions;

type StoreState = ArticleItemStoreState;

export interface ArticleItemViewHooks {
  readonly useClearActionDispatch: (options: ClearActionOptions) => ClearActionDispatch;
  readonly useLoadActionDispatch: (options: LoadActionOptions) => LoadActionDispatch;
  readonly useLoadActionOutput: (input: LoadActionInput) => LoadActionOutput;
  readonly useSetActionDispatch: (options: SetActionOptions) => SetActionDispatch;
  readonly useStoreState: () => StoreState;
}
