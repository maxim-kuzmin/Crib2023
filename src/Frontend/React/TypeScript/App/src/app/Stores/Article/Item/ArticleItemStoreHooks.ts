import {
  type ArticleItemStoreClearActionDispatch,
  type ArticleItemStoreClearActionInput,
  type ArticleItemStoreClearActionOptions,
  type ArticleItemStoreClearActionOutput,
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
  type ArticleItemStoreLoadCompletedActionDispatch,
  type ArticleItemStoreLoadCompletedActionOptions,
  type ArticleItemStoreSaveActionDispatch,
  type ArticleItemStoreSaveActionInput,
  type ArticleItemStoreSaveActionOptions,
  type ArticleItemStoreSaveActionOutput,
  type ArticleItemStoreSaveCompletedActionDispatch,
  type ArticleItemStoreSaveCompletedActionOptions,
  type ArticleItemStoreSetActionDispatch,
  type ArticleItemStoreSetActionInput,
  type ArticleItemStoreSetActionOptions,
  type ArticleItemStoreSetActionOutput
} from './Actions';
import { type ArticleItemStoreState } from './ArticleItemStoreState';

type ClearActionDispatch = ArticleItemStoreClearActionDispatch;
type ClearActionInput = ArticleItemStoreClearActionInput;
type ClearActionOptions = ArticleItemStoreClearActionOptions;
type ClearActionOutput = ArticleItemStoreClearActionOutput;

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

type LoadCompletedActionDispatch = ArticleItemStoreLoadCompletedActionDispatch;
type LoadCompletedActionOptions = ArticleItemStoreLoadCompletedActionOptions;

type SaveActionDispatch = ArticleItemStoreSaveActionDispatch;
type SaveActionInput = ArticleItemStoreSaveActionInput;
type SaveActionOptions = ArticleItemStoreSaveActionOptions;
type SaveActionOutput = ArticleItemStoreSaveActionOutput;

type SaveCompletedActionDispatch = ArticleItemStoreSaveCompletedActionDispatch;
type SaveCompletedActionOptions = ArticleItemStoreSaveCompletedActionOptions;

type SetActionDispatch = ArticleItemStoreSetActionDispatch;
type SetActionInput = ArticleItemStoreSetActionInput;
type SetActionOptions = ArticleItemStoreSetActionOptions;
type SetActionOutput = ArticleItemStoreSetActionOutput;

type StoreState = ArticleItemStoreState;

export interface ArticleItemStoreHooks {
  readonly useClearActionDispatch: (sliceName: string, options: ClearActionOptions) => ClearActionDispatch;
  readonly useClearActionOutput: (sliceName: string, input: ClearActionInput) => ClearActionOutput;

  readonly useDeleteActionDispatch: (sliceName: string, options: DeleteActionOptions) => DeleteActionDispatch;
  readonly useDeleteActionOutput: (sliceName: string, input: DeleteActionInput) => DeleteActionOutput;

  readonly useDeleteCompletedActionDispatch: (
    sliceName: string,
    options: DeleteCompletedActionOptions
  ) => DeleteCompletedActionDispatch;

  readonly useLoadActionDispatch: (sliceName: string, options: LoadActionOptions) => LoadActionDispatch;
  readonly useLoadActionOutput: (sliceName: string, input: LoadActionInput) => LoadActionOutput;

  readonly useLoadCompletedActionDispatch: (
    sliceName: string,
    options: LoadCompletedActionOptions
  ) => LoadCompletedActionDispatch;

  readonly useSaveActionDispatch: (sliceName: string, options: SaveActionOptions) => SaveActionDispatch;
  readonly useSaveActionOutput: (sliceName: string, input: SaveActionInput) => SaveActionOutput;

  readonly useSaveCompletedActionDispatch: (
    sliceName: string,
    options: SaveCompletedActionOptions
  ) => SaveCompletedActionDispatch;

  readonly useSetActionDispatch: (sliceName: string, options: SetActionOptions) => SetActionDispatch;
  readonly useSetActionOutput: (sliceName: string, input: SetActionInput) => SetActionOutput;

  readonly useStoreState: (sliceName: string) => StoreState;
}
