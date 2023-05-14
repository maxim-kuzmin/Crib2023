import { useMemo } from 'react';
import { useAppInstance } from '../../../app';
import {
  type ArticleListStoreClearActionInput,
  type ArticleListStoreClearActionOutput,
  type ArticleListStoreLoadActionInput,
  type ArticleListStoreLoadActionOutput,
  type ArticleListStoreSetActionInput,
  type ArticleListStoreSetActionOutput,
  type ArticleListStoreHooks,
  type ArticleListStoreSliceHooks,
  ArticleListStoreSliceName,
  type ArticleListStoreState,
} from '../../../features';
import {
  type ArticleTableViewResource,
  getArticleTableViewResourcePath
} from './ArticleTableViewResource';

export interface ArticleTableViewHooks extends ArticleListStoreSliceHooks {
  readonly useResource: () => ArticleTableViewResource;
}

interface Options {
  readonly hooksOfArticleListStore: ArticleListStoreHooks;
}

export function createArticleTableViewHooks ({
  hooksOfArticleListStore
}: Options): ArticleTableViewHooks {
  function useResource (): ArticleTableViewResource {
    const { hooks } = useAppInstance();

    const translator = hooks.Features.Localization.useTranslator(getArticleTableViewResourcePath());

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

    return useMemo(() => {
        const result: ArticleTableViewResource = {
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
        };

        return result;
      },
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

  function useStoreClearActionOutput (input: ArticleListStoreClearActionInput): ArticleListStoreClearActionOutput {
    return hooksOfArticleListStore.useStoreClearActionOutput(sliceName, input);
  }

  function useStoreLoadActionOutput (input: ArticleListStoreLoadActionInput): ArticleListStoreLoadActionOutput {
    return hooksOfArticleListStore.useStoreLoadActionOutput(sliceName, input);
  }

  function useStoreSetActionOutput (input: ArticleListStoreSetActionInput): ArticleListStoreSetActionOutput {
    return hooksOfArticleListStore.useStoreSetActionOutput(sliceName, input);
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
