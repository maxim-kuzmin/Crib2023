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
  type ArticleItemStoreState,
} from '../../../app/Stores';
import { type ArticleItemViewHooks } from './ArticleItemViewHooks';

export function createArticleItemViewHooks (hooks: ArticleItemStoreHooks): ArticleItemViewHooks {
  const sliceName = ArticleItemStoreSliceName.ArticleItemView;

  function useClearActionOutput (input: ArticleItemStoreClearActionInput): ArticleItemStoreClearActionOutput {
    return hooks.useClearActionOutput(sliceName, input);
  }

  function useDeleteActionOutput (input?: ArticleItemStoreDeleteActionInput): ArticleItemStoreDeleteActionOutput {
    return hooks.useDeleteActionOutput(sliceName, input);
  }

  function useLoadActionOutput (input: ArticleItemStoreLoadActionInput): ArticleItemStoreLoadActionOutput {
    return hooks.useLoadActionOutput(sliceName, input);
  }

  function useSaveActionOutput (input?: ArticleItemStoreSaveActionInput): ArticleItemStoreSaveActionOutput {
    return hooks.useSaveActionOutput(sliceName, input);
  }

  function useSetActionOutput (input: ArticleItemStoreSetActionInput): ArticleItemStoreSetActionOutput {
    return hooks.useSetActionOutput(sliceName, input);
  }

  function useStoreState (): ArticleItemStoreState {
    return hooks.useStoreState(sliceName);
  }

  return {
    useClearActionOutput,
    useDeleteActionOutput,
    useLoadActionOutput,
    useSaveActionOutput,
    useSetActionOutput,
    useStoreState
  };
}
