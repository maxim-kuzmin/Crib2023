import {
  type ArticleItemStoreClearActionDispatch,
  type ArticleItemStoreClearActionOptions,
  type ArticleItemStoreDeleteActionDispatch,
  type ArticleItemStoreDeleteActionInput,
  type ArticleItemStoreDeleteActionOptions,
  type ArticleItemStoreDeleteActionOutput,
  type ArticleItemStoreDeleteCompletedActionDispatch,
  type ArticleItemStoreDeleteCompletedActionOptions,
  type ArticleItemStoreLoadActionDispatch,
  type ArticleItemStoreLoadActionInput,
  type ArticleItemStoreLoadActionOptions,
  type ArticleItemStoreLoadActionOutput,
  type ArticleItemStoreSaveActionDispatch,
  type ArticleItemStoreSaveActionInput,
  type ArticleItemStoreSaveActionOptions,
  type ArticleItemStoreSaveActionOutput,
  type ArticleItemStoreSetActionDispatch,
  type ArticleItemStoreSetActionOptions,
  type ArticleItemStoreState
} from '../../../app/Stores';

type ClearActionDispatch = ArticleItemStoreClearActionDispatch;
type ClearActionOptions = ArticleItemStoreClearActionOptions;

type DeleteActionDispatch = ArticleItemStoreDeleteActionDispatch;
type DeleteActionInput = ArticleItemStoreDeleteActionInput;
type DeleteActionOptions = ArticleItemStoreDeleteActionOptions;
type DeleteActionOutput = ArticleItemStoreDeleteActionOutput;

type DeleteCompletedActionDispatch = ArticleItemStoreDeleteCompletedActionDispatch;
type DeleteCompletedActionOptions = ArticleItemStoreDeleteCompletedActionOptions;

type LoadActionDispatch = ArticleItemStoreLoadActionDispatch;
type LoadActionInput = ArticleItemStoreLoadActionInput;
type LoadActionOptions = ArticleItemStoreLoadActionOptions;
type LoadActionOutput = ArticleItemStoreLoadActionOutput;

type SaveActionDispatch = ArticleItemStoreSaveActionDispatch;
type SaveActionInput = ArticleItemStoreSaveActionInput;
type SaveActionOptions = ArticleItemStoreSaveActionOptions;
type SaveActionOutput = ArticleItemStoreSaveActionOutput;

type SetActionDispatch = ArticleItemStoreSetActionDispatch;
type SetActionOptions = ArticleItemStoreSetActionOptions;

type StoreState = ArticleItemStoreState;

export interface ArticleItemViewHooks {
  readonly useClearActionDispatch: (options: ClearActionOptions) => ClearActionDispatch;
  readonly useDeleteActionDispatch: (options: DeleteActionOptions) => DeleteActionDispatch;
  readonly useDeleteActionOutput: (input: DeleteActionInput) => DeleteActionOutput;
  readonly useDeleteCompletedActionDispatch: (options: DeleteCompletedActionOptions) => DeleteCompletedActionDispatch;
  readonly useSaveActionDispatch: (options: SaveActionOptions) => SaveActionDispatch;
  readonly useSaveActionOutput: (input: SaveActionInput) => SaveActionOutput;
  readonly useLoadActionDispatch: (options: LoadActionOptions) => LoadActionDispatch;
  readonly useLoadActionOutput: (input: LoadActionInput) => LoadActionOutput;
  readonly useSetActionDispatch: (options: SetActionOptions) => SetActionDispatch;
  readonly useStoreState: () => StoreState;
}
