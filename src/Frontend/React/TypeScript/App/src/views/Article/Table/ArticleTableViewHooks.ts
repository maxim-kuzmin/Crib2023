import { useMemo } from 'react';
import app, {
  type ArticleListStoreClearActionInput,
  type ArticleListStoreClearActionOutput,
  type ArticleListStoreLoadActionInput,
  type ArticleListStoreLoadActionOutput,
  type ArticleListStoreSetActionInput,
  type ArticleListStoreSetActionOutput,
  type ArticleListStoreHooks,
  ArticleListStoreSliceName,
  type ArticleListStoreState,
  LocalizationTarget
} from '../../../app';
import { type ArticleTableViewResource } from './ArticleTableViewResource';

export interface ArticleTableViewHooks {
  readonly useResource: () => ArticleTableViewResource;

  readonly useStoreClearActionOutput: (
    input: ArticleListStoreClearActionInput
  ) => ArticleListStoreClearActionOutput;

  readonly useStoreLoadActionOutput: (
    input: ArticleListStoreLoadActionInput
  ) => ArticleListStoreLoadActionOutput;

  readonly useStoreSetActionOutput: (
    input: ArticleListStoreSetActionInput
  ) => ArticleListStoreSetActionOutput;

  readonly useStoreState: () => ArticleListStoreState;
}

interface Options {
  readonly hooksOfArticleListStore: ArticleListStoreHooks;
}

export function createArticleTableViewHooks ({
  hooksOfArticleListStore
}: Options): ArticleTableViewHooks {
  function useResource (): ArticleTableViewResource {
    const translator = app.hooks.Localization.useTranslator(LocalizationTarget.ArticleTableView);

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

  const sliceName = ArticleListStoreSliceName.ArticleTableView;

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
