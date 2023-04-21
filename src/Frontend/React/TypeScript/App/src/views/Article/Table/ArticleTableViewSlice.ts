import {
  type ArticleListStoreClearActionInput,
  type ArticleListStoreClearActionOutput,
  type ArticleListStoreLoadActionInput,
  type ArticleListStoreLoadActionOutput,
  type ArticleListStoreSetActionInput,
  type ArticleListStoreSetActionOutput,
  type ArticleListStoreHooks,
  ArticleListStoreSliceName,
  type ArticleListStoreState,
} from '../../../app/Stores';
import { type ArticleTableViewHooks } from './ArticleTableViewHooks';

export function createArticleTableViewHooks (hooks: ArticleListStoreHooks): ArticleTableViewHooks {
  const sliceName = ArticleListStoreSliceName.ArticleTableView;

  function useClearActionOutput (input: ArticleListStoreClearActionInput): ArticleListStoreClearActionOutput {
    return hooks.useClearActionOutput(sliceName, input);
  }

  function useLoadActionOutput (input: ArticleListStoreLoadActionInput): ArticleListStoreLoadActionOutput {
    return hooks.useLoadActionOutput(sliceName, input);
  }

  function useSetActionOutput (input: ArticleListStoreSetActionInput): ArticleListStoreSetActionOutput {
    return hooks.useSetActionOutput(sliceName, input);
  }

  function useStoreState (): ArticleListStoreState {
    return hooks.useStoreState(sliceName);
  }

  return {
    useClearActionOutput,
    useLoadActionOutput,
    useSetActionOutput,
    useStoreState
  };
}
