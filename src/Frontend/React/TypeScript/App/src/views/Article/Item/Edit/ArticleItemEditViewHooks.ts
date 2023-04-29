import { useMemo } from 'react';
import appInstance from '../../../../app/AppInstance';
import { LocalizationTarget } from '../../../../app';
import { type ArticleItemEditViewResource } from './ArticleItemEditViewResource';

export interface ArticleItemEditViewHooks {
  readonly useResource: () => ArticleItemEditViewResource;
}

export function createArticleItemEditViewHooks (): ArticleItemEditViewHooks {
  function useResource (): ArticleItemEditViewResource {
    const translator = appInstance.hooks.Localization.useTranslator(LocalizationTarget.ArticleItemEditView);

    const tActionForBackToList: string = translator.translate('@@ActionForBackToList');
    const tActionForDisplay: string = translator.translate('@@ActionForDisplay');
    const tActionForReset: string = translator.translate('@@ActionForReset');
    const tActionForSave: string = translator.translate('@@ActionForSave');
    const tLabelForBody: string = translator.translate('@@LabelForBody');
    const tLabelForId: string = translator.translate('@@LabelForId');
    const tLabelForTitle: string = translator.translate('@@LabelForTitle');
    const tLabelForTopic = translator.translate('@@LabelForTopic');
    const tTitleForEdit: string = translator.translate('@@TitleForEdit');
    const tTitleForNew = translator.translate('@@TitleForNew');
    const tValidationMessageForTitleRequired = translator.translate('@@ValidationMessageForTitleRequired');

    const { language } = translator;

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
          language
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
        language
      ]
    );
  }

  return { useResource };
}
