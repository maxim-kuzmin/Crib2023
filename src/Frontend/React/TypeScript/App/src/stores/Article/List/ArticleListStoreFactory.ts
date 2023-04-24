import { useMemo } from 'react';
import {
  getModule,
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
    const hooksOfLocalization = getModule().getLocalizationHooks();

    const localizer = hooksOfLocalization.useLocalizer(LocalizationNamespace.ArticleListStore);

    const valueOfOperationNameForGet = localizer.getValue('@@OperationNameForGet');

    return useMemo(
      () => {
        const result: ArticleListStoreResource = {
          getOperationNameForGet: () => valueOfOperationNameForGet,
        };

        return result;
      },
      [
        valueOfOperationNameForGet,
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
