import { useMemo } from 'react';
import {
  getModule,
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
import { type ArticleTableViewHooks } from './ArticleTableViewHooks';
import { type ArticleTableViewResource } from './ArticleTableViewResource';

export function createArticleTableViewHooks (storeHooks: ArticleListStoreHooks): ArticleTableViewHooks {
  function useResource (): ArticleTableViewResource {
    const hooksOfLocalization = getModule().getLocalizationHooks();

    const translator = hooksOfLocalization.useTranslator(LocalizationTarget.ArticleTableView);

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
    return storeHooks.useStoreClearActionOutput(sliceName, input);
  }

  function useStoreLoadActionOutput (input: ArticleListStoreLoadActionInput): ArticleListStoreLoadActionOutput {
    return storeHooks.useStoreLoadActionOutput(sliceName, input);
  }

  function useStoreSetActionOutput (input: ArticleListStoreSetActionInput): ArticleListStoreSetActionOutput {
    return storeHooks.useStoreSetActionOutput(sliceName, input);
  }

  function useStoreState (): ArticleListStoreState {
    return storeHooks.useStoreState(sliceName);
  }

  return {
    useResource,
    useStoreClearActionOutput,
    useStoreLoadActionOutput,
    useStoreSetActionOutput,
    useStoreState
  };
}
