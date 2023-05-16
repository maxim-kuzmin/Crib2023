import { type Dispatch, useContext, useMemo } from 'react';
import { useAppInstance } from '../../../app';
import {
  type ArticleItemStoreHooks,
  type ArticleItemStoreResource,
  type ArticleItemStoreState
} from '../../../features';
import { useStoreClearActionDispatch } from './Hooks/Actions/Clear/ArticleItemStoreClearActionDispatchHook';
import { useStoreClearActionOutput } from './Hooks/Actions/Clear/ArticleItemStoreClearActionOutputHook';
import { useStoreDeleteActionDispatch } from './Hooks/Actions/Delete/ArticleItemStoreDeleteActionDispatchHook';
import { useStoreDeleteActionOutput } from './Hooks/Actions/Delete/ArticleItemStoreDeleteActionOutputHook';
import {
  useStoreDeleteCompletedActionDispatch
} from './Hooks/Actions/DeleteCompleted/ArticleItemStoreDeleteCompletedActionDispatchHook';
import { useStoreLoadActionDispatch } from './Hooks/Actions/Load/ArticleItemStoreLoadActionDispatchHook';
import { useStoreLoadActionOutput } from './Hooks/Actions/Load/ArticleItemStoreLoadActionOutputHook';
import {
  useStoreLoadCompletedActionDispatch
} from './Hooks/Actions/LoadCompleted/ArticleItemStoreLoadCompletedActionDispatchHook';
import { useStoreSaveActionDispatch } from './Hooks/Actions/Save/ArticleItemStoreSaveActionDispatchHook';
import { useStoreSaveActionOutput } from './Hooks/Actions/Save/ArticleItemStoreSaveActionOutputHook';
import {
  useStoreSaveCompletedActionDispatch
} from './Hooks/Actions/SaveCompleted/ArticleItemStoreSaveCompletedActionDispatchHook';
import { useStoreSetActionDispatch } from './Hooks/Actions/Set/ArticleItemStoreSetActionDispatchHook';
import { useStoreSetActionOutput } from './Hooks/Actions/Set/ArticleItemStoreSetActionOutputHook';
import { useStoreState } from './Hooks/ArticleItemStoreStateHook';
import {
  ArticleItemStoreDispatchContext,
  ArticleItemStoreStateContext,
  type ArticleItemStoreActionUnion,
  getArticleItemStoreResourcePath,
} from '.';

export function createArticleItemStoreHooks (): ArticleItemStoreHooks {
  function useResource (): ArticleItemStoreResource {
    const { hooks } = useAppInstance();

    const translator = hooks.Features.App.Localization.useTranslator(getArticleItemStoreResourcePath());

    const tOperationNameForDelete = translator.translate('@@OperationNameForDelete');
    const tOperationNameForGet = translator.translate('@@OperationNameForGet');
    const tOperationNameForSave = translator.translate('@@OperationNameForSave');

    const { language } = translator;

    return useMemo(
      () => {
        const result: ArticleItemStoreResource = {
          getOperationNameForDelete: () => tOperationNameForDelete,
          getOperationNameForGet: () => tOperationNameForGet,
          getOperationNameForSave: () => tOperationNameForSave,
          language
        };

        return result;
      },
      [
        tOperationNameForDelete,
        tOperationNameForGet,
        tOperationNameForSave,
        language
      ]
    );
  }

  return {
    useResource,
    useStoreClearActionDispatch,
    useStoreClearActionOutput,
    useStoreDeleteActionDispatch,
    useStoreDeleteActionOutput,
    useStoreDeleteCompletedActionDispatch,
    useStoreLoadActionDispatch,
    useStoreLoadActionOutput,
    useStoreLoadCompletedActionDispatch,
    useStoreSaveActionDispatch,
    useStoreSaveActionOutput,
    useStoreSaveCompletedActionDispatch,
    useStoreSetActionDispatch,
    useStoreSetActionOutput,
    useStoreState
  };
}

export function useArticleItemStoreDispatch (): Dispatch<ArticleItemStoreActionUnion> {
  return useContext(ArticleItemStoreDispatchContext)!;
}

export function useArticleItemStoreState (
  sliceName: string
): ArticleItemStoreState {
  return useContext(ArticleItemStoreStateContext)!.get(sliceName)!;
}
