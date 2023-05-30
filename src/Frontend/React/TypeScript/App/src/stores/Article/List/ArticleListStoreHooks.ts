import { type Dispatch, useContext, useMemo } from 'react';
import { useAppInstance } from '../../../app';
import {
  type ArticleListStoreResource,
  type ArticleListStoreHooks,
  type ArticleListStoreState,
  type ArticleListStoreSliceName
} from '../../../features';
import { useStoreClearActionOutput } from './Hooks/Actions/Clear/ArticleListStoreClearActionOutputHook';
import { useStoreLoadActionOutput } from './Hooks/Actions/Load/ArticleListStoreLoadActionOutputHook';
import { useStoreSetActionOutput } from './Hooks/Actions/Set/ArticleListStoreSetActionOutputHook';
import { useStoreState } from './Hooks/ArticleListStoreStateHook';
import {
  ArticleListStoreDispatchContext,
  ArticleListStoreStateContext,
  type ArticleListStoreActionUnion,
 } from '.';

 interface Options {
  readonly pathOfArticleListStoreResource: string;
}

export function createArticleListStoreHooks ({
  pathOfArticleListStoreResource,
}: Options): ArticleListStoreHooks {
  function useResource (): ArticleListStoreResource {
    const { hooks } = useAppInstance();

    const translator = hooks.Features.App.Localization.useTranslator(pathOfArticleListStoreResource);

    const tOperationNameForGet = translator.translate('@@OperationNameForGet');

    const { language } = translator;

    return useMemo<ArticleListStoreResource>(
      () => ({
        getOperationNameForGet: () => tOperationNameForGet,
        language
      }),
      [
        tOperationNameForGet,
        language
      ]
    );
  }

  return {
    useResource,
    useStoreClearActionOutput,
    useStoreLoadActionOutput,
    useStoreSetActionOutput,
    useStoreState
  };
}

export function useArticleListStoreDispatch (): Dispatch<ArticleListStoreActionUnion> {
  return useContext(ArticleListStoreDispatchContext)!;
}

export function useArticleListStoreState (
  sliceName: ArticleListStoreSliceName
): ArticleListStoreState {
  return useContext(ArticleListStoreStateContext)![sliceName];
}
