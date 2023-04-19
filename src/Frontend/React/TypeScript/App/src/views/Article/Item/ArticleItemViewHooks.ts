import {
  type ArticleItemStoreClearActionInput,
  type ArticleItemStoreClearActionOutput,
  type ArticleItemStoreDeleteActionInput,
  type ArticleItemStoreDeleteActionOutput,
  type ArticleItemStoreLoadActionInput,
  type ArticleItemStoreLoadActionOutput,
  type ArticleItemStoreSaveActionInput,
  type ArticleItemStoreSaveActionOutput,
  type ArticleItemStoreSetActionInput,
  type ArticleItemStoreSetActionOutput
} from '../../../app/Stores';

type ClearActionInput = ArticleItemStoreClearActionInput;
type ClearActionOutput = ArticleItemStoreClearActionOutput;

type DeleteActionInput = ArticleItemStoreDeleteActionInput;
type DeleteActionOutput = ArticleItemStoreDeleteActionOutput;

type LoadActionInput = ArticleItemStoreLoadActionInput;
type LoadActionOutput = ArticleItemStoreLoadActionOutput;

type SaveActionInput = ArticleItemStoreSaveActionInput;
type SaveActionOutput = ArticleItemStoreSaveActionOutput;

type SetActionInput = ArticleItemStoreSetActionInput;
type SetActionOutput = ArticleItemStoreSetActionOutput;

export interface ArticleItemViewHooks {
  readonly useClearActionOutput: (input: ClearActionInput) => ClearActionOutput;
  readonly useDeleteActionOutput: (input: DeleteActionInput) => DeleteActionOutput;
  readonly useLoadActionOutput: (input: LoadActionInput) => LoadActionOutput;
  readonly useSaveActionOutput: (input: SaveActionInput) => SaveActionOutput;
  readonly useSetActionOutput: (input: SetActionInput) => SetActionOutput;
}
