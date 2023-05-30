import { useMemo } from 'react';
import { useAppInstance } from '../../../../app';
import { type ArticleItemEditViewResource } from './ArticleItemEditViewResource';

export interface ArticleItemEditViewHooks {
  readonly useResource: () => ArticleItemEditViewResource;
}

interface Options {
  readonly pathOfArticleItemEditViewResource: string;
}

export function createArticleItemEditViewHooks ({
  pathOfArticleItemEditViewResource
}: Options): ArticleItemEditViewHooks {
  function useResource (): ArticleItemEditViewResource {
    const { hooks } = useAppInstance();

    const translator = hooks.Features.App.Localization.useTranslator(pathOfArticleItemEditViewResource);

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

    return useMemo<ArticleItemEditViewResource>(
      () => ({
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
      }),
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
