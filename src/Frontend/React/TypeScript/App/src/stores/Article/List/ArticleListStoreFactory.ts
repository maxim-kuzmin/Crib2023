import { useMemo } from 'react';
import app, {
  type ArticleListStoreResource,
  type ArticleListStoreHooks,
  LocalizationTarget
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
    const translator = app.hooks.Localization.useTranslator(LocalizationTarget.ArticleListStore);

    const tOperationNameForGet = translator.translate('@@OperationNameForGet');

    const { language } = translator;

    return useMemo(
      () => {
        const result: ArticleListStoreResource = {
          getOperationNameForGet: () => tOperationNameForGet,
          language
        };

        return result;
      },
      [
        tOperationNameForGet,
        language
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
