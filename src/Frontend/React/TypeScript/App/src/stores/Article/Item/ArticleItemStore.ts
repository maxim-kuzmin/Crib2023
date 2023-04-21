import { type ArticleItemStoreHooks } from '../../../app/Stores';
import { useClearActionDispatch } from './Hooks/Actions/Clear/ArticleItemStoreClearActionDispatchHook';
import { useClearActionOutput } from './Hooks/Actions/Clear/ArticleItemStoreClearActionOutputHook';
import { useDeleteActionDispatch } from './Hooks/Actions/Delete/ArticleItemStoreDeleteActionDispatchHook';
import { useDeleteActionOutput } from './Hooks/Actions/Delete/ArticleItemStoreDeleteActionOutputHook';
import {
  useDeleteCompletedActionDispatch
} from './Hooks/Actions/DeleteCompleted/ArticleItemStoreDeleteCompletedActionDispatchHook';
import { useLoadActionDispatch } from './Hooks/Actions/Load/ArticleItemStoreLoadActionDispatchHook';
import { useLoadActionOutput } from './Hooks/Actions/Load/ArticleItemStoreLoadActionOutputHook';
import {
  useLoadCompletedActionDispatch
} from './Hooks/Actions/LoadCompleted/ArticleItemStoreLoadCompletedActionDispatchHook';
import { useSaveActionDispatch } from './Hooks/Actions/Save/ArticleItemStoreSaveActionDispatchHook';
import { useSaveActionOutput } from './Hooks/Actions/Save/ArticleItemStoreSaveActionOutputHook';
import {
  useSaveCompletedActionDispatch
} from './Hooks/Actions/SaveCompleted/ArticleItemStoreSaveCompletedActionDispatchHook';
import { useSetActionDispatch } from './Hooks/Actions/Set/ArticleItemStoreSetActionDispatchHook';
import { useSetActionOutput } from './Hooks/Actions/Set/ArticleItemStoreSetActionOutputHook';
import { useStoreState } from './Hooks/ArticleItemStoreStateHook';

export function createArticleItemStoreHooks (): ArticleItemStoreHooks {
  return {
    useClearActionDispatch,
    useClearActionOutput,
    useDeleteActionDispatch,
    useDeleteActionOutput,
    useDeleteCompletedActionDispatch,
    useLoadActionDispatch,
    useLoadActionOutput,
    useLoadCompletedActionDispatch,
    useSaveActionDispatch,
    useSaveActionOutput,
    useSaveCompletedActionDispatch,
    useSetActionDispatch,
    useSetActionOutput,
    useStoreState
  };
}
