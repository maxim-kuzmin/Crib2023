import { type Dispatch, useContext, useMemo } from 'react';
import { useAppInstance } from '../../../app';
import {
  type ArticleItemStoreHooks,
  type ArticleItemStoreResource,
  type ArticleItemStoreState
} from '../../../features';
import { useStoreClearActionOutput } from './Hooks/Actions/Clear/ArticleItemStoreClearActionOutputHook';
import { useStoreDeleteActionOutput } from './Hooks/Actions/Delete/ArticleItemStoreDeleteActionOutputHook';
import { useStoreLoadActionOutput } from './Hooks/Actions/Load/ArticleItemStoreLoadActionOutputHook';
import { useStoreSaveActionOutput } from './Hooks/Actions/Save/ArticleItemStoreSaveActionOutputHook';
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
    useStoreClearActionOutput,
    useStoreDeleteActionOutput,
    useStoreLoadActionOutput,
    useStoreSaveActionOutput,
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
  return useContext(ArticleItemStoreStateContext)![sliceName];
}
