import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  type ArticleItemStoreResource,
  type ArticleItemStoreHooks,
  LocalizationNamespace
} from '../../../app';
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

export function createArticleItemStoreHooks (): ArticleItemStoreHooks {
  function useResource (): ArticleItemStoreResource {
    const { t } = useTranslation(LocalizationNamespace.ArticleItemStore);

    const tDeleteOperationName = t('@@DeleteOperationName');
    const tGetOperationName = t('@@GetOperationName');
    const tSaveOperationName = t('@@SaveOperationName');

    return useMemo(
      () => {
        const result: ArticleItemStoreResource = {
          getDeleteOperationName: () => tDeleteOperationName,
          getGetOperationName: () => tGetOperationName,
          getSaveOperationName: () => tSaveOperationName
        };

        return result;
      },
      [
        tDeleteOperationName,
        tGetOperationName,
        tSaveOperationName
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
