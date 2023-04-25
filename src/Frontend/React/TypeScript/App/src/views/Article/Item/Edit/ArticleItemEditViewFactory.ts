import { useMemo } from 'react';
import { getModule, LocalizationTarget } from '../../../../app';
import { type ArticleItemEditViewHooks } from './ArticleItemEditViewHooks';
import { type ArticleItemEditViewResource } from './ArticleItemEditViewResource';

export function createArticleItemEditViewHooks (): ArticleItemEditViewHooks {
  function useResource (): ArticleItemEditViewResource {
    const hooksOfLocalization = getModule().getLocalizationHooks();

    const localizer = hooksOfLocalization.useTranslator(LocalizationTarget.ArticleItemEditView);

    const tActionForBackToList: string = localizer.translate('@@ActionForBackToList');
    const tActionForDisplay: string = localizer.translate('@@ActionForDisplay');
    const tActionForReset: string = localizer.translate('@@ActionForReset');
    const tActionForSave: string = localizer.translate('@@ActionForSave');
    const tLabelForBody: string = localizer.translate('@@LabelForBody');
    const tLabelForId: string = localizer.translate('@@LabelForId');
    const tLabelForTitle: string = localizer.translate('@@LabelForTitle');
    const tLabelForTopic = localizer.translate('@@LabelForTopic');
    const tTitleForEdit: string = localizer.translate('@@TitleForEdit');
    const tTitleForNew = localizer.translate('@@TitleForNew');
    const tValidationMessageForTitleRequired = localizer.translate('@@ValidationMessageForTitleRequired');

    return useMemo(() => {
        const result: ArticleItemEditViewResource = {
          getActionForBackToList: () => tActionForBackToList,
          getActionForDisplay: () => tActionForDisplay,
          getActionForReset: () => tActionForReset,
          getActionForSave: () => tActionForSave,
          getLabelForBody: () => tLabelForBody,
          getLabelForId: () => tLabelForId,
          getLabelForTitle: () => tLabelForTitle,
          getLabelForTopic: () => tLabelForTopic,
          getTitleForEdit: () => tTitleForEdit,
          getTitleForNew: () => tTitleForNew,
          getValidationMessageForTitleRequired: () => tValidationMessageForTitleRequired,
        };

        return result;
      },
      [
        tTitleForEdit,
        tTitleForNew,
        tActionForBackToList,
        tLabelForBody,
        tActionForDisplay,
        tLabelForId,
        tActionForReset,
        tActionForSave,
        tLabelForTitle,
        tLabelForTopic,
        tValidationMessageForTitleRequired,
      ]
    );
  }

  return { useResource };
}
