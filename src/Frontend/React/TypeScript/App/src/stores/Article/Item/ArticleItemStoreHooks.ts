import { useMemo } from 'react';
import appInstance from '../../../app/AppInstance';
import {
  type ArticleItemStoreResource,
  type ArticleItemStoreHooks
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
import { getArticleItemStoreResourcePath } from './ArticleItemStoreResource';

export function createArticleItemStoreHooks (): ArticleItemStoreHooks {
  function useResource (): ArticleItemStoreResource {
    const translator = appInstance.hooks.Features.Localization.useTranslator(getArticleItemStoreResourcePath());

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
