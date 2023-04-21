import { type ArticleListStoreHooks } from '../../../app/Stores';
import { useClearActionDispatch } from './Hooks/Actions/Clear/ArticleListStoreClearActionDispatchHook';
import { useClearActionOutput } from './Hooks/Actions/Clear/ArticleListStoreClearActionOutputHook';
import { useStoreState } from './Hooks/ArticleListStoreStateHook';
import {
  useLoadCompletedActionDispatch
} from './Hooks/Actions/LoadCompleted/ArticleListStoreLoadCompletedActionDispatchHook';
import { useLoadActionDispatch } from './Hooks/Actions/Load/ArticleListStoreLoadActionDispatchHook';
import { useLoadActionOutput } from './Hooks/Actions/Load/ArticleListStoreLoadActionOutputHook';
import { useSetActionDispatch } from './Hooks/Actions/Set/ArticleListStoreSetActionDispatchHook';
import { useSetActionOutput } from './Hooks/Actions/Set/ArticleListStoreSetActionOutputHook';

export function createArticleListStoreHooks (): ArticleListStoreHooks {
  return {
    useClearActionDispatch,
    useClearActionOutput,
    useLoadActionDispatch,
    useLoadActionOutput,
    useLoadCompletedActionDispatch,
    useSetActionDispatch,
    useSetActionOutput,
    useStoreState
  };
}
