import { useMemo } from 'react';
import { getModule, LocalizationNamespace } from '../../../../app';
import { type ArticleItemEditViewHooks } from './ArticleItemEditViewHooks';
import { type ArticleItemEditViewResource } from './ArticleItemEditViewResource';

export function createArticleItemEditViewHooks (): ArticleItemEditViewHooks {
  function useResource (): ArticleItemEditViewResource {
    const hooksOfLocalization = getModule().getLocalizationHooks();

    const localizer = hooksOfLocalization.useLocalizer(LocalizationNamespace.ArticleItemEditView);

    const valueOfActionForBackToList: string = localizer.getValue('@@ActionForBackToList');
    const valueOfActionForDisplay: string = localizer.getValue('@@ActionForDisplay');
    const valueOfActionForReset: string = localizer.getValue('@@ActionForReset');
    const valueOfActionForSave: string = localizer.getValue('@@ActionForSave');
    const valueOfLabelForBody: string = localizer.getValue('@@LabelForBody');
    const valueOfLabelForId: string = localizer.getValue('@@LabelForId');
    const valueOfLabelForTitle: string = localizer.getValue('@@LabelForTitle');
    const valueOfLabelForTopic = localizer.getValue('@@LabelForTopic');
    const valueOfTitleForEdit: string = localizer.getValue('@@TitleForEdit');
    const valueOfTitleForNew = localizer.getValue('@@TitleForNew');

    return useMemo(() => {
        const result: ArticleItemEditViewResource = {
          getActionForBackToList: () => valueOfActionForBackToList,
          getActionForDisplay: () => valueOfActionForDisplay,
          getActionForReset: () => valueOfActionForReset,
          getActionForSave: () => valueOfActionForSave,
          getLabelForBody: () => valueOfLabelForBody,
          getLabelForId: () => valueOfLabelForId,
          getLabelForTitle: () => valueOfLabelForTitle,
          getLabelForTopic: () => valueOfLabelForTopic,
          getTitleForEdit: () => valueOfTitleForEdit,
          getTitleForNew: () => valueOfTitleForNew,
        };

        return result;
      },
      [
        valueOfTitleForEdit,
        valueOfTitleForNew,
        valueOfActionForBackToList,
        valueOfLabelForBody,
        valueOfActionForDisplay,
        valueOfLabelForId,
        valueOfActionForReset,
        valueOfActionForSave,
        valueOfLabelForTitle,
        valueOfLabelForTopic
      ]
    );
  }

  return { useResource };
}
