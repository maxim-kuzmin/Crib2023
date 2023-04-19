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
  type ArticleItemStoreSetActionOutput,
  type ArticleItemStoreHooks,
  ArticleItemStoreSliceName,
} from '../../../app/Stores';
import { type ArticleItemViewHooks } from './ArticleItemViewHooks';

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

export function createArticleItemViewHooks (
  hooks: ArticleItemStoreHooks
): ArticleItemViewHooks {
  const sliceName = ArticleItemStoreSliceName.ArticleItemView;

  function useClearActionOutput (input: ClearActionInput): ClearActionOutput {
    return hooks.useClearActionOutput(sliceName, input);
  }

  function useDeleteActionOutput (input: DeleteActionInput): DeleteActionOutput {
    return hooks.useDeleteActionOutput(sliceName, input);
  }

  function useLoadActionOutput (input: LoadActionInput): LoadActionOutput {
    return hooks.useLoadActionOutput(sliceName, input);
  }

  function useSaveActionOutput (input: SaveActionInput): SaveActionOutput {
    return hooks.useSaveActionOutput(sliceName, input);
  }

  function useSetActionOutput (input: SetActionInput): SetActionOutput {
    return hooks.useSetActionOutput(sliceName, input);
  }

  return {
    useClearActionOutput,
    useDeleteActionOutput,
    useLoadActionOutput,
    useSaveActionOutput,
    useSetActionOutput
  };
}
