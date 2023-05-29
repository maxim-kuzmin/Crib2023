import { useMemo } from 'react';
import { useAppInstance } from '../../../app';
import {
  type ArticleItemStoreClearActionOutput,
  type ArticleItemStoreDeleteActionInput,
  type ArticleItemStoreDeleteActionOutput,
  type ArticleItemStoreLoadActionInput,
  type ArticleItemStoreLoadActionOutput,
  type ArticleItemStoreSaveActionInput,
  type ArticleItemStoreSaveActionOutput,
  type ArticleItemStoreSetActionOutput,
  type ArticleItemStoreHooks,
  type ArticleItemStoreSliceHooks,
  ArticleItemStoreSliceName,
  type ArticleItemStoreState,
} from '../../../features';
import { type ArticleItemViewResource } from './ArticleItemViewResource';
import { createArticleItemEditViewHooks } from './Edit/ArticleItemEditViewHooks';
import { type ArticleItemEditViewHooks } from './Edit';

export interface ArticleItemViewHooks extends ArticleItemStoreSliceHooks {
  readonly Edit: ArticleItemEditViewHooks;

  readonly useResource: () => ArticleItemViewResource;
}

interface Options {
  readonly hooksOfArticleItemStore: ArticleItemStoreHooks;
  readonly pathOfArticleItemViewResource: string;
  readonly pathOfArticleItemEditViewResource: string;
}

export function createArticleItemViewHooks ({
  hooksOfArticleItemStore,
  pathOfArticleItemViewResource,
  pathOfArticleItemEditViewResource,
}: Options): ArticleItemViewHooks {
  function useResource (): ArticleItemViewResource {
    const { hooks } = useAppInstance();

    const translator = hooks.Features.App.Localization.useTranslator(pathOfArticleItemViewResource);

    const tActionForBackToList: string = translator.translate('@@ActionForBackToList');
    const tActionForEdit: string = translator.translate('@@ActionForEdit');
    const tLabelForId: string = translator.translate('@@LabelForId');
    const tTitle: string = translator.translate('@@Title');

    const { language } = translator;

    return useMemo(() => {
        const result: ArticleItemViewResource = {
          getActionForBackToList: () => tActionForBackToList,
          getActionForEdit: () => tActionForEdit,
          getLabelForId: () => tLabelForId,
          getTitle: () => tTitle,
          language
        };

        return result;
      },
      [
        tTitle,
        tActionForBackToList,
        tActionForEdit,
        tLabelForId,
        language
      ]
    );
  }

  const sliceName = ArticleItemStoreSliceName.Default;

  function useStoreClearActionOutput (): ArticleItemStoreClearActionOutput {
    return hooksOfArticleItemStore.useStoreClearActionOutput(sliceName);
  }

  function useStoreDeleteActionOutput (input?: ArticleItemStoreDeleteActionInput): ArticleItemStoreDeleteActionOutput {
    return hooksOfArticleItemStore.useStoreDeleteActionOutput(sliceName, input);
  }

  function useStoreLoadActionOutput (input: ArticleItemStoreLoadActionInput): ArticleItemStoreLoadActionOutput {
    return hooksOfArticleItemStore.useStoreLoadActionOutput(sliceName, input);
  }

  function useStoreSaveActionOutput (input?: ArticleItemStoreSaveActionInput): ArticleItemStoreSaveActionOutput {
    return hooksOfArticleItemStore.useStoreSaveActionOutput(sliceName, input);
  }

  function useStoreSetActionOutput (): ArticleItemStoreSetActionOutput {
    return hooksOfArticleItemStore.useStoreSetActionOutput(sliceName);
  }

  function useStoreState (): ArticleItemStoreState {
    return hooksOfArticleItemStore.useStoreState(sliceName);
  }

  return {
    Edit: createArticleItemEditViewHooks({ pathOfArticleItemEditViewResource }),
    useResource,
    useStoreClearActionOutput,
    useStoreDeleteActionOutput,
    useStoreLoadActionOutput,
    useStoreSaveActionOutput,
    useStoreSetActionOutput,
    useStoreState
  };
}
