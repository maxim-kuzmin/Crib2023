import {
  type ArticleItemStoreDeleteActionDispatch,
  type ArticleItemStoreDeleteActionOptions,
  type ArticleItemStoreDeleteCompletedActionDispatch,
  type ArticleItemStoreDeleteCompletedActionOptions,
  type ArticleItemStoreClearActionDispatch,
  type ArticleItemStoreClearActionOptions,
  type ArticleItemStoreLoadActionDispatch,
  type ArticleItemStoreLoadActionOptions,
  type ArticleItemStoreSaveActionDispatch,
  type ArticleItemStoreSaveActionOptions,
  type ArticleItemStoreSetActionDispatch,
  type ArticleItemStoreSetActionOptions
} from './Actions';
import { type ArticleItemStoreState } from './ArticleItemStoreState';

type ClearActionDispatch = ArticleItemStoreClearActionDispatch;
type ClearActionOptions = ArticleItemStoreClearActionOptions;

type DeleteActionDispatch = ArticleItemStoreDeleteActionDispatch;
type DeleteActionOptions = ArticleItemStoreDeleteActionOptions;

type DeleteCompletedActionDispatch = ArticleItemStoreDeleteCompletedActionDispatch;
type DeleteCompletedActionOptions = ArticleItemStoreDeleteCompletedActionOptions;

type LoadActionDispatch = ArticleItemStoreLoadActionDispatch;
type LoadActionOptions = ArticleItemStoreLoadActionOptions;

type SaveActionDispatch = ArticleItemStoreSaveActionDispatch;
type SaveActionOptions = ArticleItemStoreSaveActionOptions;

type SetActionDispatch = ArticleItemStoreSetActionDispatch;
type SetActionOptions = ArticleItemStoreSetActionOptions;

type StoreState = ArticleItemStoreState;

export interface ArticleItemStoreHooks {
  readonly useClearActionDispatch: (sliceName: string, options: ClearActionOptions) => ClearActionDispatch;
  readonly useDeleteActionDispatch: (sliceName: string, options: DeleteActionOptions) => DeleteActionDispatch;
  readonly useDeleteCompletedActionDispatch: (
    sliceName: string,
    options: DeleteCompletedActionOptions
  ) => DeleteCompletedActionDispatch;
  readonly useLoadActionDispatch: (sliceName: string, options: LoadActionOptions) => LoadActionDispatch;
  readonly useSaveActionDispatch: (sliceName: string, options: SaveActionOptions) => SaveActionDispatch;
  readonly useSetActionDispatch: (sliceName: string, options: SetActionOptions) => SetActionDispatch;
  readonly useStoreState: (sliceName: string) => StoreState;
}
