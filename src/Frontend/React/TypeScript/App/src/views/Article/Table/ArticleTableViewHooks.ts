import { useMemo } from 'react';
import { useAppInstance } from '../../../app';
import {
  type ArticleListStoreClearActionOutput,
  type ArticleListStoreLoadActionInput,
  type ArticleListStoreLoadActionOutput,
  type ArticleListStoreSetActionOutput,
  type ArticleListStoreHooks,
  type ArticleListStoreSliceHooks,
  ArticleListStoreSliceName,
  type ArticleListStoreState,
} from '../../../features';
import { type ArticleTableViewResource } from './ArticleTableViewResource';

export interface ArticleTableViewHooks extends ArticleListStoreSliceHooks {
  readonly useResource: () => ArticleTableViewResource;
}

interface Options {
  readonly hooksOfArticleListStore: ArticleListStoreHooks;
  readonly pathOfArticleTableViewResource: string;
}

export function createArticleTableViewHooks ({
  hooksOfArticleListStore,
  pathOfArticleTableViewResource,
}: Options): ArticleTableViewHooks {
  function useResource (): ArticleTableViewResource {
    const { hooks } = useAppInstance();

    const translator = hooks.Features.App.Localization.useTranslator(pathOfArticleTableViewResource);

    const tTitle: string = translator.translate('@@Title');
    const tLabelForActions: string = translator.translate('@@LabelForActions');
    const tActionForDelete: string = translator.translate('@@ActionForDelete');
    const tActionForDisplay: string = translator.translate('@@ActionForDisplay');
    const tActionForEdit: string = translator.translate('@@ActionForEdit');
    const tLabelForId: string = translator.translate('@@LabelForId');
    const tActionForNew: string = translator.translate('@@ActionForNew');
    const tLabelForPath: string = translator.translate('@@LabelForPath');
    const tLabelForTitle: string = translator.translate('@@LabelForTitle');

    const { language } = translator;

    return useMemo<ArticleTableViewResource>(
      () => ({
        getTitle: () => tTitle,
        getLabelForActions: () => tLabelForActions,
        getActionForDelete: () => tActionForDelete,
        getActionForDisplay: () => tActionForDisplay,
        getActionForEdit: () => tActionForEdit,
        getLabelForId: () => tLabelForId,
        getActionForNew: () => tActionForNew,
        getLabelForPath: () => tLabelForPath,
        getLabelForTitle: () => tLabelForTitle,
        language
      }),
      [
        tTitle,
        tLabelForActions,
        tActionForDelete,
        tActionForDisplay,
        tActionForEdit,
        tLabelForId,
        tActionForNew,
        tLabelForPath,
        tLabelForTitle,
        language
    ]
    );
  }

  const sliceName = ArticleListStoreSliceName.Default;

  function useStoreClearActionOutput (): ArticleListStoreClearActionOutput {
    return hooksOfArticleListStore.useStoreClearActionOutput(sliceName);
  }

  function useStoreLoadActionOutput (input: ArticleListStoreLoadActionInput): ArticleListStoreLoadActionOutput {
    return hooksOfArticleListStore.useStoreLoadActionOutput(sliceName, input);
  }

  function useStoreSetActionOutput (): ArticleListStoreSetActionOutput {
    return hooksOfArticleListStore.useStoreSetActionOutput(sliceName);
  }

  function useStoreState (): ArticleListStoreState {
    return hooksOfArticleListStore.useStoreState(sliceName);
  }

  return {
    useResource,
    useStoreClearActionOutput,
    useStoreLoadActionOutput,
    useStoreSetActionOutput,
    useStoreState
  };
}
