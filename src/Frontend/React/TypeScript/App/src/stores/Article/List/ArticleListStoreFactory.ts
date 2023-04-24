import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  type ArticleListStoreResource,
  type ArticleListStoreHooks,
  LocalizationNamespace
} from '../../../app';
import { useStoreClearActionDispatch } from './Hooks/Actions/Clear/ArticleListStoreClearActionDispatchHook';
import { useStoreClearActionOutput } from './Hooks/Actions/Clear/ArticleListStoreClearActionOutputHook';
import { useStoreLoadActionDispatch } from './Hooks/Actions/Load/ArticleListStoreLoadActionDispatchHook';
import { useStoreLoadActionOutput } from './Hooks/Actions/Load/ArticleListStoreLoadActionOutputHook';
import {
  useStoreLoadCompletedActionDispatch
} from './Hooks/Actions/LoadCompleted/ArticleListStoreLoadCompletedActionDispatchHook';
import { useStoreSetActionDispatch } from './Hooks/Actions/Set/ArticleListStoreSetActionDispatchHook';
import { useStoreSetActionOutput } from './Hooks/Actions/Set/ArticleListStoreSetActionOutputHook';
import { useStoreState } from './Hooks/ArticleListStoreStateHook';

export function createArticleListStoreHooks (): ArticleListStoreHooks {
  function useResource (): ArticleListStoreResource {
    const { t } = useTranslation(LocalizationNamespace.ArticleListStore);

    const tGetOperationName = t('@@GetOperationName');

    return useMemo(
      () => {
        const result: ArticleListStoreResource = {
          getGetOperationName: () => tGetOperationName,
        };

        return result;
      },
      [
        tGetOperationName,
      ]
    );
  }

  return {
    useResource,
    useStoreClearActionDispatch,
    useStoreClearActionOutput,
    useStoreLoadActionDispatch,
    useStoreLoadActionOutput,
    useStoreLoadCompletedActionDispatch,
    useStoreSetActionDispatch,
    useStoreSetActionOutput,
    useStoreState
  };
}
