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
  LocalizationNamespace
} from '../../../app';
import { type ArticleTableViewHooks } from './ArticleTableViewHooks';
import { type ArticleTableViewResource } from './ArticleTableViewResource';

export function createArticleTableViewHooks (storeHooks: ArticleListStoreHooks): ArticleTableViewHooks {
  function useResource (): ArticleTableViewResource {
    const hooksOfLocalization = getModule().getLocalizationHooks();

    const localizer = hooksOfLocalization.useLocalizer(LocalizationNamespace.ArticleTableView);

    const valueOfTitle: string = localizer.getValue('@@Title');
    const valueOfLabelForActions: string = localizer.getValue('@@LabelForActions');
    const valueOfActionForDelete: string = localizer.getValue('@@ActionForDelete');
    const valueOfActionForDisplay: string = localizer.getValue('@@ActionForDisplay');
    const valueOfActionForEdit: string = localizer.getValue('@@ActionForEdit');
    const valueOfLabelForId: string = localizer.getValue('@@LabelForId');
    const valueOfActionForNew: string = localizer.getValue('@@ActionForNew');
    const valueOfLabelForPath: string = localizer.getValue('@@LabelForPath');
    const valueOfLabelForTitle: string = localizer.getValue('@@LabelForTitle');

    return useMemo(() => {
        const result: ArticleTableViewResource = {
          getTitle: () => valueOfTitle,
          getLabelForActions: () => valueOfLabelForActions,
          getActionForDelete: () => valueOfActionForDelete,
          getActionForDisplay: () => valueOfActionForDisplay,
          getActionForEdit: () => valueOfActionForEdit,
          getLabelForId: () => valueOfLabelForId,
          getActionForNew: () => valueOfActionForNew,
          getLabelForPath: () => valueOfLabelForPath,
          getLabelForTitle: () => valueOfLabelForTitle
        };

        return result;
      },
      [
        valueOfTitle,
        valueOfLabelForActions,
        valueOfActionForDelete,
        valueOfActionForDisplay,
        valueOfActionForEdit,
        valueOfLabelForId,
        valueOfActionForNew,
        valueOfLabelForPath,
        valueOfLabelForTitle
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
