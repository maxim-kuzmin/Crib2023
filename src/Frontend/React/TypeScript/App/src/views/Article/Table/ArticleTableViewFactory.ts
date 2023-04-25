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

    const localizer = hooksOfLocalization.useTranslator(LocalizationTarget.ArticleTableView);

    const tTitle: string = localizer.translate('@@Title');
    const tLabelForActions: string = localizer.translate('@@LabelForActions');
    const tActionForDelete: string = localizer.translate('@@ActionForDelete');
    const tActionForDisplay: string = localizer.translate('@@ActionForDisplay');
    const tActionForEdit: string = localizer.translate('@@ActionForEdit');
    const tLabelForId: string = localizer.translate('@@LabelForId');
    const tActionForNew: string = localizer.translate('@@ActionForNew');
    const tLabelForPath: string = localizer.translate('@@LabelForPath');
    const tLabelForTitle: string = localizer.translate('@@LabelForTitle');

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
          getLabelForTitle: () => tLabelForTitle
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
        tLabelForTitle
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
