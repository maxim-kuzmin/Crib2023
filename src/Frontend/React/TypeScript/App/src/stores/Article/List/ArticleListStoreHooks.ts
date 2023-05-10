import { type Dispatch, useContext, useMemo } from 'react';
import { useAppInstance } from '../../../app';
import {
  type ArticleListStoreResource,
  type ArticleListStoreHooks,
  type ArticleListStoreState
} from '../../../features';
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
import {
  ArticleListStoreDispatchContext,
  ArticleListStoreStateContext,
  type ArticleListStoreActionUnion,
  getArticleListStoreResourcePath,
 } from '.';

export function createArticleListStoreHooks (): ArticleListStoreHooks {
  function useResource (): ArticleListStoreResource {
    const { hooks } = useAppInstance();

    const translator = hooks.Features.Localization.useTranslator(getArticleListStoreResourcePath());

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

export function useArticleListStoreDispatch (): Dispatch<ArticleListStoreActionUnion> {
  return useContext(ArticleListStoreDispatchContext)!;
}

export function useArticleListStoreState (
  storeKey: string
): ArticleListStoreState {
  return useContext(ArticleListStoreStateContext)!.get(storeKey)!;
}
