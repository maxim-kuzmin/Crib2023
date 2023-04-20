import { type ArticleItemStoreHooks } from '../../../app/Stores';
import { useClearActionDispatch } from './Hooks/ArticleItemStoreClearActionDispatchHook';
import { useClearActionOutput } from './Hooks/ArticleItemStoreClearActionOutputHook';
import { useDeleteActionDispatch } from './Hooks/ArticleItemStoreDeleteActionDispatchHook';
import { useDeleteCompletedActionDispatch } from './Hooks/ArticleItemStoreDeleteCompletedActionDispatchHook';
import { useStoreState } from './Hooks/ArticleItemStoreStateHook';
import { useLoadCompletedActionDispatch } from './Hooks/ArticleItemStoreLoadCompletedActionDispatchHook';
import { useLoadActionDispatch } from './Hooks/ArticleItemStoreLoadActionDispatchHook';
import { useLoadActionOutput } from './Hooks/ArticleItemStoreLoadActionOutputHook';
import { useSaveCompletedActionDispatch } from './Hooks/ArticleItemStoreSaveCompletedActionDispatchHook';
import { useSaveActionDispatch } from './Hooks/ArticleItemStoreSaveActionDispatchHook';
import { useSaveActionOutput } from './Hooks/ArticleItemStoreSaveActionOutputHook';
import { useSetActionDispatch } from './Hooks/ArticleItemStoreSetActionDispatchHook';
import { useDeleteActionOutput } from './Hooks/ArticleItemStoreDeleteActionOutputHook';
import { useSetActionOutput } from './Hooks/ArticleItemStoreSetActionOutputHook';

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
