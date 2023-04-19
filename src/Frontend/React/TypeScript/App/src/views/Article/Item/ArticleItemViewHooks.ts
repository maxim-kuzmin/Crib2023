import {
  type ArticleItemStoreClearActionDispatch,
  type ArticleItemStoreClearActionOptions,
  type ArticleItemStoreDeleteActionDispatch,
  // //makc//type ArticleItemStoreDeleteActionInput,
  type ArticleItemStoreDeleteActionOptions,
  // //makc//type ArticleItemStoreDeleteActionOutput,
  type ArticleItemStoreDeleteCompletedActionDispatch,
  type ArticleItemStoreDeleteCompletedActionOptions,
  type ArticleItemStoreLoadActionDispatch,
  type ArticleItemStoreLoadActionInput,
  type ArticleItemStoreLoadActionOptions,
  type ArticleItemStoreLoadActionOutput,
  type ArticleItemStoreSaveActionDispatch,
  // //makc//type ArticleItemStoreSaveActionInput,
  type ArticleItemStoreSaveActionOptions,
  // //makc//type ArticleItemStoreSaveActionOutput,
  type ArticleItemStoreSetActionDispatch,
  type ArticleItemStoreSetActionOptions,
  type ArticleItemStoreState
} from '../../../app/Stores';

type ClearActionDispatch = ArticleItemStoreClearActionDispatch;
type ClearActionOptions = ArticleItemStoreClearActionOptions;

type DeleteActionDispatch = ArticleItemStoreDeleteActionDispatch;
// //makc//type DeleteActionInput = ArticleItemStoreDeleteActionInput;
type DeleteActionOptions = ArticleItemStoreDeleteActionOptions;
// //makc//type DeleteActionOutput = ArticleItemStoreDeleteActionOutput;

type DeleteCompletedActionDispatch = ArticleItemStoreDeleteCompletedActionDispatch;
type DeleteCompletedActionOptions = ArticleItemStoreDeleteCompletedActionOptions;

type LoadActionDispatch = ArticleItemStoreLoadActionDispatch;
type LoadActionInput = ArticleItemStoreLoadActionInput;
type LoadActionOptions = ArticleItemStoreLoadActionOptions;
type LoadActionOutput = ArticleItemStoreLoadActionOutput;

type SaveActionDispatch = ArticleItemStoreSaveActionDispatch;
// //makc//type SaveActionInput = ArticleItemStoreSaveActionInput;
type SaveActionOptions = ArticleItemStoreSaveActionOptions;
// //makc//type SaveActionOutput = ArticleItemStoreSaveActionOutput;

type SetActionDispatch = ArticleItemStoreSetActionDispatch;
type SetActionOptions = ArticleItemStoreSetActionOptions;

type StoreState = ArticleItemStoreState;

export interface ArticleItemViewHooks {
  readonly useClearActionDispatch: (options: ClearActionOptions) => ClearActionDispatch;
  readonly useDeleteActionDispatch: (options: DeleteActionOptions) => DeleteActionDispatch;
  // //makc//readonly useDeleteActionOutput: (input: DeleteActionInput) => DeleteActionOutput;
  readonly useDeleteCompletedActionDispatch: (options: DeleteCompletedActionOptions) => DeleteCompletedActionDispatch;
  readonly useSaveActionDispatch: (options: SaveActionOptions) => SaveActionDispatch;
  // //makc//readonly useSaveActionOutput: (input: SaveActionInput) => SaveActionOutput;
  readonly useLoadActionDispatch: (options: LoadActionOptions) => LoadActionDispatch;
  readonly useLoadActionOutput: (input: LoadActionInput) => LoadActionOutput;
  readonly useSetActionDispatch: (options: SetActionOptions) => SetActionDispatch;
  readonly useStoreState: () => StoreState;
}
